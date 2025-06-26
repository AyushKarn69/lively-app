# Hypespace: Real-Time Event Check-In Application

Hypespace is a full-stack real-time event check-in application built with Expo (React Native) for the frontend and Node.js/Express/GraphQL/Prisma for the backend.

---

## Project Structure

```
Hypespace/
├── app/ # Expo React Native frontend
│ ├── components/ # UI, Auth, and Event components
│ ├── graphql/ # GraphQL client setup
│ ├── navigation/ # Navigation stacks
│ ├── screens/ # App screens (EventList, EventDetail, Login)
│ ├── store/ # Zustand stores for state management
│ ├── utils/ # Utility functions (e.g., socket)
│ └── index.tsx # App entry point
├── backend/ # Node.js backend (GraphQL, Prisma, Socket.io)
│ ├── src/ # Backend source code
│ ├── prisma/ # Prisma schema, migrations, and mock data
│ └── README.md # Backend API documentation
├── assets/ # Fonts and images
├── components/ # Shared or web-specific components
├── scripts/ # Project scripts (e.g., reset-project.js)
├── package.json # Project dependencies (frontend)
├── app.json # Expo app config
└── tsconfig.json # TypeScript config
```

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/your-username/hypespace.git
cd hypespace
```

### 2. Install dependencies

```sh
npm install
```

### 3. Backend Setup

See [`backend/README.md`](backend/README.md) for full backend setup, database configuration, and API usage.

### 4. Frontend (Expo) Setup

```sh
npm run dev:frontend
```
- This will start the Expo app. You can open it in Expo Go, Android/iOS simulator, or web browser.

---

## Monorepo Scripts

From the project root, you can use:

- `npm run dev:frontend` — Start the Expo frontend
- `npm run dev:backend` — Start the backend API server

Or alternatively:

- `npm run dev` — Start the backend server
- `npx expo start` — Start the frontend server


---

## Assets

- Fonts: `assets/fonts/`
- Images: `assets/images/`

---

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Backend API docs](backend/README.md)

---

## Community

- [Expo on GitHub](https://github.com/expo/expo)
- [Expo Discord](https://chat.expo.dev)
