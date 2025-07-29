# CraftAI

CraftAI is a full-stack AI-powered code generation and chat platform.

## Features

- AI chat sessions with code generation
- Live code preview
- Download generated code as ZIP
- User authentication (JWT, cookies)
- Responsive sidebar and UI

## Tech Stack

- **Frontend:** React, Zustand, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT

## Getting Started

### Backend

```bash
cd backend
npm install
npx nodemon
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend with:

```
PORT=
DATABASE_URL=
JWT_SECRET=
OPENROUTER_API_KEY=
NODE_ENV=development
```

## Usage

1. Register and log in.
2. Start a new chat session.
3. Enter prompts to generate code.
4. Preview and download.
5. Use the components.
