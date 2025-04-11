import { useState } from 'react';
import styles from '../styles/IncrementButton.module.css';
import { CONFIG } from '../config/config';

interface IncrementButtonProps {
  value: number;
  label: string;
  onIncrement: (value: number) => void;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({ value, label, onIncrement }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (isDisabled) return;

    onIncrement(value);
    setIsDisabled(true);

    const cooldown = value * CONFIG.cooldownMultiplier * 1000;

    setTimeout(() => {
      setIsDisabled(false);
    }, cooldown);
  };

  return (
      <button className={styles.button} onClick={handleClick} disabled={isDisabled}>
        {label}
      </button>
  );
};

export default IncrementButton;
