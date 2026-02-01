import styles from './PaletteCredit.module.css';

type PaletteCreditProps = {
  paletteNumber: number;
  onRefresh: () => void;
};

export function PaletteCredit({ paletteNumber, onRefresh }: PaletteCreditProps) {
  return (
    <div className={styles.credit}>
      <span className={styles.text}>Wada Sanzo Palette #{paletteNumber}</span>
      <button 
        onClick={onRefresh} 
        className={styles.refreshButton}
        aria-label="Refresh palette"
      >
        ↻
      </button>
    </div>
  );
}
