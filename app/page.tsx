'use client';

import { useState, useEffect } from 'react';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { GalleryGrid } from './components/GalleryGrid';
import { GalleryItem } from './components/GalleryItem';
import { ViewToggle } from './components/ViewToggle';
import { CollectionCard } from './components/CollectionCard';
import { PaletteCredit } from './components/PaletteCredit';
import { AddItemModal } from './components/AddItemModal';
import { GalleryItem as GalleryItemType, Collection } from './types';
import { colorPalettes } from './data/colorPalettes';
import { fetchCollections } from './lib/queries/collections';
import { fetchGalleryItems, createGalleryItem, CreateGalleryItemInput } from './lib/queries/galleryItems';
import styles from './page.module.css';

export default function Home() {
  const [view, setView] = useState<'items' | 'collections'>('items');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [paletteIndex, setPaletteIndex] = useState(0);
  
  // Data state
  const [collections, setCollections] = useState<Collection[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Add item modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);
        
        const [collectionsData, itemsData] = await Promise.all([
          fetchCollections(),
          fetchGalleryItems(),
        ]);
        
        setCollections(collectionsData);
        setGalleryItems(itemsData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);
  
  const handleRefreshPalette = () => {
    setPaletteIndex((prev) => (prev + 1) % colorPalettes.length);
  };
  
  const currentPalette = colorPalettes[paletteIndex];
  const paletteNumber = currentPalette.id;

  const handleCollectionClick = (collectionId: string) => {
    setSelectedCollection(collectionId);
  };

  const handleViewChange = (newView: 'items' | 'collections') => {
    setView(newView);
    if (newView === 'collections') {
      setSelectedCollection(null);
    }
  };

  const handleAddItem = async (input: CreateGalleryItemInput) => {
    const newItem = await createGalleryItem(input);
    setGalleryItems((prev) => [...prev, newItem]);
  };

  const displayedItems = selectedCollection
    ? galleryItems.filter(item => item.collectionId === selectedCollection)
    : galleryItems;

  const selectedCollectionData = selectedCollection
    ? collections.find(c => c.id === selectedCollection)
    : null;

  // Loading state
  if (isLoading) {
    return (
      <Container>
        <PaletteCredit 
          paletteNumber={paletteNumber} 
          onRefresh={handleRefreshPalette}
        />
        <Header />
        <div className={styles.loadingState}>
          Loading...
        </div>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container>
        <PaletteCredit 
          paletteNumber={paletteNumber} 
          onRefresh={handleRefreshPalette}
        />
        <Header />
        <div className={styles.errorState}>
          <p className={styles.errorText}>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <PaletteCredit 
        paletteNumber={paletteNumber} 
        onRefresh={handleRefreshPalette}
      />
      <Header />
      <div className={styles.toolbar}>
        <ViewToggle view={view} onViewChange={handleViewChange} />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className={styles.addButton}
        >
          + Add Item
        </button>
      </div>
      
      {selectedCollection && selectedCollectionData && (
        <div className={styles.collectionHeader}>
          <button 
            onClick={() => setSelectedCollection(null)}
            className={styles.backButton}
          >
            ← All collections
          </button>
          <h2 className={styles.collectionTitle}>
            {selectedCollectionData.name}
          </h2>
        </div>
      )}
      
      <GalleryGrid>
        {view === 'items' && !selectedCollection && displayedItems.map((item) => (
          <GalleryItem key={item.id} item={item} palette={currentPalette} />
        ))}
        
        {view === 'collections' && !selectedCollection && collections.map((collection) => {
          const collectionItems = galleryItems.filter(item => item.collectionId === collection.id);
          return (
            <CollectionCard 
              key={collection.id} 
              collection={collection}
              items={collectionItems}
              palette={currentPalette}
              onCollectionClick={handleCollectionClick}
            />
          );
        })}

        {view === 'collections' && selectedCollection && displayedItems.map((item) => (
          <GalleryItem key={item.id} item={item} palette={currentPalette} />
        ))}
      </GalleryGrid>
      
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
        collections={collections}
      />
    </Container>
  );
}
