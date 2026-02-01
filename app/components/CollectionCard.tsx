import { Collection, GalleryItem as GalleryItemType } from '../types';
import { ColorPalette, getColorsForId } from '../data/colorPalettes';
import styles from './CollectionCard.module.css';

type CollectionCardProps = {
  collection: Collection;
  items: GalleryItemType[];
  palette: ColorPalette;
  onCollectionClick: (collectionId: string) => void;
};

export function CollectionCard({ collection, items, palette, onCollectionClick }: CollectionCardProps) {
  // Get colors deterministically from the page palette
  const colors = getColorsForId(palette, collection.id);

  return (
    <article
      className={styles.card}
      onClick={() => onCollectionClick(collection.id)}
    >
      <div
        className={styles.preview}
        style={{ backgroundColor: colors.bg, color: colors.fg }}
      >
        <span className={styles.count}>{items.length}</span>
      </div>
      <h2 className={styles.name}>{collection.name}</h2>
      {collection.description && (
        <p className={styles.description}>{collection.description}</p>
      )}
    </article>
  );
}
