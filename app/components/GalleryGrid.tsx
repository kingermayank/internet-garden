import { ReactNode } from 'react';
import styles from './GalleryGrid.module.css';

type GalleryGridProps = {
  children: ReactNode;
};

export function GalleryGrid({ children }: GalleryGridProps) {
  return (
    <div className={styles.grid}>
      {children}
    </div>
  );
}
