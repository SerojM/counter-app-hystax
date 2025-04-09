import React, { useState, useEffect, useCallback, useRef } from 'react';
import Counter from './components/Counter';
import IncrementButton from './components/IncrementButton';
import { CONFIG } from './config/config';
import styles from './styles/App.module.css';

interface AppProps {

}

function App(): React.FC<AppProps> {

  const [count, setCount] = useState<number>(0);
  const [isDecaying, setIsDecaying] = useState<boolean>(false);

  const idleTimerRef = useRef<number | null>(null);
  const decayIntervalRef = useRef<number | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current);
    }

    if (decayIntervalRef.current) {
      window.clearInterval(decayIntervalRef.current);
      setIsDecaying(false);
    }

    idleTimerRef.current = window.setTimeout(() => {
      setIsDecaying(true);

      decayIntervalRef.current = window.setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 0) {
            if (decayIntervalRef.current) {
              window.clearInterval(decayIntervalRef.current);
              decayIntervalRef.current = null;
              setIsDecaying(false);
            }
            return 0;
          }
          return prevCount - 1;
        });
      }, CONFIG.decayInterval);
    }, CONFIG.idleTimeout);
  }, []);

  const handleIncrement = useCallback((value: number) => {
    setCount((prevCount) => prevCount + value);
    resetIdleTimer();
  }, [resetIdleTimer]);

  useEffect(() => {
    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
      if (decayIntervalRef.current) {
        window.clearInterval(decayIntervalRef.current);
      }
    };
  }, [resetIdleTimer]);

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
      <h1 className={styles.title}>React Counter App</h1>
      <p className={styles.description}>
        Click the buttons to increase the counter.
        Each button has a cooldown period after being clicked.
        If idle for 10 seconds, the counter will start decreasing.
      </p>

      <Counter value={count} isDecaying={isDecaying} />

      <div className={styles.buttonContainer}>
        {CONFIG.buttons.map((button) => (
          <IncrementButton
            key={button.value}
            value={button.value}
            label={button.label}
            onIncrement={handleIncrement}
          />
        ))}
      </div>
    </div>
      </div>
  );
}

export default App;
