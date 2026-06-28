-- Insert sample profile data
INSERT INTO public.profiles (id, name, email, title, bio, location, phone, github, linkedin, twitter) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Nakul Mahendra Mundhada', 'nakul.mundhada@example.com', 'Electronics & Communication Engineering Student', 'Passionate about IoT, AI/ML, and embedded systems. Currently pursuing B.Tech in ECE with focus on innovative technology solutions.', 'Nagpur, Maharashtra, India', '+91 98765 43210', 'https://github.com/nakulm', 'https://linkedin.com/in/nakul-mundhada', 'https://twitter.com/nakulm')
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  bio = EXCLUDED.bio,
  location = EXCLUDED.location,
  phone = EXCLUDED.phone,
  github = EXCLUDED.github,
  linkedin = EXCLUDED.linkedin,
  twitter = EXCLUDED.twitter;

-- Insert sample projects
INSERT INTO public.projects (id, title, description, long_description, detailed_description, tech_stack, category, status, duration, team, highlights, challenges, outcomes, images, demo_link, github_link, featured, order_index) VALUES
('proj-1', 'Smart Agriculture IoT System', 'An intelligent IoT-based monitoring system for precision agriculture with automated irrigation control, real-time sensor data collection, and mobile app integration.', 'This comprehensive system combines multiple sensors (soil moisture, temperature, humidity, pH) with Arduino-based controllers to create an automated farming solution. The system includes weather prediction integration, crop recommendation algorithms, and a user-friendly mobile interface for farmers.', 'This project represents a complete end-to-end IoT solution designed specifically for modern agriculture. The system addresses critical challenges faced by farmers today, including water scarcity, unpredictable weather patterns, and the need for precision farming techniques. The core architecture consists of multiple sensor nodes distributed across the farm, each equipped with soil moisture sensors, temperature and humidity sensors, pH meters, and light sensors.', ARRAY['Arduino', 'ESP32', 'C++', 'React Native', 'Firebase', 'IoT', 'Sensors', 'Machine Learning', 'LoRa', 'Weather APIs'], 'IoT & Agriculture', 'Completed', '6 months', '4 members', ARRAY['30% reduction in water usage', 'Real-time monitoring dashboard', 'Automated irrigation system', 'Weather prediction integration', 'Machine learning optimization', 'Mobile app with push notifications'], ARRAY['Ensuring reliable wireless communication in outdoor environments', 'Optimizing power consumption for battery-operated sensor nodes', 'Developing accurate soil moisture calibration algorithms', 'Creating an intuitive user interface for non-technical farmers'], ARRAY['Successfully deployed in 5 pilot farms', 'Achieved 30% water savings on average', 'Improved crop yield by 15%', 'Reduced manual monitoring time by 80%', 'Received positive feedback from all pilot users'], ARRAY['/placeholder.svg?height=400&width=600'], 'https://demo.smart-agriculture.com', 'https://github.com/nakul/smart-agriculture', true, 1),

('proj-2', 'AI-Powered Crop Disease Detection', 'Machine learning model using computer vision to detect and classify crop diseases from leaf images with 94% accuracy.', 'Developed a deep learning solution using convolutional neural networks to identify various crop diseases. The system can detect over 15 different diseases across multiple crop types and provides treatment recommendations.', 'This AI-powered solution addresses one of the most critical challenges in agriculture: early detection and accurate diagnosis of crop diseases. Traditional methods rely on expert knowledge and visual inspection, which can be time-consuming and prone to human error. Our solution leverages state-of-the-art computer vision and deep learning techniques to provide instant, accurate disease diagnosis from simple smartphone photos.', ARRAY['Python', 'TensorFlow', 'OpenCV', 'React', 'Flask', 'CNN', 'Image Processing', 'REST APIs'], 'AI & Machine Learning', 'Completed', '4 months', '3 members', ARRAY['94% accuracy in disease detection', '15+ disease classifications', 'Real-time image processing', 'Treatment recommendations', 'Mobile-friendly web interface', 'Offline capability for remote areas'], ARRAY['Collecting and labeling high-quality training data', 'Handling variations in lighting and image quality', 'Optimizing model size for mobile deployment', 'Ensuring accuracy across different crop varieties'], ARRAY['Achieved 94% accuracy on test dataset', 'Successfully deployed as web application', 'Positive validation from agricultural experts', 'Featured in college research symposium', 'Potential for commercial deployment identified'], ARRAY['/placeholder.svg?height=400&width=600'], 'https://demo.crop-disease-detection.com', 'https://github.com/nakul/crop-disease-detection', true, 2),

('proj-3', 'Home Automation System', 'IoT-based smart home automation system with voice control, mobile app, and energy monitoring capabilities.', 'Complete home automation solution with ESP32-based controllers, relay modules, and sensor integration for lighting, temperature, security, and energy management.', 'This comprehensive home automation system transforms any regular home into a smart, connected environment. The system provides centralized control over lighting, HVAC, security systems, and appliances while offering energy monitoring and optimization features.', ARRAY['ESP32', 'Arduino', 'React Native', 'Firebase', 'Voice Recognition', 'IoT', 'Sensors', 'Relay Control'], 'IoT & Home Automation', 'In Progress', '5 months', '2 members', ARRAY['Voice control integration', 'Mobile app control', 'Energy monitoring', 'Security system integration', 'Automated scheduling', 'Remote access capability'], ARRAY['Ensuring reliable WiFi connectivity', 'Integrating multiple device protocols', 'Creating intuitive user interfaces', 'Implementing robust security measures'], ARRAY['Successfully automated 15+ home devices', 'Achieved 25% energy savings', 'Implemented voice control for major functions', 'Created comprehensive mobile application'], ARRAY['/placeholder.svg?height=400&width=600'], null, 'https://github.com/nakul/home-automation', false, 3)

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  long_description = EXCLUDED.long_description,
  detailed_description = EXCLUDED.detailed_description,
  tech_stack = EXCLUDED.tech_stack,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  duration = EXCLUDED.duration,
  team = EXCLUDED.team,
  highlights = EXCLUDED.highlights,
  challenges = EXCLUDED.challenges,
  outcomes = EXCLUDED.outcomes,
  featured = EXCLUDED.featured,
  order_index = EXCLUDED.order_index;

-- Insert sample internships
INSERT INTO public.internships (id, company, role, duration, location, type, status, description, detailed_description, responsibilities, technologies, achievements, skills_gained, mentor, certificate, certificate_title, certificate_issuer, certificate_date, order_index) VALUES
('intern-1', 'Tech Innovation Labs', 'Embedded Systems Intern', 'June 2023 - August 2023', 'Pune, Maharashtra', 'Full-time', 'Completed', 'Worked on IoT-based monitoring systems for agricultural applications, developing sensor integration modules and contributing to firmware development for microcontroller-based systems.', 'During my internship at Tech Innovation Labs, I was part of a dynamic team working on cutting-edge IoT solutions for the agricultural sector. This experience provided me with hands-on exposure to real-world embedded systems development and project management. The primary project involved developing a comprehensive IoT monitoring system for precision agriculture.', ARRAY['Developed Arduino-based sensor integration modules for soil monitoring', 'Implemented wireless communication protocols (WiFi, LoRa) for data transmission', 'Created mobile app interface for real-time monitoring and control', 'Collaborated with hardware team on PCB design and testing'], ARRAY['Arduino', 'ESP32', 'C/C++', 'IoT', 'LoRa', 'React Native', 'Firebase', 'PCB Design', 'Git'], ARRAY['Reduced sensor response time by 40% through code optimization', 'Successfully deployed 10+ monitoring units in pilot farms', 'Received Outstanding Intern award for exceptional performance', 'Contributed to 2 patent applications for innovative IoT solutions'], ARRAY['Embedded Systems Programming', 'IoT Protocol Implementation', 'Mobile App Development', 'Hardware-Software Integration', 'Project Documentation'], 'Dr. Rajesh Kumar - Senior IoT Engineer', true, 'Outstanding Intern Certificate', 'Tech Innovation Labs', '2023-08-15', 1),

('intern-2', 'AgriTech Solutions', 'AI/ML Research Intern', 'December 2023 - February 2024', 'Remote', 'Part-time', 'Completed', 'Focused on developing machine learning models for crop disease detection and yield prediction using computer vision and data analytics.', 'This remote internship provided me with extensive experience in applying AI/ML techniques to agricultural challenges. I worked on developing and optimizing deep learning models for crop disease detection while also contributing to yield prediction algorithms using historical and real-time agricultural data.', ARRAY['Developed CNN models for crop disease classification', 'Implemented data preprocessing pipelines for agricultural datasets', 'Created REST APIs for model deployment', 'Conducted research on yield prediction algorithms'], ARRAY['Python', 'TensorFlow', 'OpenCV', 'Pandas', 'NumPy', 'Flask', 'Docker', 'AWS', 'Git'], ARRAY['Achieved 94% accuracy in disease detection model', 'Reduced model inference time by 60%', 'Successfully deployed models to production', 'Published research findings in internal technical report'], ARRAY['Deep Learning', 'Computer Vision', 'Data Science', 'Model Deployment', 'Research Methodology'], 'Dr. Priya Sharma - Lead Data Scientist', true, 'AI/ML Research Completion Certificate', 'AgriTech Solutions', '2024-02-28', 2)

ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  role = EXCLUDED.role,
  duration = EXCLUDED.duration,
  location = EXCLUDED.location,
  type = EXCLUDED.type,
  status = EXCLUDED.status,
  description = EXCLUDED.description,
  detailed_description = EXCLUDED.detailed_description,
  responsibilities = EXCLUDED.responsibilities,
  technologies = EXCLUDED.technologies,
  achievements = EXCLUDED.achievements,
  skills_gained = EXCLUDED.skills_gained,
  mentor = EXCLUDED.mentor,
  certificate = EXCLUDED.certificate,
  certificate_title = EXCLUDED.certificate_title,
  certificate_issuer = EXCLUDED.certificate_issuer,
  certificate_date = EXCLUDED.certificate_date,
  order_index = EXCLUDED.order_index;

-- Insert projects worked on during internships
INSERT INTO public.projects_worked_on (internship_id, name, description, role) VALUES
('intern-1', 'Smart Irrigation Controller', 'Automated irrigation system with weather integration and soil moisture monitoring', 'Lead Developer'),
('intern-1', 'Sensor Network Optimization', 'Optimized wireless sensor network for better range and power efficiency', 'Hardware Developer'),
('intern-2', 'Crop Disease Detection Model', 'Deep learning model for identifying plant diseases from leaf images', 'ML Engineer'),
('intern-2', 'Yield Prediction System', 'Predictive analytics system for crop yield estimation', 'Data Scientist')

ON CONFLICT DO NOTHING;

-- Insert sample education
INSERT INTO public.education (id, degree, institution, location, duration, status, gpa, description, coursework, achievements, order_index) VALUES
('edu-1', 'Bachelor of Technology - Electronics and Communication Engineering', 'Ramdeobaba College of Engineering and Management (RCOEM)', 'Nagpur, Maharashtra, India', '2021 - 2025 (Expected)', 'Current', '8.5/10', 'Specializing in embedded systems, digital signal processing, and communication systems. Active participant in technical clubs and project development.', ARRAY['Digital Signal Processing', 'Embedded Systems Design', 'Communication Systems', 'VLSI Design', 'Microprocessors & Microcontrollers', 'Control Systems', 'Machine Learning', 'IoT Systems'], ARRAY['Deans List for Academic Excellence (2022-2023)', 'Best Project Award - Smart Agriculture System', 'Active member of Electronics Club', 'Participated in National Level Technical Competitions', 'IEEE Student Member'], 1),

('edu-2', 'Higher Secondary Certificate (HSC)', 'Kendriya Vidyalaya', 'Nagpur, Maharashtra, India', '2019 - 2021', 'Completed', '92.5%', 'Science stream with focus on Physics, Chemistry, and Mathematics. Developed strong foundation in analytical thinking and problem-solving.', ARRAY['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'English'], ARRAY['School Topper in Mathematics', 'Science Exhibition Winner', 'Computer Programming Competition Winner'], 2)

ON CONFLICT (id) DO UPDATE SET
  degree = EXCLUDED.degree,
  institution = EXCLUDED.institution,
  location = EXCLUDED.location,
  duration = EXCLUDED.duration,
  status = EXCLUDED.status,
  gpa = EXCLUDED.gpa,
  description = EXCLUDED.description,
  coursework = EXCLUDED.coursework,
  achievements = EXCLUDED.achievements,
  order_index = EXCLUDED.order_index;

-- Insert sample skills
INSERT INTO public.skills (id, name, level, experience, category, order_index) VALUES
('skill-1', 'C/C++', 90, '3+ years', 'Programming Languages', 1),
('skill-2', 'Python', 85, '2+ years', 'Programming Languages', 2),
('skill-3', 'JavaScript', 80, '2+ years', 'Programming Languages', 3),
('skill-4', 'Arduino', 90, '3+ years', 'Embedded Systems', 1),
('skill-5', 'ESP32', 85, '2+ years', 'Embedded Systems', 2),
('skill-6', 'Raspberry Pi', 75, '1+ years', 'Embedded Systems', 3),
('skill-7', 'React', 85, '2+ years', 'Web Development', 1),
('skill-8', 'Next.js', 80, '1+ years', 'Web Development', 2),
('skill-9', 'Node.js', 75, '1+ years', 'Web Development', 3),
('skill-10', 'TensorFlow', 80, '1+ years', 'AI/ML', 1),
('skill-11', 'OpenCV', 75, '1+ years', 'AI/ML', 2),
('skill-12', 'Machine Learning', 85, '2+ years', 'AI/ML', 3),
('skill-13', 'IoT', 90, '3+ years', 'Technologies', 1),
('skill-14', 'Firebase', 80, '2+ years', 'Technologies', 2),
('skill-15', 'Git', 85, '2+ years', 'Tools', 1)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  level = EXCLUDED.level,
  experience = EXCLUDED.experience,
  category = EXCLUDED.category,
  order_index = EXCLUDED.order_index;

-- Insert sample certificates
INSERT INTO public.certificates (id, title, issuer, issue_date, credential_id, description, skills, certificate_type, internship_id) VALUES
('cert-1', 'Outstanding Intern Certificate', 'Tech Innovation Labs', '2023-08-15', 'TIL-2023-001', 'Awarded for exceptional performance during internship program, demonstrating excellence in embedded systems development and IoT solutions.', ARRAY['Embedded Systems', 'IoT Development', 'Arduino Programming', 'Project Management', 'Team Collaboration'], 'Internship', 'intern-1'),

('cert-2', 'AI/ML Research Completion Certificate', 'AgriTech Solutions', '2024-02-28', 'AGS-2024-002', 'Successfully completed research internship focusing on machine learning applications in agriculture, with significant contributions to crop disease detection systems.', ARRAY['Machine Learning', 'Deep Learning', 'Computer Vision', 'Python Programming', 'Research Methodology'], 'Internship', 'intern-2'),

('cert-3', 'Arduino Certified Professional', 'Arduino Foundation', '2023-05-20', 'ARD-CERT-2023-789', 'Professional certification demonstrating advanced proficiency in Arduino programming, circuit design, and embedded systems development.', ARRAY['Arduino Programming', 'Circuit Design', 'Embedded Systems', 'Sensor Integration', 'IoT Development'], 'Professional', null),

('cert-4', 'Machine Learning Specialization', 'Coursera - Stanford University', '2023-12-10', 'COURSERA-ML-2023-456', 'Completed comprehensive machine learning specialization covering supervised learning, unsupervised learning, and neural networks.', ARRAY['Machine Learning', 'Python', 'TensorFlow', 'Data Analysis', 'Neural Networks'], 'Course', null)

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  issuer = EXCLUDED.issuer,
  issue_date = EXCLUDED.issue_date,
  credential_id = EXCLUDED.credential_id,
  description = EXCLUDED.description,
  skills = EXCLUDED.skills,
  certificate_type = EXCLUDED.certificate_type,
  internship_id = EXCLUDED.internship_id;
