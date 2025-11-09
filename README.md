# Interview Demo - Rauschmayer

This repository contains solutions for the interview questions.

## 📋 Questions

### Question 1: Posts & Comments Display
Create a web project that connects to the JSONPlaceholder REST API and displays:
- Posts with pagination (20 per page)
- Comments for each post
- Clean UI/UX with responsive design

**Branch:** `q1`

### Question 2: Real-time Word Display
Create a web server and frontend with:
- A button that triggers a server endpoint
- Server randomly loops through words: cat, dog, mouse, horse, fox
- Every 5 seconds, server picks a new word
- Word is displayed live in the frontend
- Choose between polling, RTC, or WebSockets (with justification)

**Branch:** `q2`

## 🚀 How to Review

### Question 1 Solution
```bash
git checkout q1
npm run start-docker
```
- Open http://localhost:5173 in your browser
- View posts with pagination and expandable comments

**Tech Stack:** React 19 + TypeScript + Vite + Material UI + Dark Theme

---

### Question 2 Solution
```bash
git checkout q2
npm run start-docker
```
- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- Click "Start Stream" button to begin

**Tech Stack:** Node.js 20 + Express + React 19 + TypeScript + SSE + Docker

## 📝 Requirements

Both solutions demonstrate:
- Clean, well-structured code
- DRY principle
- Smart naming conventions
- Modular architecture
- Industry best practices
- No unnecessary or unused code

