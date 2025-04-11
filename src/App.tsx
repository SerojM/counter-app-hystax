import { useState, useEffect, useRef, useCallback } from 'react';
import Counter from './components/Counter';
import IncrementButton from './components/IncrementButton';
import { CONFIG } from './config/config';
import styles from './styles/App.module.css';

function App() {
  const [count, setCount] = useState(0);
  const [isDecaying, setIsDecaying] = useState(false);

  const idleTimerRef = useRef<number | null>(null);
  const decayIntervalRef = useRef<number | null>(null);

  const clearIdleTimer = () => {
    if (idleTimerRef.current !== null) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const clearDecayInterval = () => {
    if (decayIntervalRef.current !== null) {
      clearInterval(decayIntervalRef.current);
      decayIntervalRef.current = null;
    }
  };

  const startIdleTimer = useCallback(() => {
    clearIdleTimer();
    clearDecayInterval();
    setIsDecaying(false);

    idleTimerRef.current = window.setTimeout(() => {
      setIsDecaying(true);
    }, CONFIG.idleTimeout);
  }, []);

  const startDecay = useCallback(() => {
    decayIntervalRef.current = window.setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearDecayInterval();
          setIsDecaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, CONFIG.decayInterval);
  }, []);

  const handleIncrement = useCallback((value: number) => {
    setCount((prev) => prev + value);
    startIdleTimer();
  }, [startIdleTimer]);

  useEffect(() => {
    if (isDecaying) {
      startDecay();
    }
    return () => clearDecayInterval();
  }, [isDecaying, startDecay]);

  useEffect(() => {
    startIdleTimer();
    return () => {
      clearIdleTimer();
      clearDecayInterval();
    };
  }, [startIdleTimer]);

  return (
      <div className={styles.app}>
        <Counter value={count} isDecaying={isDecaying} />
        <div className={styles.buttonContainer}>
          {CONFIG.buttons.map((btn) => (
              <IncrementButton
                  key={btn.value}
                  value={btn.value}
                  label={btn.label}
                  onIncrement={handleIncrement}
              />
          ))}
        </div>
      </div>
  );
}

export default App;
