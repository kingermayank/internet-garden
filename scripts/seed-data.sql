-- Internet Garden Seed Data
-- This script populates collections and gallery_items with sample data

-- =====================================================
-- COLLECTIONS
-- =====================================================

INSERT INTO collections (id, name, description) VALUES
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Design Principles', 'Timeless wisdom on design and aesthetics'),
  ('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'Architecture', 'Spaces, structures, and built environments'),
  ('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'Resources', 'Tools and references for creative work'),
  ('d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'Reading List', 'Books and articles worth revisiting'),
  ('e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', 'Code Snippets', 'Useful patterns and clever solutions'),
  ('f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', 'Visual Inspiration', 'Colors, typography, and beautiful things'),
  ('a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d', 'Philosophy', 'Ideas that shape thinking'),
  ('b8c9d0e1-f2a3-4b5c-5d6e-7f8a9b0c1d2e', 'Music & Sound', 'Sonic discoveries and playlists')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- GALLERY ITEMS - Design Principles (existing collection)
-- =====================================================

INSERT INTO gallery_items (type, title, content, collection_id, metadata) VALUES
  ('text', 'Dieter Rams', 'Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects, and the products are not burdened with non-essentials.', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '{"author": "Dieter Rams", "date": "1976"}'),
  ('text', 'On Simplicity', 'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '{"author": "Antoine de Saint-Exupéry"}'),
  ('link', 'Laws of UX', 'https://lawsofux.com', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '{"description": "A collection of best practices for building interfaces"}'),
  ('image', 'Swiss Design Poster', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=800&fit=crop', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '{"description": "International Typographic Style"}');

-- =====================================================
-- GALLERY ITEMS - Architecture (existing collection)
-- =====================================================

INSERT INTO gallery_items (type, title, content, collection_id, metadata) VALUES
  ('image', 'Concrete Poetry', 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=400&fit=crop', 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '{"description": "Brutalist architecture in urban spaces"}'),
  ('image', 'Light & Shadow', 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=700&fit=crop', 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '{"description": "Natural light in architectural design"}'),
  ('link', 'Atlas of Places', 'https://atlasofplaces.com', 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '{"description": "Architecture, landscape, and urban photography"}'),
  ('text', 'Tadao Ando', 'In all my works, light is an important controlling factor. I create enclosed spaces mainly by means of thick concrete walls.', 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '{"author": "Tadao Ando"}'),
  ('image', 'Museum Interior', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '{"description": "White cube gallery space"}');

-- =====================================================
-- GALLERY ITEMS - Resources (existing collection)
-- =====================================================

INSERT INTO gallery_items (type, title, content, collection_id, metadata) VALUES
  ('link', 'Refactoring UI', 'https://refactoringui.com', 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '{"description": "Learn UI design from scratch"}'),
  ('link', 'The Pudding', 'https://pudding.cool', 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '{"description": "Visual essays and data journalism"}'),
  ('link', 'Coolors', 'https://coolors.co', 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '{"description": "Color palette generator"}'),
  ('link', 'Type Scale', 'https://type-scale.com', 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '{"description": "Visual typography calculator"}'),
  ('pdf', 'Grid Systems', '/documents/grid-systems.pdf', 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '{"description": "Josef Müller-Brockmann''s principles"}');

-- =====================================================
-- GALLERY ITEMS - Reading List (new collection)
-- =====================================================

INSERT INTO gallery_items (type, title, content, collection_id, metadata) VALUES
  ('text', 'Thinking in Systems', 'A system is a set of things—people, cells, molecules, or whatever—interconnected in such a way that they produce their own pattern of behavior over time.', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', '{"author": "Donella Meadows", "date": "2008"}'),
  ('link', 'Essays by Paul Graham', 'http://paulgraham.com/articles.html', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', '{"description": "Startup wisdom and programming philosophy"}'),
  ('link', 'The Art of Unix Programming', 'http://www.catb.org/esr/writings/taoup/html/', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', '{"description": "Eric Raymond on Unix design philosophy"}'),
  ('text', 'Shape Up', 'Six weeks is long enough to build something meaningful start-to-finish and short enough that everyone can feel the deadline looming from the start.', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', '{"author": "Ryan Singer / Basecamp", "date": "2019"}'),
  ('link', 'Stratechery', 'https://stratechery.com', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', '{"description": "Tech business strategy analysis"}'),
  ('image', 'Bookshelf', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', '{"description": "Reading corner inspiration"}');

-- =====================================================
-- GALLERY ITEMS - Code Snippets (new collection)
-- =====================================================

INSERT INTO gallery_items (type, title, content, collection_id, metadata) VALUES
  ('text', 'Array Chunking', 'const chunk = (arr, size) => arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);', 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', '{"description": "Split array into chunks of specified size"}'),
  ('text', 'Debounce', 'const debounce = (fn, ms) => { let id; return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); }};', 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', '{"description": "Delay function execution until after wait time"}'),
  ('link', 'TypeScript Playground', 'https://www.typescriptlang.org/play', 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', '{"description": "Test TypeScript code in the browser"}'),
  ('text', 'Deep Clone', 'const deepClone = obj => JSON.parse(JSON.stringify(obj));', 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', '{"description": "Quick deep clone for serializable objects"}'),
  ('link', '1loc', 'https://1loc.dev', 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', '{"description": "JavaScript utilities in one line of code"}'),
  ('text', 'Shuffle Array', 'const shuffle = arr => arr.sort(() => Math.random() - 0.5);', 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', '{"description": "Fisher-Yates-ish shuffle"}');

-- =====================================================
-- GALLERY ITEMS - Visual Inspiration (new collection)
-- =====================================================

INSERT INTO gallery_items (type, title, content, collection_id, metadata) VALUES
  ('image', 'Gradient Study', 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&h=400&fit=crop', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', '{"description": "Soft color transitions"}'),
  ('image', 'Typography Wall', 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500&h=600&fit=crop', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', '{"description": "Letters as visual elements"}'),
  ('link', 'Fonts In Use', 'https://fontsinuse.com', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', '{"description": "Typography in the wild"}'),
  ('image', 'Color Field', 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', '{"description": "Abstract color composition"}'),
  ('link', 'Happy Hues', 'https://www.happyhues.co', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', '{"description": "Curated color palettes in context"}'),
  ('image', 'Paper Textures', 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500&h=500&fit=crop', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', '{"description": "Organic material inspiration"}'),
  ('link', 'Dribbble', 'https://dribbble.com/shots/popular', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', '{"description": "Design showcase platform"}');

-- =====================================================
-- GALLERY ITEMS - Philosophy (new collection)
-- =====================================================

INSERT INTO gallery_items (type, title, content, collection_id, metadata) VALUES
  ('text', 'Wabi-Sabi', 'Nothing lasts, nothing is finished, and nothing is perfect.', 'a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d', '{"author": "Richard Powell", "description": "Japanese aesthetic philosophy"}'),
  ('text', 'Stoicism', 'We suffer more often in imagination than in reality.', 'a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d', '{"author": "Seneca"}'),
  ('text', 'Flow State', 'The best moments in our lives are not the passive, receptive, relaxing times... the best moments usually occur if a person''s body or mind is stretched to its limits.', 'a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d', '{"author": "Mihaly Csikszentmihalyi"}'),
  ('link', 'Brain Pickings', 'https://www.themarginalian.org', 'a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d', '{"description": "Cross-sections of art, science, and philosophy"}'),
  ('text', 'Beginner Mind', 'In the beginner''s mind there are many possibilities, but in the expert''s there are few.', 'a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d', '{"author": "Shunryu Suzuki", "date": "1970"}'),
  ('image', 'Zen Garden', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop', 'a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d', '{"description": "Mountains and contemplation"}');

-- =====================================================
-- GALLERY ITEMS - Music & Sound (new collection)
-- =====================================================

INSERT INTO gallery_items (type, title, content, collection_id, metadata) VALUES
  ('link', 'Poolsuite FM', 'https://poolsuite.net', 'b8c9d0e1-f2a3-4b5c-5d6e-7f8a9b0c1d2e', '{"description": "Retro summer vibes radio"}'),
  ('link', 'Lofi Girl', 'https://www.youtube.com/@LofiGirl', 'b8c9d0e1-f2a3-4b5c-5d6e-7f8a9b0c1d2e', '{"description": "24/7 beats to relax/study to"}'),
  ('text', 'Brian Eno on Ambient', 'Ambient Music must be able to accommodate many levels of listening attention without enforcing one in particular; it must be as ignorable as it is interesting.', 'b8c9d0e1-f2a3-4b5c-5d6e-7f8a9b0c1d2e', '{"author": "Brian Eno", "date": "1978"}'),
  ('link', 'Radiooooo', 'https://radiooooo.com', 'b8c9d0e1-f2a3-4b5c-5d6e-7f8a9b0c1d2e', '{"description": "The musical time machine"}'),
  ('image', 'Vinyl Collection', 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&h=500&fit=crop', 'b8c9d0e1-f2a3-4b5c-5d6e-7f8a9b0c1d2e', '{"description": "Physical music appreciation"}'),
  ('link', 'Bandcamp', 'https://bandcamp.com/discover', 'b8c9d0e1-f2a3-4b5c-5d6e-7f8a9b0c1d2e', '{"description": "Independent music discovery"}');

-- =====================================================
-- GALLERY ITEMS - Uncategorized (no collection)
-- =====================================================

INSERT INTO gallery_items (type, title, content, collection_id, metadata) VALUES
  ('text', 'Note to Self', 'The obstacle is the way.', NULL, '{"description": "Daily reminder"}'),
  ('image', 'Morning Light', 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=600&h=400&fit=crop', NULL, '{"description": "Captured this morning"}'),
  ('link', 'Are.na', 'https://www.are.na', NULL, '{"description": "A place for collaborative research"}');
