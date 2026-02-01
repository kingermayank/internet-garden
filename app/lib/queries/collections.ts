import { supabase } from '../supabase/client';
import type { CollectionRow } from '../supabase/types';
import type { Collection } from '../../types';

// Transform database row to application type
function toCollection(row: CollectionRow): Collection {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
  };
}

// Fetch all collections
export async function fetchCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching collections:', error);
    throw new Error(`Failed to fetch collections: ${error.message}`);
  }

  return (data ?? []).map(toCollection);
}

// Fetch a single collection by ID
export async function fetchCollectionById(id: string): Promise<Collection | null> {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching collection:', error);
    throw new Error(`Failed to fetch collection: ${error.message}`);
  }

  return toCollection(data);
}
