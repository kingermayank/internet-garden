// Database types for Supabase
// Auto-generated and manually maintained for this project

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      gallery_items: {
        Row: {
          id: string;
          type: 'image' | 'text' | 'link' | 'pdf';
          title: string | null;
          content: string;
          collection_id: string | null;
          metadata: GalleryItemMetadata | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: 'image' | 'text' | 'link' | 'pdf';
          title?: string | null;
          content: string;
          collection_id?: string | null;
          metadata?: GalleryItemMetadata | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: 'image' | 'text' | 'link' | 'pdf';
          title?: string | null;
          content?: string;
          collection_id?: string | null;
          metadata?: GalleryItemMetadata | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export interface GalleryItemMetadata {
  description?: string;
  author?: string;
  date?: string;
}

// Convenience types for accessing table rows
export type CollectionRow = Database['public']['Tables']['collections']['Row'];
export type GalleryItemRow = Database['public']['Tables']['gallery_items']['Row'];
export type GalleryItemInsert = Database['public']['Tables']['gallery_items']['Insert'];
export type CollectionInsert = Database['public']['Tables']['collections']['Insert'];
