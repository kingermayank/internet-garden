'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './AddItemModal.module.css';
import type { Collection } from '../types';
import type { CreateGalleryItemInput } from '../lib/queries/galleryItems';

type ItemType = 'image' | 'text' | 'link' | 'pdf';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateGalleryItemInput) => Promise<void>;
  collections: Collection[];
}

const ITEM_TYPES: { value: ItemType; label: string }[] = [
  { value: 'image', label: 'Image' },
  { value: 'text', label: 'Text' },
  { value: 'link', label: 'Link' },
  { value: 'pdf', label: 'PDF' },
];

const CONTENT_HINTS: Record<ItemType, string> = {
  image: 'Enter the image URL',
  text: 'Enter your text content',
  link: 'Enter the link URL',
  pdf: 'Enter the PDF URL',
};

export function AddItemModal({ isOpen, onClose, onSubmit, collections }: AddItemModalProps) {
  const [type, setType] = useState<ItemType>('image');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [collectionId, setCollectionId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setType('image');
    setTitle('');
    setContent('');
    setCollectionId('');
    setDescription('');
    setError(null);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    // Validate URL for image, link, and pdf types
    if ((type === 'image' || type === 'link' || type === 'pdf') && !isValidUrl(content)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsSubmitting(true);

    try {
      const input: CreateGalleryItemInput = {
        type,
        content: content.trim(),
        title: title.trim() || undefined,
        collectionId: collectionId || undefined,
        metadata: description.trim() ? { description: description.trim() } : undefined,
      };

      await onSubmit(input);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isUrlType = type === 'image' || type === 'link' || type === 'pdf';

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Item</h2>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>
              Type <span className={styles.required}>*</span>
            </label>
            <div className={styles.typeButtons}>
              {ITEM_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={type === value ? styles.typeButtonActive : styles.typeButton}
                  onClick={() => setType(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Optional title"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="content">
              {isUrlType ? 'URL' : 'Content'} <span className={styles.required}>*</span>
            </label>
            {type === 'text' ? (
              <textarea
                id="content"
                className={styles.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={CONTENT_HINTS[type]}
              />
            ) : (
              <input
                id="content"
                type="url"
                className={styles.input}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={CONTENT_HINTS[type]}
              />
            )}
            <span className={styles.hint}>{CONTENT_HINTS[type]}</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="collection">
              Collection
            </label>
            <select
              id="collection"
              className={styles.select}
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
            >
              <option value="">No collection</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              style={{ minHeight: '60px' }}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting || !content.trim()}
            >
              {isSubmitting ? 'Adding...' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}
