-- Create contact_messages table for the contact form
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    detailed_description TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    category VARCHAR(100) DEFAULT 'Other',
    status VARCHAR(50) NOT NULL,
    duration VARCHAR(100),
    team VARCHAR(100),
    highlights TEXT[] DEFAULT '{}',
    challenges TEXT[] DEFAULT '{}',
    outcomes TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    demo_link VARCHAR(500),
    github_link VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create internships table
CREATE TABLE IF NOT EXISTS internships (
    id VARCHAR(100) PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    duration VARCHAR(100),
    location VARCHAR(255),
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    detailed_description TEXT,
    responsibilities TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    achievements TEXT[] DEFAULT '{}',
    skills_gained TEXT[] DEFAULT '{}',
    mentor VARCHAR(255),
    certificate BOOLEAN DEFAULT FALSE,
    certificate_title VARCHAR(255),
    certificate_issuer VARCHAR(255),
    certificate_date DATE,
    certificate_url VARCHAR(500),
    recommendation_letter BOOLEAN DEFAULT FALSE,
    company_website VARCHAR(500),
    linkedin_post VARCHAR(500),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects_worked_on table for internship projects
CREATE TABLE IF NOT EXISTS projects_worked_on (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    internship_id VARCHAR(100) REFERENCES internships(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    role VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
    id VARCHAR(100) PRIMARY KEY,
    degree VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    duration VARCHAR(100),
    status VARCHAR(50) NOT NULL,
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
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level INTEGER CHECK (level >= 0 AND level <= 100),
    experience VARCHAR(50),
    category VARCHAR(100) DEFAULT 'Other',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_id VARCHAR(255),
    credential_url VARCHAR(500),
    description TEXT,
    skills TEXT[] DEFAULT '{}',
    certificate_type VARCHAR(100),
    image_url VARCHAR(500),
    badge_url VARCHAR(500),
    verification_url VARCHAR(500),
    internship_id VARCHAR(100) REFERENCES internships(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    page VARCHAR(255),
    event_data JSONB DEFAULT '{}',
    user_agent TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_internships_order ON internships(order_index);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_certificates_internship ON certificates(internship_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);

-- Insert sample data
INSERT INTO projects (id, title, description, long_description, detailed_description, tech_stack, category, status, duration, team, highlights, challenges, outcomes, images, demo_link, github_link, featured, order_index) VALUES
('smart-agriculture-iot', 'Smart Agriculture IoT System', 'An intelligent IoT-based monitoring system for precision agriculture with automated irrigation control, real-time sensor data collection, and mobile app integration.', 'This comprehensive system combines multiple sensors (soil moisture, temperature, humidity, pH) with Arduino-based controllers to create an automated farming solution. The system includes weather prediction integration, crop recommendation algorithms, and a user-friendly mobile interface for farmers.', 'This project represents a complete end-to-end IoT solution designed specifically for modern agriculture. The system addresses critical challenges faced by farmers today, including water scarcity, unpredictable weather patterns, and the need for precision farming techniques.

The core architecture consists of multiple sensor nodes distributed across the farm, each equipped with soil moisture sensors, temperature and humidity sensors, pH meters, and light sensors. These nodes communicate wirelessly using LoRa technology to ensure long-range, low-power communication even in remote agricultural areas.

The central processing unit, built around an ESP32 microcontroller, aggregates data from all sensor nodes and makes intelligent decisions about irrigation timing and duration. The system integrates with weather APIs to factor in upcoming rainfall predictions, preventing unnecessary watering.

A key innovation is the machine learning component that learns from historical data to optimize watering schedules based on crop type, growth stage, and environmental conditions. The mobile application provides farmers with real-time insights, alerts, and manual override capabilities.', ARRAY['Arduino', 'ESP32', 'C++', 'React Native', 'Firebase', 'IoT', 'Sensors', 'Machine Learning', 'LoRa', 'Weather APIs'], 'IoT & Agriculture', 'Completed', '6 months', '4 members', ARRAY['30% reduction in water usage', 'Real-time monitoring dashboard', 'Automated irrigation system', 'Weather prediction integration', 'Machine learning optimization', 'Mobile app with push notifications'], ARRAY['Ensuring reliable wireless communication in outdoor environments', 'Optimizing power consumption for battery-operated sensor nodes', 'Developing accurate soil moisture calibration algorithms', 'Creating an intuitive user interface for non-technical farmers'], ARRAY['Successfully deployed in 5 pilot farms', 'Achieved 30% water savings on average', 'Improved crop yield by 15%', 'Reduced manual monitoring time by 80%', 'Received positive feedback from all pilot users'], ARRAY['/placeholder.svg?height=400&width=600'], 'https://demo.smart-agriculture.com', 'https://github.com/nakul/smart-agriculture', TRUE, 1),

('ai-crop-disease-detection', 'AI-Powered Crop Disease Detection', 'Machine learning model using computer vision to detect and classify crop diseases from leaf images with 94% accuracy.', 'Developed a deep learning solution using convolutional neural networks to identify various crop diseases. The system can detect over 15 different diseases across multiple crop types and provides treatment recommendations.', 'This AI-powered solution addresses one of the most critical challenges in agriculture: early detection and accurate diagnosis of crop diseases. Traditional methods rely on expert knowledge and visual inspection, which can be time-consuming and prone to human error.

Our solution leverages state-of-the-art computer vision and deep learning techniques to provide instant, accurate disease diagnosis from simple smartphone photos. The system is built on a custom CNN architecture optimized for agricultural image classification.

The training dataset consists of over 50,000 high-quality images of healthy and diseased crop leaves, covering 15 different diseases across major crops including tomatoes, potatoes, corn, and wheat. Data augmentation techniques were employed to improve model robustness.

The system not only identifies diseases but also provides confidence scores, treatment recommendations, and preventive measures. Integration with agricultural databases ensures up-to-date treatment protocols and chemical recommendations.', ARRAY['Python', 'TensorFlow', 'OpenCV', 'React', 'Flask', 'CNN', 'Image Processing', 'REST APIs'], 'AI & Machine Learning', 'Completed', '4 months', '3 members', ARRAY['94% accuracy in disease detection', '15+ disease classifications', 'Real-time image processing', 'Treatment recommendations', 'Mobile-friendly web interface', 'Offline capability for remote areas'], ARRAY['Collecting and labeling high-quality training data', 'Handling variations in lighting and image quality', 'Optimizing model size for mobile deployment', 'Ensuring accuracy across different crop varieties'], ARRAY['Achieved 94% accuracy on test dataset', 'Successfully deployed as web application', 'Positive validation from agricultural experts', 'Featured in college research symposium', 'Potential for commercial deployment identified'], ARRAY['/placeholder.svg?height=400&width=600'], 'https://demo.crop-disease-detection.com', 'https://github.com/nakul/crop-disease-detection', TRUE, 2),

('blockchain-supply-chain', 'Blockchain Supply Chain Tracker', 'Decentralized application for tracking agricultural products from farm to consumer using blockchain technology.', 'Built a transparent supply chain management system using Ethereum blockchain to ensure food safety and authenticity. The system tracks products through every stage of the supply chain.', 'This blockchain-based supply chain solution addresses the growing need for transparency and traceability in the agricultural sector. With increasing concerns about food safety, authenticity, and ethical sourcing, our system provides an immutable record of a product''s journey from farm to consumer.

The system is built on the Ethereum blockchain, utilizing smart contracts to automate and secure transactions at each stage of the supply chain. Each product is assigned a unique digital identity that cannot be tampered with, ensuring complete transparency.

Key stakeholders including farmers, processors, distributors, retailers, and consumers can access relevant information about products through a user-friendly web interface. The system supports QR code scanning for instant product verification.

The smart contracts automatically execute payments and transfers when predefined conditions are met, reducing the need for intermediaries and increasing efficiency. Integration with IoT sensors provides real-time data about storage conditions, temperature, and handling.', ARRAY['Solidity', 'Ethereum', 'Web3.js', 'React', 'Node.js', 'IPFS', 'Smart Contracts', 'QR Codes'], 'Blockchain & Web3', 'In Progress', '5 months', '2 members', ARRAY['Immutable product tracking', 'Smart contract automation', 'QR code verification system', 'Real-time IoT integration', 'Multi-stakeholder platform', 'Reduced fraud and counterfeiting'], ARRAY['High gas fees on Ethereum network', 'Scalability issues with blockchain', 'User adoption and education', 'Integration with existing systems'], ARRAY['Successfully deployed on testnet', 'Positive feedback from pilot users', 'Reduced verification time by 70%', 'Improved supply chain transparency', 'Interest from agricultural cooperatives'], ARRAY['/placeholder.svg?height=400&width=600'], 'https://demo.blockchain-supply.com', 'https://github.com/nakul/blockchain-supply-chain', FALSE, 3)

ON CONFLICT (id) DO NOTHING;

-- Insert internships data
INSERT INTO internships (id, company, role, duration, location, type, status, description, detailed_description, responsibilities, technologies, achievements, skills_gained, mentor, certificate, certificate_title, certificate_issuer, certificate_date, order_index) VALUES
('tech-innovation-labs', 'Tech Innovation Labs', 'Embedded Systems Intern', 'June 2023 - August 2023', 'Pune, Maharashtra', 'Full-time', 'Completed', 'Worked on IoT-based monitoring systems for agricultural applications, developing sensor integration modules and contributing to firmware development for microcontroller-based systems.', 'During my internship at Tech Innovation Labs, I was part of a dynamic team working on cutting-edge IoT solutions for the agricultural sector. This experience provided me with hands-on exposure to real-world embedded systems development and project management.

The primary project involved developing a comprehensive IoT monitoring system for precision agriculture. My role encompassed both hardware and software development, from sensor integration to mobile application development. I worked closely with senior engineers to understand industry best practices and contribute meaningfully to the project.

One of the most valuable aspects of this internship was the exposure to the complete product development lifecycle. I participated in requirement analysis, system design, implementation, testing, and deployment phases. This holistic experience helped me understand how theoretical knowledge translates into practical solutions.

The company culture emphasized innovation and continuous learning. I had the opportunity to attend technical workshops, participate in code reviews, and present my work to stakeholders. The mentorship provided by senior team members was instrumental in my professional growth.', ARRAY['Developed Arduino-based sensor integration modules for soil monitoring', 'Implemented wireless communication protocols (WiFi, LoRa) for data transmission', 'Created mobile app interface for real-time monitoring and control', 'Collaborated with hardware team on PCB design and testing', 'Documented technical specifications and user manuals', 'Participated in client meetings and requirement gathering sessions', 'Conducted field testing and system optimization', 'Mentored junior interns and new team members'], ARRAY['Arduino', 'ESP32', 'C/C++', 'IoT', 'LoRa', 'React Native', 'Firebase', 'PCB Design', 'Git'], ARRAY['Reduced sensor response time by 40% through code optimization', 'Successfully deployed 10+ monitoring units in pilot farms', 'Received ''Outstanding Intern'' award for exceptional performance', 'Contributed to 2 patent applications for innovative IoT solutions', 'Developed reusable sensor library adopted by the team', 'Improved system reliability by 25% through robust error handling'], ARRAY['Embedded Systems Programming', 'IoT Protocol Implementation', 'Mobile App Development', 'Hardware-Software Integration', 'Project Documentation', 'Team Collaboration', 'Client Communication', 'Agile Development Methodology'], 'Dr. Rajesh Kumar - Senior IoT Engineer', TRUE, 'Outstanding Intern Certificate', 'Tech Innovation Labs', '2023-08-15', 1),

('agritech-solutions', 'AgriTech Solutions', 'Software Development Intern', 'December 2022 - February 2023', 'Nagpur, Maharashtra', 'Part-time', 'Completed', 'Contributed to the development of web applications for agricultural data management, gaining experience in full-stack development and database design for agricultural monitoring systems.', 'My internship at AgriTech Solutions was a transformative experience that introduced me to the world of full-stack web development in the agricultural technology sector. Working in a startup environment, I gained exposure to rapid development cycles and the importance of delivering scalable solutions.

The company specializes in developing software solutions for agricultural data management and analytics. During my tenure, I worked on multiple projects ranging from data visualization dashboards to API development for mobile applications. This diverse exposure helped me understand different aspects of software development.

One of the key learning experiences was working with large datasets of agricultural information. I learned about data preprocessing, optimization techniques, and the importance of efficient database design. The real-world data challenges taught me valuable lessons about scalability and performance optimization.

The collaborative environment at AgriTech Solutions encouraged knowledge sharing and peer learning. I participated in daily standups, sprint planning, and retrospectives, gaining practical experience with Agile development methodologies.', ARRAY['Developed responsive web interfaces using React and modern CSS frameworks', 'Implemented RESTful APIs for agricultural data management', 'Designed and optimized database schemas for crop monitoring data', 'Integrated third-party weather APIs for predictive analytics', 'Performed unit testing and debugging of web applications', 'Collaborated with UI/UX designers on interface improvements', 'Participated in code reviews and technical discussions', 'Created comprehensive API documentation'], ARRAY['React', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'REST APIs', 'Git', 'AWS', 'Docker'], ARRAY['Improved application performance by 35% through code optimization', 'Successfully integrated 5+ external APIs for weather and market data', 'Developed reusable component library used across multiple projects', 'Mentored 2 junior interns in web development best practices', 'Implemented automated testing suite improving code quality', 'Contributed to open-source agricultural data visualization library'], ARRAY['Full-Stack Web Development', 'Database Design & Optimization', 'API Integration', 'Version Control (Git)', 'Agile Development Methodology', 'Cloud Deployment (AWS)', 'Testing & Quality Assurance', 'Technical Documentation'], 'Ms. Priya Sharma - Lead Full-Stack Developer', TRUE, 'Software Development Internship Certificate', 'AgriTech Solutions', '2023-02-28', 2)

ON CONFLICT (id) DO NOTHING;

-- Insert projects worked on for internships
INSERT INTO projects_worked_on (internship_id, name, description, role) VALUES
('tech-innovation-labs', 'Smart Irrigation Controller', 'Automated irrigation system with weather integration', 'Lead Developer'),
('tech-innovation-labs', 'Sensor Network Optimization', 'Improved communication efficiency in sensor networks', 'Software Developer'),
('tech-innovation-labs', 'Mobile Dashboard App', 'Real-time monitoring application for farmers', 'Frontend Developer'),
('agritech-solutions', 'Agricultural Data Dashboard', 'Real-time visualization of farm data and analytics', 'Full-Stack Developer'),
('agritech-solutions', 'Weather Integration API', 'Service for integrating multiple weather data sources', 'Backend Developer'),
('agritech-solutions', 'Crop Recommendation System', 'ML-based system for crop selection recommendations', 'Frontend Developer')

ON CONFLICT DO NOTHING;

-- Insert education data
INSERT INTO education (id, degree, institution, location, duration, status, gpa, description, coursework, achievements, order_index) VALUES
('btech-ece', 'Bachelor of Technology - Electronics and Communication Engineering', 'Ramdeobaba College of Engineering and Management (RCOEM)', 'Nagpur, Maharashtra, India', '2021 - 2025 (Expected)', 'Current', '8.5/10', 'Specializing in embedded systems, digital signal processing, and communication systems. Active participant in technical clubs and project development.', ARRAY['Digital Signal Processing', 'Embedded Systems Design', 'Communication Systems', 'VLSI Design', 'Microprocessors & Microcontrollers', 'Control Systems', 'Analog and Digital Electronics', 'Signal Processing', 'Computer Networks', 'Database Management Systems'], ARRAY['Dean''s List for Academic Excellence (2022-2023)', 'Best Project Award - Smart Agriculture System', 'Active member of Electronics Club', 'Participated in National Level Technical Competitions', 'Published research paper on IoT in Agriculture', 'Led team in Inter-college Hackathon'], 1),

('hsc', 'Higher Secondary Certificate (HSC) - Science', 'Somalwar High School and Junior College', 'Nagpur, Maharashtra, India', '2019 - 2021', 'Completed', '92.5%', 'Completed higher secondary education with focus on Physics, Chemistry, Mathematics, and Computer Science.', ARRAY['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'English', 'Environmental Science'], ARRAY['Secured 92.5% in HSC Board Examinations', 'District rank holder in Mathematics', 'Participated in State Level Science Exhibition', 'Member of School Science Club', 'Winner of Inter-school Programming Competition'], 2)

ON CONFLICT (id) DO NOTHING;

-- Insert skills data
INSERT INTO skills (id, name, level, experience, category, order_index) VALUES
-- Programming Languages
('cpp', 'C/C++', 90, '3+ years', 'Programming Languages', 1),
('python', 'Python', 85, '2+ years', 'Programming Languages', 2),
('javascript', 'JavaScript', 80, '2+ years', 'Programming Languages', 3),
('typescript', 'TypeScript', 75, '1+ years', 'Programming Languages', 4),
('java', 'Java', 70, '1+ years', 'Programming Languages', 5),

-- Web Development
('react', 'React', 85, '2+ years', 'Web Development', 1),
('nextjs', 'Next.js', 80, '1+ years', 'Web Development', 2),
('nodejs', 'Node.js', 75, '1+ years', 'Web Development', 3),
('html', 'HTML/CSS', 90, '3+ years', 'Web Development', 4),
('tailwind', 'Tailwind CSS', 85, '1+ years', 'Web Development', 5),

-- Embedded Systems
('arduino', 'Arduino', 90, '3+ years', 'Embedded Systems', 1),
('esp32', 'ESP32', 85, '2+ years', 'Embedded Systems', 2),
('iot', 'IoT', 80, '2+ years', 'Embedded Systems', 3),
('sensors', 'Sensors & Actuators', 85, '2+ years', 'Embedded Systems', 4),

-- AI/ML
('tensorflow', 'TensorFlow', 75, '1+ years', 'AI/ML', 1),
('opencv', 'OpenCV', 70, '1+ years', 'AI/ML', 2),
('ml', 'Machine Learning', 75, '1+ years', 'AI/ML', 3),

-- Databases
('mongodb', 'MongoDB', 75, '1+ years', 'Databases', 1),
('mysql', 'MySQL', 70, '1+ years', 'Databases', 2),
('supabase', 'Supabase', 80, '1+ years', 'Databases', 3),

-- Tools
('git', 'Git', 85, '2+ years', 'Tools', 1),
('docker', 'Docker', 65, '6 months', 'Tools', 2),
('figma', 'Figma', 70, '1+ years', 'Tools', 3)

ON CONFLICT (id) DO NOTHING;

-- Insert certificates data
INSERT INTO certificates (id, title, issuer, issue_date, description, skills, certificate_type, credential_id, verification_url, internship_id) VALUES
('cert-tech-innovation', 'Outstanding Intern Certificate', 'Tech Innovation Labs', '2023-08-15', 'Awarded for exceptional performance during the Embedded Systems Internship program, demonstrating outstanding technical skills and innovative problem-solving abilities.', ARRAY['Embedded Systems', 'IoT', 'Arduino', 'Project Management', 'Team Leadership'], 'Internship', 'TIL-2023-OUT-001', 'https://verify.techinnovationlabs.com/cert/TIL-2023-OUT-001', 'tech-innovation-labs'),

('cert-agritech', 'Software Development Internship Certificate', 'AgriTech Solutions', '2023-02-28', 'Successfully completed the Software Development Internship program with focus on full-stack web development and agricultural technology solutions.', ARRAY['Full-Stack Development', 'React', 'Node.js', 'Database Design', 'API Development'], 'Internship', 'ATS-2023-SDE-002', 'https://verify.agritechsolutions.com/cert/ATS-2023-SDE-002', 'agritech-solutions'),

('cert-aws-cloud', 'AWS Cloud Practitioner', 'Amazon Web Services', '2023-05-20', 'Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support.', ARRAY['Cloud Computing', 'AWS Services', 'Cloud Security', 'Cloud Architecture'], 'Professional', 'AWS-CCP-2023-05-001', 'https://aws.amazon.com/verification/cert/AWS-CCP-2023-05-001', NULL),

('cert-python', 'Python for Data Science', 'Coursera - University of Michigan', '2023-01-15', 'Comprehensive course covering Python programming fundamentals, data analysis with pandas, and data visualization.', ARRAY['Python', 'Data Analysis', 'Pandas', 'Data Visualization', 'NumPy'], 'Course', 'COURSERA-PY-DS-2023-001', 'https://coursera.org/verify/COURSERA-PY-DS-2023-001', NULL)

ON CONFLICT (id) DO NOTHING;
