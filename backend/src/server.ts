import express, { Request, Response } from 'express';
import cors from 'cors';
import { wordLoopManager } from './wordLoop.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// SSE endpoint for word stream
app.get('/api/stream', (req: Request, res: Response) => {
  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable response buffering
  res.flushHeaders();

  // Add client to word loop manager
  wordLoopManager.addClient(res);

  // Handle client disconnect
  req.on('close', () => {
    wordLoopManager.removeClient(res);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 SSE endpoint: http://localhost:${PORT}/api/stream`);
});

