-- Create site_settings table for dynamic content
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  profile_image TEXT DEFAULT '/images/nakul-profile.png',
  about_content TEXT DEFAULT 'Passionate Electronics and Communication Engineering student with expertise in embedded systems, IoT, and full-stack development.',
  hero_title TEXT DEFAULT 'Nakul Mahendra Mundhada',
  hero_subtitle TEXT DEFAULT 'Electronics & Communication Engineering Student | Embedded Systems Developer | IoT Enthusiast',
  contact_email TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media table for media management
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media_comments table
CREATE TABLE IF NOT EXISTS media_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  media_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media_likes table for tracking likes
CREATE TABLE IF NOT EXISTS media_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  media_id TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(media_id, ip_address)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_media_type ON media(type);
CREATE INDEX IF NOT EXISTS idx_media_order ON media(order_index);
CREATE INDEX IF NOT EXISTS idx_media_comments_media_id ON media_comments(media_id);
CREATE INDEX IF NOT EXISTS idx_media_likes_media_id ON media_likes(media_id);

-- Insert default site settings if not exists
INSERT INTO site_settings (id, profile_image, about_content, hero_title, hero_subtitle)
SELECT 1, '/images/nakul-profile.png', 
       'Passionate Electronics and Communication Engineering student with expertise in embedded systems, IoT, and full-stack development.',
       'Nakul Mahendra Mundhada',
       'Electronics & Communication Engineering Student | Embedded Systems Developer | IoT Enthusiast'
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE id = 1);

-- Insert sample media data
INSERT INTO media (id, title, description, type, url, thumbnail_url, order_index) VALUES
('1', 'Circuit Design Workshop', 'A comprehensive workshop on advanced circuit design techniques and best practices.', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '/placeholder.svg?height=400&width=600', 1),
('2', 'FPGA Implementation Results', 'Visual results from our latest FPGA implementation project showing performance improvements.', 'image', '/placeholder.svg?height=600&width=800', NULL, 2),
('3', 'Electroculture Research Demo', 'Demonstration of our latest electroculture research findings and their practical applications.', 'video', 'https://www.youtube.com/embed/KYM3BVdAzVU', '/placeholder.svg?height=400&width=600', 3),
('4', 'Lab Setup Documentation', 'Complete documentation of our research lab setup and equipment configuration.', 'image', '/placeholder.svg?height=600&width=800', NULL, 4)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for media files (if using Supabase storage)
-- This would typically be done through the Supabase dashboard
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
