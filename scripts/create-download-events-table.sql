-- Create download_events table for tracking extension download clicks
CREATE TABLE IF NOT EXISTS download_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id VARCHAR(100) NOT NULL DEFAULT 'attendance-insights',
  event_type VARCHAR(100) NOT NULL DEFAULT 'attendance_extension_download_click',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id VARCHAR(128) NOT NULL,
  referrer TEXT,
  source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_term VARCHAR(100),
  utm_content VARCHAR(100),
  device_type VARCHAR(50),
  browser VARCHAR(50),
  country VARCHAR(10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes for fast aggregation and analytics
CREATE INDEX IF NOT EXISTS idx_download_events_project ON download_events(project_id);
CREATE INDEX IF NOT EXISTS idx_download_events_timestamp ON download_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_download_events_session ON download_events(session_id);
CREATE INDEX IF NOT EXISTS idx_download_events_source ON download_events(source);
CREATE INDEX IF NOT EXISTS idx_download_events_event_type ON download_events(event_type);

-- Enable Row Level Security (RLS)
ALTER TABLE download_events ENABLE ROW LEVEL SECURITY;

-- Allow public insert of analytics download events
CREATE POLICY "Allow public insert for download events" ON download_events
  FOR INSERT WITH CHECK (true);

-- Allow select for authenticated / service role or read via backend API
CREATE POLICY "Allow select for download events" ON download_events
  FOR SELECT USING (true);
