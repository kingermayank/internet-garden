export type GalleryItem = {
  id: string;
  type: 'image' | 'text' | 'link' | 'pdf';
  title?: string;
  content: string; // URL for images/PDFs, text content, or link URL
  collectionId?: string; // Optional collection membership
  metadata?: {
    description?: string;
    author?: string;
    date?: string;
  };
};

export type Collection = {
  id: string;
  name: string;
  description?: string;
};
