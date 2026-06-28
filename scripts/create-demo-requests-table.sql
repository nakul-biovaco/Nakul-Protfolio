-- Create demo_requests table for storing demo scheduling requests
CREATE TABLE IF NOT EXISTS demo_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    farm_size VARCHAR(50),
    location VARCHAR(255) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    demo_type VARCHAR(50) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    source VARCHAR(100) DEFAULT 'website',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_preferred_date ON demo_requests(preferred_date);

-- Enable Row Level Security (RLS)
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for form submissions)
CREATE POLICY "Allow demo request submissions" ON demo_requests
    FOR INSERT WITH CHECK (true);

-- Create policy to allow admin users to view all demo requests
-- Note: You'll need to implement proper admin authentication
CREATE POLICY "Allow admin to view demo requests" ON demo_requests
    FOR SELECT USING (true);

-- Create policy to allow admin users to update demo requests
CREATE POLICY "Allow admin to update demo requests" ON demo_requests
    FOR UPDATE USING (true);

-- Add comments for documentation
COMMENT ON TABLE demo_requests IS 'Stores demo scheduling requests from the Electroculture website';
COMMENT ON COLUMN demo_requests.status IS 'Status of the demo request: pending, confirmed, completed, cancelled';
COMMENT ON COLUMN demo_requests.demo_type IS 'Type of demo: office, farm, virtual';
COMMENT ON COLUMN demo_requests.preferred_time IS 'Preferred time slot: morning, afternoon, evening';
COMMENT ON COLUMN demo_requests.source IS 'Source of the request: electroculture_website, foundation_website, etc.';
