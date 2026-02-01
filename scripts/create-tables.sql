-- Internet Garden Schema
-- Run this script in Supabase SQL Editor to create the tables

-- =====================================================
-- COLLECTIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on collections"
  ON collections
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- =====================================================
-- GALLERY ITEMS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('image', 'text', 'link', 'pdf')),
  title TEXT,
  content TEXT NOT NULL,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on gallery_items"
  ON gallery_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- =====================================================
-- INDEXES (for better query performance)
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_gallery_items_collection_id 
  ON gallery_items(collection_id);

CREATE INDEX IF NOT EXISTS idx_gallery_items_type 
  ON gallery_items(type);

CREATE INDEX IF NOT EXISTS idx_gallery_items_created_at 
  ON gallery_items(created_at DESC);
