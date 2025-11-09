# Interview Demo - Question 1

A React + TypeScript application that displays posts from the JSONPlaceholder API with pagination and expandable comments.

## 🚀 Quick Start

### Docker (Recommended)
```bash
npm run start-docker
```

### Local Development
```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

## 🏗️ Project Structure

```
src/
├── types/
│   └── api.ts              # TypeScript interfaces
├── services/
│   └── api.ts              # API service functions
├── hooks/
│   ├── usePosts.ts         # Fetch posts with pagination
│   └── useComments.ts      # Fetch comments on-demand
├── components/
│   ├── PostList.tsx        # Main list with pagination
│   ├── PostCard.tsx        # Individual post card
│   ├── CommentList.tsx     # Comments list
│   └── CommentItem.tsx     # Individual comment
└── App.tsx                 # Main app with theme
```

## 🛠️ Tech Stack

- React 19 + TypeScript 5.9
- Vite 7
- Material UI 7
- Docker

## ⚙️ Configuration

Environment variables (optional - defaults provided):

```env
# Backend API
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com

# Dev Server
VITE_PORT=5173
VITE_HOST=0.0.0.0
```

Copy `.env.example` to `.env` to customize.
