# Lively: Real-Time Event Check-In App

Lively is a full-stack real-time event check-in application built with Expo (React Native) for the frontend and Node.js/Express/GraphQL/Prisma for the backend.

---

## Project Structure

```
Lively/
├── app/           # Expo React Native frontend
│   ├── components/    # UI, Auth, and Event components
│   ├── graphql/       # GraphQL client setup
│   ├── navigation/    # Navigation stacks
│   ├── screens/       # App screens (EventList, EventDetail, Login)
│   ├── store/         # Zustand stores for state management
│   ├── utils/         # Utility functions (e.g., socket)
│   └── index.tsx      # App entry point
├── backend/       # Node.js backend (GraphQL, Prisma, Socket.io)
│   ├── src/           # Backend source code
│   ├── prisma/        # Prisma schema, migrations, and mock data
│   └── README.md      # Backend API documentation
├── assets/        # Fonts and images
├── components/    # Shared or web-specific components
├── scripts/       # Project scripts (e.g., reset-project.js)
├── package.json   # Project dependencies (frontend)
├── app.json       # Expo app config
└── tsconfig.json  # TypeScript config
```

---

## Getting Started

### Frontend (Expo)

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the Expo app**
   ```bash
   npx expo start
   ```
   - Open in Expo Go, Android/iOS simulator, or web browser.

### Backend (API & Database)

See [`backend/README.md`](backend/README.md) for full backend setup, API usage, and authentication details.

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
