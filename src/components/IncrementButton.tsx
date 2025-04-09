import { useState, useEffect, useCallback } from 'react';
import { CONFIG } from '../config/config';
import styles from '../styles/IncrementButton.module.css';

interface IncrementButtonProps {
  value: number;
  label: string;
  onIncrement: (value: number) => void;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({ value, label, onIncrement }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  const handleClick = useCallback(() => {
    onIncrement(value);
    const cooldownDuration = value * CONFIG.cooldownMultiplier * 1000;

    setIsDisabled(true);
    setCooldownTime(cooldownDuration / 1000);

    const timer = setTimeout(() => {
      setIsDisabled(false);
      setCooldownTime(0);
    }, cooldownDuration);

    return () => clearTimeout(timer);
  }, [value, onIncrement]);

  useEffect(() => {
    if (cooldownTime <= 0) return;

    const interval = setInterval(() => {
      setCooldownTime((prevTime) => {
        const newTime = prevTime - 0.1;
        return newTime > 0 ? parseFloat(newTime.toFixed(1)) : 0;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [cooldownTime]);

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {label}
      </button>
      {isDisabled && cooldownTime > 0 && (
        <div className={styles.cooldown}>
          {cooldownTime.toFixed(1)}s
        </div>
      )}
    </div>
  );
};

export default IncrementButton;
