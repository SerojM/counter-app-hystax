// Configuration for the counter application
export interface ButtonConfig {
  value: number;
  label: string;
}

export const CONFIG = {
  // Button configurations
  buttons: [
    { value: 1, label: '+1' },
    { value: 2, label: '+2' },
    { value: 3, label: '+3' },
    { value: 5, label: '+5' },
  ] as ButtonConfig[],

  // Button cooldown multiplier (in seconds)
  cooldownMultiplier: 0.5,

  // Idle timeout before decay starts (in milliseconds)
  idleTimeout: 10000, // 10 seconds

  // Decay interval - how often counter decreases during decay (in milliseconds)
  decayInterval: 1000, // 1 second
};
