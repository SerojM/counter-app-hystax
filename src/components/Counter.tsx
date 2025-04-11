import styles from '../styles/Counter.module.css';

interface CounterProps {
  value: number;
  isDecaying: boolean;
}

const Counter: React.FC<CounterProps> = ({ value, isDecaying }) => {
  return (
    <div className={styles.counter}>
      <div className={`${styles.value} ${isDecaying ? styles.decaying : ''}`}>
        {value}
      </div>
    </div>
  );
};

export default Counter;
