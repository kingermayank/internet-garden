import styles from './ViewToggle.module.css';

type ViewToggleProps = {
  view: 'items' | 'collections';
  onViewChange: (view: 'items' | 'collections') => void;
};

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <nav className={styles.toggle}>
      <button 
        className={view === 'items' ? styles.active : styles.button}
        onClick={() => onViewChange('items')}
      >
        By item
      </button>
      <button 
        className={view === 'collections' ? styles.active : styles.button}
        onClick={() => onViewChange('collections')}
      >
        By collection
      </button>
    </nav>
  );
}
