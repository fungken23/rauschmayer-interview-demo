import { Response } from 'express';
import { Word } from './types.js';
import { WORDS, WORD_UPDATE_INTERVAL_MS } from './constants.js';

class WordLoopManager {
  private clients: Set<Response> = new Set();
  private intervalId: NodeJS.Timeout | null = null;
  private currentWord: Word | null = null;

  addClient(res: Response): void {
    this.clients.add(res);
    console.log(`Client connected. Total clients: ${this.clients.size}`);

    // Send current word immediately if available
    if (this.currentWord) {
      this.sendToClient(res, this.currentWord);
    }

    // Start loop if this is the first client
    if (this.clients.size === 1) {
      this.startLoop();
    }
  }

  removeClient(res: Response): void {
    this.clients.delete(res);
    console.log(`Client disconnected. Total clients: ${this.clients.size}`);

    // Stop loop if no clients left
    if (this.clients.size === 0) {
      this.stopLoop();
    }
  }

  private startLoop(): void {
    if (this.intervalId) {
      return; // Already running
    }

    console.log('Starting word loop...');

    // Pick and broadcast first word immediately
    this.pickAndBroadcastWord();

    // Then continue every 5 seconds
    this.intervalId = setInterval(() => {
      this.pickAndBroadcastWord();
    }, WORD_UPDATE_INTERVAL_MS);
  }

  private stopLoop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.currentWord = null;
      console.log('Word loop stopped.');
    }
  }



  private pickAndBroadcastWord(): void {
    // Pick random word
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    this.currentWord = WORDS[randomIndex];
    
    console.log(`Broadcasting word: ${this.currentWord} to ${this.clients.size} client(s)`);
    
    // Broadcast to all connected clients
    this.clients.forEach(client => {
      this.sendToClient(client, this.currentWord!);
    });
  }

  private sendToClient(res: Response, word: Word): void {
    try {
      res.write(`data: ${JSON.stringify({ word, timestamp: Date.now() })}\n\n`);
    } catch (error) {
      console.error('Error sending to client:', error);
      this.clients.delete(res);
    }
  }
}

// Singleton instance
export const wordLoopManager = new WordLoopManager();

