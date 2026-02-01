'use client';

import { useState } from 'react';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { GalleryGrid } from './components/GalleryGrid';
import { GalleryItem } from './components/GalleryItem';
import { ViewToggle } from './components/ViewToggle';
import { CollectionCard } from './components/CollectionCard';
import { PaletteCredit } from './components/PaletteCredit';
import { GalleryItem as GalleryItemType, Collection } from './types';
import { colorPalettes } from './data/colorPalettes';

const mockCollections: Collection[] = [
  {
    id: 'design-principles',
    name: 'Design principles',
    description: 'Core ideas about design and simplicity',
  },
  {
    id: 'architecture',
    name: 'Architecture',
    description: 'Minimalist buildings and structures',
  },
  {
    id: 'resources',
    name: 'Resources',
    description: 'Useful links and references',
  },
];

const mockData: GalleryItemType[] = [
  {
    id: '1',
    type: 'image',
    title: 'Minimalist architecture',
    content: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop',
    collectionId: 'architecture',
  },
  {
    id: '2',
    type: 'text',
    content: 'The best way to predict the future is to invent it. - Alan Kay',
    title: 'Quote',
    collectionId: 'design-principles',
  },
  {
    id: '3',
    type: 'link',
    title: 'Design inspiration',
    content: 'https://brutalistwebsites.com',
    collectionId: 'resources',
  },
  {
    id: '4',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    title: 'Abstract forms',
    collectionId: 'architecture',
  },
  {
    id: '5',
    type: 'pdf',
    title: 'Design manifesto.pdf',
    content: '/documents/design-manifesto.pdf',
    collectionId: 'design-principles',
  },
  {
    id: '6',
    type: 'text',
    content: 'Simplicity is the ultimate sophistication. Less is more. Form follows function.',
    collectionId: 'design-principles',
  },
  {
    id: '7',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
    title: 'Geometric patterns',
  },
  {
    id: '8',
    type: 'link',
    content: 'https://www.are.na',
    title: 'Are.na',
    collectionId: 'resources',
  },
  {
    id: '9',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=400&fit=crop',
    title: 'Typography study',
  },
  {
    id: '10',
    type: 'text',
    content: 'Good design is as little design as possible. - Dieter Rams',
    title: 'Principle',
    collectionId: 'design-principles',
  },
  {
    id: '11',
    type: 'pdf',
    title: 'Research notes.pdf',
    content: '/documents/research-notes.pdf',
  },
  {
    id: '12',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&h=400&fit=crop',
    title: 'Material exploration',
    collectionId: 'architecture',
  },
];

export default function Home() {
  const [view, setView] = useState<'items' | 'collections'>('items');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [paletteIndex, setPaletteIndex] = useState(0);
  
  const handleRefreshPalette = () => {
    setPaletteIndex((prev) => (prev + 1) % colorPalettes.length);
  };
  
  const currentPalette = colorPalettes[paletteIndex];
  const paletteNumber = currentPalette.id;

  const handleCollectionClick = (collectionId: string) => {
    setSelectedCollection(collectionId);
    // Keep the view on 'collections' when drilling into a collection
  };

  const handleViewChange = (newView: 'items' | 'collections') => {
    setView(newView);
    if (newView === 'collections') {
      setSelectedCollection(null);
    }
  };

  const displayedItems = selectedCollection
    ? mockData.filter(item => item.collectionId === selectedCollection)
    : mockData;

  const selectedCollectionData = selectedCollection
    ? mockCollections.find(c => c.id === selectedCollection)
    : null;

  return (
    <Container>
      <PaletteCredit 
        paletteNumber={paletteNumber} 
        onRefresh={handleRefreshPalette}
      />
      <Header />
      <ViewToggle view={view} onViewChange={handleViewChange} />
      
      {selectedCollection && selectedCollectionData && (
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <button 
            onClick={() => setSelectedCollection(null)}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: 'var(--font-size-sm)',
              cursor: 'pointer',
              padding: 0,
              marginBottom: 'var(--spacing-xs)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            ← All collections
          </button>
          <h2 style={{ 
            fontSize: 'var(--font-size-md)', 
            fontWeight: 500,
            margin: 0,
          }}>
            {selectedCollectionData.name}
          </h2>
        </div>
      )}
      
      <GalleryGrid>
        {view === 'items' && !selectedCollection && displayedItems.map((item) => (
          <GalleryItem key={item.id} item={item} palette={currentPalette} />
        ))}
        
        {view === 'collections' && !selectedCollection && mockCollections.map((collection) => {
          const collectionItems = mockData.filter(item => item.collectionId === collection.id);
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
    </Container>
  );
}
