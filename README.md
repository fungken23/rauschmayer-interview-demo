# Interview Demo - Question 2

Real-time word display using Server-Sent Events (SSE).

## 🚀 Quick Start

### Docker (Recommended)
```bash
npm run start-docker
```
- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- Click "Start Stream" button to begin

### Local Development

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🏗️ Project Structure

```
q2/
├── backend/              # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── server.ts    # Express server with SSE
│   │   ├── wordLoop.ts  # Word loop manager
│   │   ├── constants.ts # Configuration
│   │   └── types.ts     # TypeScript types
│   └── package.json
│
├── frontend/            # React + TypeScript + Vite
│   ├── src/
│   │   ├── App.tsx      # Main component
│   │   ├── App.css      # Component styles
│   │   ├── index.css    # Global styles
│   │   └── hooks/
│   │       └── useSSE.ts # Custom SSE hook
│   └── package.json
│
└── docker-compose.yml   # Docker setup
```

## 🛠️ Tech Stack

### Backend
- Node.js 20
- Express
- TypeScript
- Server-Sent Events (SSE)

### Frontend
- React 19
- TypeScript
- Vite 7
- Vanilla CSS