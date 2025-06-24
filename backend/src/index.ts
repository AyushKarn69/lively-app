import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import type { Application } from 'express';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const prisma = new PrismaClient();
const app: Application = express();
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, { cors: { origin: '*' } });

// --- Static Token Auth Middleware ---
const STATIC_TOKEN = 'lively-secret-token';
app.use(cors());
app.use((req, res, next) => {
  const auth = req.headers['authorization'];
  if (auth && auth === `Bearer ${STATIC_TOKEN}`) {
    // Attach a mock user (first user in DB)
    (req as any).user = { id: 'u1', email: 'alice@example.com', name: 'Alice Johnson' };
  }
  next();
});

// --- GraphQL Schema ---
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Event {
    id: ID!
    name: String!
    location: String!
    startTime: String!
    attendees: [User!]!
  }
  type Query {
    events: [Event!]!
    event(id: ID!): Event
    me: User
  }
  type Mutation {
    joinEvent(eventId: ID!): Event
  }
`;

// --- GraphQL Resolvers ---
const resolvers = {
  Query: {
    events: async () => {
      return prisma.event.findMany({ include: { attendees: true } });
    },
    event: async (_: any, { id }: { id: string }) => {
      return prisma.event.findUnique({
        where: { id },
        include: { attendees: true },
      });
    },
    me: async (_: any, __: any, context: any) => {
      return context.user || null;
    },
  },
  Mutation: {
    joinEvent: async (_: any, { eventId }: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      // Connect user to event
      const event = await prisma.event.update({
        where: { id: eventId },
        data: {
          attendees: {
            connect: { id: context.user.id },
          },
        },
        include: { attendees: true },
      });
      // Emit real-time update
      io.to(eventId).emit('attendeesUpdate', event.attendees);
      return event;
    },
  },
  Event: {
    attendees: (parent: any) => parent.attendees,
  },
};

// --- Apollo Server Setup ---
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: (req as any).user }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // --- Socket.io Setup ---
  io.on('connection', (socket) => {
    socket.on('joinEventRoom', (eventId) => {
      socket.join(eventId);
    });
  });

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer(); 