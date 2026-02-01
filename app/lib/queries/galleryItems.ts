import { supabase } from '../supabase/client';
import type { GalleryItemRow, GalleryItemInsert } from '../supabase/types';
import type { GalleryItem } from '../../types';

// Transform database row to application type
function toGalleryItem(row: GalleryItemRow): GalleryItem {
  return {
    id: row.id,
    type: row.type,
    title: row.title ?? undefined,
    content: row.content,
    collectionId: row.collection_id ?? undefined,
    metadata: row.metadata ?? undefined,
  };
}

// Fetch all gallery items
export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching gallery items:', error);
    throw new Error(`Failed to fetch gallery items: ${error.message}`);
  }

  return (data ?? []).map(toGalleryItem);
}

// Fetch gallery items by collection ID
export async function fetchGalleryItemsByCollection(collectionId: string): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('collection_id', collectionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching gallery items by collection:', error);
    throw new Error(`Failed to fetch gallery items: ${error.message}`);
  }

  return (data ?? []).map(toGalleryItem);
}

// Fetch a single gallery item by ID
export async function fetchGalleryItemById(id: string): Promise<GalleryItem | null> {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching gallery item:', error);
    throw new Error(`Failed to fetch gallery item: ${error.message}`);
  }

  return toGalleryItem(data);
}

// Input type for creating a gallery item
export interface CreateGalleryItemInput {
  type: 'image' | 'text' | 'link' | 'pdf';
  title?: string;
  content: string;
  collectionId?: string;
  metadata?: {
    description?: string;
    author?: string;
    date?: string;
  };
}

// Create a new gallery item
export async function createGalleryItem(input: CreateGalleryItemInput): Promise<GalleryItem> {
  const insertData: GalleryItemInsert = {
    type: input.type,
    title: input.title ?? null,
    content: input.content,
    collection_id: input.collectionId ?? null,
    metadata: input.metadata ?? null,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from('gallery_items') as any)
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('Error creating gallery item:', error);
    throw new Error(`Failed to create gallery item: ${error.message}`);
  }

  return toGalleryItem(data as GalleryItemRow);
}
