-- Create visitor_analytics table (or view onto analytics)
CREATE TABLE IF NOT EXISTS visitor_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL DEFAULT 'page_view',
    event_name VARCHAR(100) NOT NULL DEFAULT 'page_view',
    page VARCHAR(255),
    event_data JSONB DEFAULT '{}',
    user_agent TEXT,
    session_id VARCHAR(255),
    ip_address VARCHAR(100),
    country VARCHAR(10),
    city VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE visitor_analytics ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts
CREATE POLICY "Allow public insert to visitor_analytics" 
ON visitor_analytics FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow public read
CREATE POLICY "Allow public select from visitor_analytics" 
ON visitor_analytics FOR SELECT 
TO anon, authenticated 
USING (true);

-- Index for analytics aggregation
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_created_at ON visitor_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_session_id ON visitor_analytics(session_id);
