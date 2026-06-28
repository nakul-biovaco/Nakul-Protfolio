-- Create partnership_applications table
CREATE TABLE IF NOT EXISTS partnership_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    organization_type VARCHAR(100) NOT NULL,
    partnership_type VARCHAR(100) NOT NULL,
    annual_commitment VARCHAR(100) NOT NULL,
    focus_areas TEXT[] NOT NULL DEFAULT '{}',
    message TEXT NOT NULL,
    website VARCHAR(500),
    previous_csr BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending',
    source VARCHAR(100) DEFAULT 'foundation_website',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create volunteer_applications table
CREATE TABLE IF NOT EXISTS volunteer_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    age_range VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    occupation VARCHAR(255),
    experience TEXT,
    skills TEXT[] NOT NULL DEFAULT '{}',
    availability VARCHAR(100) NOT NULL,
    preferred_role VARCHAR(100) NOT NULL,
    motivation TEXT NOT NULL,
    languages TEXT[] NOT NULL DEFAULT '{}',
    has_transport BOOLEAN DEFAULT FALSE,
    can_travel BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending',
    source VARCHAR(100) DEFAULT 'foundation_website',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partnership_applications_email ON partnership_applications(email);
CREATE INDEX IF NOT EXISTS idx_partnership_applications_status ON partnership_applications(status);
CREATE INDEX IF NOT EXISTS idx_partnership_applications_created_at ON partnership_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partnership_applications_organization_type ON partnership_applications(organization_type);

CREATE INDEX IF NOT EXISTS idx_volunteer_applications_email ON volunteer_applications(email);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_status ON volunteer_applications(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_created_at ON volunteer_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_preferred_role ON volunteer_applications(preferred_role);

-- Enable Row Level Security (RLS)
ALTER TABLE partnership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for partnership_applications
CREATE POLICY "Allow public insert on partnership_applications" ON partnership_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read on partnership_applications" ON partnership_applications
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role all on partnership_applications" ON partnership_applications
    FOR ALL USING (auth.role() = 'service_role');

-- Create RLS policies for volunteer_applications
CREATE POLICY "Allow public insert on volunteer_applications" ON volunteer_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read on volunteer_applications" ON volunteer_applications
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role all on volunteer_applications" ON volunteer_applications
    FOR ALL USING (auth.role() = 'service_role');

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_partnership_applications_updated_at 
    BEFORE UPDATE ON partnership_applications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteer_applications_updated_at 
    BEFORE UPDATE ON volunteer_applications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE partnership_applications IS 'Stores partnership applications from organizations wanting to collaborate with the foundation';
COMMENT ON TABLE volunteer_applications IS 'Stores volunteer applications from individuals wanting to help with foundation activities';

COMMENT ON COLUMN partnership_applications.focus_areas IS 'Array of focus areas the partner is interested in';
COMMENT ON COLUMN partnership_applications.status IS 'Application status: pending, approved, rejected, in_review';
COMMENT ON COLUMN volunteer_applications.skills IS 'Array of skills and expertise areas';
COMMENT ON COLUMN volunteer_applications.languages IS 'Array of languages the volunteer can speak';
COMMENT ON COLUMN volunteer_applications.status IS 'Application status: pending, approved, rejected, in_review';
