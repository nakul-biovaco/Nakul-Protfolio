-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255),
  bio TEXT,
  location VARCHAR(255),
  phone VARCHAR(50),
  website VARCHAR(255),
  github VARCHAR(255),
  linkedin VARCHAR(255),
  twitter VARCHAR(255),
  profile_image VARCHAR(255),
  resume_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  detailed_description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'In Progress',
  duration VARCHAR(100),
  team VARCHAR(100),
  highlights TEXT[] DEFAULT '{}',
  challenges TEXT[] DEFAULT '{}',
  outcomes TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  demo_link VARCHAR(255),
  github_link VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create internships table
CREATE TABLE IF NOT EXISTS internships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  duration VARCHAR(100),
  location VARCHAR(255),
  type VARCHAR(50) DEFAULT 'Full-time',
  status VARCHAR(50) DEFAULT 'Completed',
  description TEXT,
  detailed_description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  skills_gained TEXT[] DEFAULT '{}',
  mentor VARCHAR(255),
  certificate BOOLEAN DEFAULT FALSE,
  certificate_url VARCHAR(255),
  certificate_title VARCHAR(255),
  certificate_issuer VARCHAR(255),
  certificate_date DATE,
  recommendation_letter BOOLEAN DEFAULT FALSE,
  company_website VARCHAR(255),
  linkedin_post VARCHAR(255),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects_worked_on table (for internships)
CREATE TABLE IF NOT EXISTS projects_worked_on (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  internship_id UUID REFERENCES internships(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  role VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  degree VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  duration VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Completed',
  gpa VARCHAR(20),
  percentage VARCHAR(20),
  description TEXT,
  coursework TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  level INTEGER CHECK (level >= 0 AND level <= 100),
  experience VARCHAR(100),
  category VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skill_categories table
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  icon VARCHAR(100),
  color VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  replied BOOLEAN DEFAULT FALSE,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  page VARCHAR(255),
  event_name VARCHAR(255),
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  session_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  credential_id VARCHAR(255),
  credential_url VARCHAR(255),
  description TEXT,
  skills TEXT[] DEFAULT '{}',
  certificate_type VARCHAR(100),
  image_url VARCHAR(255),
  badge_url VARCHAR(255),
  verification_url VARCHAR(255),
  internship_id UUID REFERENCES internships(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_internships_status ON internships(status);
CREATE INDEX IF NOT EXISTS idx_education_status ON education(status);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects_worked_on ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for internships" ON internships FOR SELECT USING (true);
CREATE POLICY "Public read access for projects_worked_on" ON projects_worked_on FOR SELECT USING (true);
CREATE POLICY "Public read access for education" ON education FOR SELECT USING (true);
CREATE POLICY "Public read access for skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access for skill_categories" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for certificates" ON certificates FOR SELECT USING (true);

-- Create policies for contact messages (insert only)
CREATE POLICY "Public insert access for contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Create policies for analytics (insert only)
CREATE POLICY "Public insert access for analytics" ON analytics FOR INSERT WITH CHECK (true);
