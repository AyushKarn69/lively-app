// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const mockUsers = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 'u2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: 'u3', name: 'Charlie Davis', email: 'charlie@example.com' },
  { id: 'u4', name: 'Dana Lee', email: 'dana@example.com' },
  { id: 'u5', name: 'Eliot Brown', email: 'eliot@example.com' },
  { id: 'u6', name: 'Fiona Grey', email: 'fiona@example.com' },
  { id: 'u7', name: 'George King', email: 'george@example.com' },
  { id: 'u8', name: 'Hannah White', email: 'hannah@example.com' },
  { id: 'u9', name: 'Ian Clark', email: 'ian@example.com' },
  { id: 'u10', name: 'Jane Doe', email: 'jane@example.com' },
];

const mockEvents = [
  {
    id: 'e1',
    name: 'React Conference',
    location: 'New York',
    startTime: new Date('2025-07-01T10:00:00'),
    attendeeIds: ['u1', 'u2', 'u3'],
  },
  {
    id: 'e2',
    name: 'GraphQL Summit',
    location: 'San Francisco',
    startTime: new Date('2025-07-02T12:00:00'),
    attendeeIds: ['u2', 'u4'],
  },
  {
    id: 'e3',
    name: 'AI Expo',
    location: 'Los Angeles',
    startTime: new Date('2025-07-03T14:00:00'),
    attendeeIds: ['u1', 'u5', 'u6'],
  },
  {
    id: 'e4',
    name: 'Mobile Dev Meetup',
    location: 'Chicago',
    startTime: new Date('2025-07-04T09:00:00'),
    attendeeIds: ['u7', 'u8'],
  },
  {
    id: 'e5',
    name: 'Design Sprint',
    location: 'Seattle',
    startTime: new Date('2025-07-05T11:00:00'),
    attendeeIds: ['u9', 'u10'],
  },
  {
    id: 'e6',
    name: 'TechTalks Live',
    location: 'Austin',
    startTime: new Date('2025-07-06T15:00:00'),
    attendeeIds: ['u2', 'u3', 'u6'],
  },
  {
    id: 'e7',
    name: 'Product Hackathon',
    location: 'Boston',
    startTime: new Date('2025-07-07T10:30:00'),
    attendeeIds: ['u1', 'u4', 'u8'],
  },
  {
    id: 'e8',
    name: 'NextJS Workshop',
    location: 'Denver',
    startTime: new Date('2025-07-08T13:00:00'),
    attendeeIds: ['u5', 'u6'],
  },
  {
    id: 'e9',
    name: 'Cloud Computing 101',
    location: 'Miami',
    startTime: new Date('2025-07-09T16:00:00'),
    attendeeIds: ['u7', 'u9'],
  },
  {
    id: 'e10',
    name: 'Startup Pitch Day',
    location: 'San Diego',
    startTime: new Date('2025-07-10T17:30:00'),
    attendeeIds: ['u3', 'u8', 'u10'],
  },
];

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding script started');
  // Seed users
  for (const user of mockUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  }

  // Seed events
  for (const event of mockEvents) {
    await prisma.event.create({
      data: {
        id: event.id,
        name: event.name,
        location: event.location,
        startTime: event.startTime,
        attendees: {
          connect: event.attendeeIds.map(id => ({ id })),
        },
      },
    })
  }

  console.log(' Mock data seeded successfully.')
}

main()
  .catch(e => {
    console.error(' Seeding failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
