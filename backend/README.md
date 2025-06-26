# Hypespace Backend API

This is the backend API for the Hypespace Real-Time Event Check-In App. It provides a GraphQL API with real-time updates using Socket.io, and uses Prisma with PostgreSQL for data storage.

## Features
- GraphQL API (Apollo Server + Express)
- Real-time updates via Socket.io
- Prisma ORM with PostgreSQL
- Static token-based mock authentication

## Setup

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```

2. **Configure the database:**
   - Copy `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` and set your local PostgreSQL credentials:
     ```
     DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/hypespace"
     ```

3. **Run migrations:**
   ```sh
   npx prisma migrate deploy
   ```
   or for development:
   ```sh
   npx prisma migrate dev
   ```

4. **(Optional) Seed the database:**
   ```sh
   npx prisma db seed
   ```

5. **Run the server (development):**
   ```sh
   npm run dev
   ```
   The server will start on [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Authentication
- Use the following static token in the `Authorization` header for all requests:
  ```
  Authorization: Bearer hypespace-secret-token
  ```
- The mock user is always Alice Johnson (id: u1).

## Real-Time Updates
- Connect to the Socket.io server at `ws://localhost:4000`.
- Join an event room by emitting `joinEventRoom` with the event ID.
- Listen for `attendeesUpdate` events for real-time attendee lists.

## GraphQL API
- **Query events:**
  ```graphql
  query {
    events {
      id
      name
      location
      startTime
      attendees { id name email }
    }
  }
  ```
- **Query me:**
  ```graphql
  query {
    me { id name email }
  }
  ```
- **Mutation joinEvent:**
  ```graphql
  mutation {
    joinEvent(eventId: "e1") {
      id
      attendees { id name }
    }
  }
  ```

## Prisma
- Migrations are stored in `prisma/migrations/` and should be committed to the repo.
- The schema is in `prisma/schema.prisma`.
- Seed and mock data scripts are in `prisma/seed.ts` and `prisma/mocks/`.

## Troubleshooting
- If you get a database connection error, check your `DATABASE_URL` in `.env`.
- Make sure your PostgreSQL server is running and accessible.

## Learn More
- [Prisma documentation](https://www.prisma.io/docs/)
- [Apollo Server documentation](https://www.apollographql.com/docs/apollo-server/)
- [Socket.io documentation](https://socket.io/docs/) 