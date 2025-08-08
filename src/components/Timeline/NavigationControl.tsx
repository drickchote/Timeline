import { memo } from 'react';
import styles from './NavigationControl.module.css';

export interface NavigationControlProps {
  onGoToStart: () => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onGoToEnd: () => void;
}

const NavigationControl = memo(({
  onGoToStart,
  onGoBack,
  onGoForward,
  onGoToEnd
}: NavigationControlProps) => {
  return (
    <div className={styles.container}>
      <button
        onClick={onGoToStart}
        className={styles.primaryButton}
        type="button"
      >
        Start
      </button>
      
      <button
        onClick={onGoBack}
        className={styles.secondaryButton}
        type="button"
      >
        ← Back
      </button>

      <button
        onClick={onGoForward}
        className={styles.secondaryButton}
        type="button"
      >
        Forward →
      </button>

      <button
        onClick={onGoToEnd}
        className={styles.primaryButton}
        type="button"
      >
        End
      </button>
    </div>
  );
});

NavigationControl.displayName = 'NavigationControl';

export default NavigationControl;
