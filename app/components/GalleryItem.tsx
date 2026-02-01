import Image from 'next/image';
import { GalleryItem as GalleryItemType } from '../types';
import { ColorPalette, getColorsForId } from '../data/colorPalettes';
import styles from './GalleryItem.module.css';

type GalleryItemProps = {
  item: GalleryItemType;
  palette: ColorPalette;
};

export function GalleryItem({ item, palette }: GalleryItemProps) {
  // Get colors for non-image items deterministically from the page palette
  const colors = item.type === 'image' ? null : getColorsForId(palette, item.id);

  return (
    <article className={styles.item}>
      <div className={styles.visual}>
        {item.type === 'image' && (
          <Image
            src={item.content}
            alt={item.title || 'Gallery image'}
            width={400}
            height={400}
            className={styles.image}
          />
        )}

        {item.type === 'text' && colors && (
          <div
            className={styles.textPreview}
            style={{ backgroundColor: colors.bg, color: colors.fg }}
          >
            <p className={styles.textContent}>{item.content}</p>
          </div>
        )}

        {item.type === 'link' && colors && (
          <a
            href={item.content}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkPreview}
            style={{ backgroundColor: colors.bg, color: colors.fg }}
          >
            <span className={styles.linkIcon}>→</span>
            <span className={styles.linkUrl}>{new URL(item.content).hostname}</span>
          </a>
        )}

        {item.type === 'pdf' && colors && (
          <div
            className={styles.pdfPreview}
            style={{ backgroundColor: colors.bg, color: colors.fg }}
          >
            <span className={styles.pdfIcon}>PDF</span>
            <span className={styles.pdfName}>{item.title || 'Document'}</span>
          </div>
        )}
      </div>
    </article>
  );
}
