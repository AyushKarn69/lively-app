# Lively Backend API

This is the backend API for the Lively Real-Time Event Check-In App. It provides a GraphQL API with real-time updates using Socket.io, and uses Prisma with PostgreSQL for data storage.

## Features
- GraphQL API (Apollo Server + Express)
- Real-time updates via Socket.io
- Prisma ORM with PostgreSQL
- Static token-based mock authentication

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure the database:**
   - Make sure your PostgreSQL database is running and seeded (see project root instructions).
   - The API expects the same Prisma schema and database as the rest of the project.

3. **Run the server (development):**
   ```sh
   npm run dev
   ```
   The server will start on [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Authentication
- Use the following static token in the `Authorization` header for all requests:
  ```
  Authorization: Bearer lively-secret-token
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