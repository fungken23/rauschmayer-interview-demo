import { useState } from 'react';
import { useSSE } from './hooks/useSSE';
import './App.css';

const BACKEND_URL = 'http://localhost:3000';

function App() {
  const [isStreaming, setIsStreaming] = useState(false);
  const { currentWord, isConnected, error } = useSSE(
    isStreaming ? `${BACKEND_URL}/api/stream` : null
  );

  const handleStart = () => {
    setIsStreaming(true);
  };

  const handleStop = () => {
    setIsStreaming(false);
  };

  return (
    <div className="app">
      <h1>Word Stream Demo</h1>

      <div className="controls">
        {!isStreaming ? (
          <button onClick={handleStart} className="btn btn-start">
            Start Stream
          </button>
        ) : (
          <button onClick={handleStop} className="btn btn-stop">
            Stop Stream
          </button>
        )}
      </div>

      <div className="status">
        {isConnected && <span className="status-connected">● Connected</span>}
        {error && <span className="status-error">● {error}</span>}
        {!isStreaming && !error && <span className="status-idle">○ Not connected</span>}
      </div>

      <div className="word-display">
        {currentWord ? (
          <div className="word">{currentWord}</div>
        ) : (
          <div className="word-placeholder">
            {isStreaming ? 'Waiting for word...' : 'Click "Start Stream" to begin'}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
