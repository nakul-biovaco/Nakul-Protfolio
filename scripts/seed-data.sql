-- Insert sample profile data
INSERT INTO profiles (name, email, title, bio, location, phone, github, linkedin, profile_image) VALUES
('Nakul Mahendra Mundhada', 'nakul.mundhada@example.com', 'Aspiring Embedded Systems & AI Engineer', 
'Passionate engineer bridging the gap between innovation and implementation', 
'Nagpur, Maharashtra, India', '+91 98765 43210', 
'https://github.com/nakulm', 'https://linkedin.com/in/nakul-mundhada', 
'/images/nakul-profile.png')
ON CONFLICT (email) DO UPDATE SET
name = EXCLUDED.name,
title = EXCLUDED.title,
bio = EXCLUDED.bio,
location = EXCLUDED.location,
phone = EXCLUDED.phone,
github = EXCLUDED.github,
linkedin = EXCLUDED.linkedin,
profile_image = EXCLUDED.profile_image,
updated_at = NOW();

-- Insert sample projects data
INSERT INTO projects (title, description, long_description, detailed_description, tech_stack, category, status, duration, team, highlights, challenges, outcomes, images, demo_link, github_link, featured, order_index) VALUES
('Smart Agriculture IoT System', 
'An intelligent IoT-based monitoring system for precision agriculture with automated irrigation control, real-time sensor data collection, and mobile app integration.',
'This comprehensive system combines multiple sensors (soil moisture, temperature, humidity, pH) with Arduino-based controllers to create an automated farming solution. The system includes weather prediction integration, crop recommendation algorithms, and a user-friendly mobile interface for farmers.',
'This project represents a complete end-to-end IoT solution designed specifically for modern agriculture. The system addresses critical challenges faced by farmers today, including water scarcity, unpredictable weather patterns, and the need for precision farming techniques.

The core architecture consists of multiple sensor nodes distributed across the farm, each equipped with soil moisture sensors, temperature and humidity sensors, pH meters, and light sensors. These nodes communicate wirelessly using LoRa technology to ensure long-range, low-power communication even in remote agricultural areas.

The central processing unit, built around an ESP32 microcontroller, aggregates data from all sensor nodes and makes intelligent decisions about irrigation timing and duration. The system integrates with weather APIs to factor in upcoming rainfall predictions, preventing unnecessary watering.

A key innovation is the machine learning component that learns from historical data to optimize watering schedules based on crop type, growth stage, and environmental conditions. The mobile application provides farmers with real-time insights, alerts, and manual override capabilities.',
ARRAY['Arduino', 'ESP32', 'C++', 'React Native', 'Firebase', 'IoT', 'Sensors', 'Machine Learning', 'LoRa', 'Weather APIs'],
'IoT & Agriculture', 'Completed', '6 months', '4 members',
ARRAY['30% reduction in water usage', 'Real-time monitoring dashboard', 'Automated irrigation system', 'Weather prediction integration', 'Machine learning optimization', 'Mobile app with push notifications'],
ARRAY['Ensuring reliable wireless communication in outdoor environments', 'Optimizing power consumption for battery-operated sensor nodes', 'Developing accurate soil moisture calibration algorithms', 'Creating an intuitive user interface for non-technical farmers'],
ARRAY['Successfully deployed in 5 pilot farms', 'Achieved 30% water savings on average', 'Improved crop yield by 15%', 'Reduced manual monitoring time by 80%', 'Received positive feedback from all pilot users'],
ARRAY['/placeholder.svg?height=400&width=600'],
'https://demo.smart-agriculture.com', 'https://github.com/nakul/smart-agriculture', true, 1),

('AI-Powered Crop Disease Detection',
'Machine learning model using computer vision to detect and classify crop diseases from leaf images with 94% accuracy.',
'Developed a deep learning solution using convolutional neural networks to identify various crop diseases. The system can detect over 15 different diseases across multiple crop types and provides treatment recommendations.',
'This AI-powered solution addresses one of the most critical challenges in agriculture: early detection and accurate diagnosis of crop diseases. Traditional methods rely on expert knowledge and visual inspection, which can be time-consuming and prone to human error.

Our solution leverages state-of-the-art computer vision and deep learning techniques to provide instant, accurate disease diagnosis from simple smartphone photos. The system is built on a custom CNN architecture optimized for agricultural image classification.

The training dataset consists of over 50,000 high-quality images of healthy and diseased crop leaves, covering 15 different diseases across major crops including tomatoes, potatoes, corn, and wheat. Data augmentation techniques were employed to improve model robustness.

The system not only identifies diseases but also provides confidence scores, treatment recommendations, and preventive measures. Integration with agricultural databases ensures up-to-date treatment protocols and chemical recommendations.',
ARRAY['Python', 'TensorFlow', 'OpenCV', 'React', 'Flask', 'CNN', 'Image Processing', 'REST APIs'],
'AI & Machine Learning', 'Completed', '4 months', '3 members',
ARRAY['94% accuracy in disease detection', '15+ disease classifications', 'Real-time image processing', 'Treatment recommendations', 'Mobile-friendly web interface', 'Offline capability for remote areas'],
ARRAY['Collecting and labeling high-quality training data', 'Handling variations in lighting and image quality', 'Optimizing model size for mobile deployment', 'Ensuring accuracy across different crop varieties'],
ARRAY['Achieved 94% accuracy on test dataset', 'Successfully deployed as web application', 'Positive validation from agricultural experts', 'Featured in college research symposium', 'Potential for commercial deployment identified'],
ARRAY['/placeholder.svg?height=400&width=600'],
'https://demo.crop-disease-detection.com', 'https://github.com/nakul/crop-disease-detection', true, 2);

-- Insert sample internships data
INSERT INTO internships (company, role, duration, location, type, status, description, detailed_description, responsibilities, technologies, achievements, skills_gained, mentor, certificate, certificate_title, certificate_issuer, certificate_date, order_index) VALUES
('Tech Innovation Labs', 'Embedded Systems Intern', 'June 2023 - August 2023', 'Pune, Maharashtra', 'Full-time', 'Completed',
'Worked on IoT-based monitoring systems for agricultural applications, developing sensor integration modules and contributing to firmware development for microcontroller-based systems.',
'During my internship at Tech Innovation Labs, I was part of a dynamic team working on cutting-edge IoT solutions for the agricultural sector. This experience provided me with hands-on exposure to real-world embedded systems development and project management.

The primary project involved developing a comprehensive IoT monitoring system for precision agriculture. My role encompassed both hardware and software development, from sensor integration to mobile application development. I worked closely with senior engineers to understand industry best practices and contribute meaningfully to the project.

One of the most valuable aspects of this internship was the exposure to the complete product development lifecycle. I participated in requirement analysis, system design, implementation, testing, and deployment phases. This holistic experience helped me understand how theoretical knowledge translates into practical solutions.

The company culture emphasized innovation and continuous learning. I had the opportunity to attend technical workshops, participate in code reviews, and present my work to stakeholders. The mentorship provided by senior team members was instrumental in my professional growth.',
ARRAY['Developed Arduino-based sensor integration modules for soil monitoring', 'Implemented wireless communication protocols (WiFi, LoRa) for data transmission', 'Created mobile app interface for real-time monitoring and control', 'Collaborated with hardware team on PCB design and testing', 'Documented technical specifications and user manuals', 'Participated in client meetings and requirement gathering sessions', 'Conducted field testing and system optimization', 'Mentored junior interns and new team members'],
ARRAY['Arduino', 'ESP32', 'C/C++', 'IoT', 'LoRa', 'React Native', 'Firebase', 'PCB Design', 'Git'],
ARRAY['Reduced sensor response time by 40% through code optimization', 'Successfully deployed 10+ monitoring units in pilot farms', 'Received Outstanding Intern award for exceptional performance', 'Contributed to 2 patent applications for innovative IoT solutions', 'Developed reusable sensor library adopted by the team', 'Improved system reliability by 25% through robust error handling'],
ARRAY['Embedded Systems Programming', 'IoT Protocol Implementation', 'Mobile App Development', 'Hardware-Software Integration', 'Project Documentation', 'Team Collaboration', 'Client Communication', 'Agile Development Methodology'],
'Dr. Rajesh Kumar - Senior IoT Engineer', true, 'Outstanding Intern Certificate', 'Tech Innovation Labs', '2023-08-15', 1);

-- Insert projects worked on for internships
INSERT INTO projects_worked_on (internship_id, name, description, role) 
SELECT i.id, 'Smart Irrigation Controller', 'Automated irrigation system with weather integration', 'Lead Developer'
FROM internships i WHERE i.company = 'Tech Innovation Labs';

INSERT INTO projects_worked_on (internship_id, name, description, role) 
SELECT i.id, 'Sensor Network Optimization', 'Improved communication efficiency in sensor networks', 'Software Developer'
FROM internships i WHERE i.company = 'Tech Innovation Labs';

INSERT INTO projects_worked_on (internship_id, name, description, role) 
SELECT i.id, 'Mobile Dashboard App', 'Real-time monitoring application for farmers', 'Frontend Developer'
FROM internships i WHERE i.company = 'Tech Innovation Labs';

-- Insert sample education data
INSERT INTO education (degree, institution, location, duration, status, gpa, description, coursework, achievements, order_index) VALUES
('Bachelor of Technology - Electronics and Communication Engineering', 
'Ramdeobaba College of Engineering and Management (RCOEM)', 
'Nagpur, Maharashtra, India', '2021 - 2025 (Expected)', 'Current', '8.5/10',
'Specializing in embedded systems, digital signal processing, and communication systems. Active participant in technical clubs and project development.',
ARRAY['Digital Signal Processing', 'Embedded Systems Design', 'Communication Systems', 'VLSI Design', 'Microprocessors & Microcontrollers', 'Control Systems', 'Electronic Circuit Design', 'Computer Networks'],
ARRAY['Dean''s List for Academic Excellence (2022-2023)', 'Best Project Award - Smart Agriculture System', 'Active member of Electronics Club', 'Participated in National Level Technical Competitions'], 1),

('Higher Secondary Certificate (HSC)', 
'Science Stream - Physics, Chemistry, Mathematics', 
'Nagpur, Maharashtra, India', '2019 - 2021', 'Completed', NULL,
'Completed higher secondary education with distinction in Science stream, laying a strong foundation in Physics, Chemistry, and Mathematics.',
ARRAY['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
ARRAY['School Topper in Physics', 'Merit Certificate for Academic Excellence', 'Participated in State Level Science Exhibition', 'Member of School Science Club'], 2);

-- Insert sample skills data
INSERT INTO skills (name, level, experience, category, order_index) VALUES
('C/C++', 90, '3+ years', 'Programming Languages', 1),
('Python', 85, '2+ years', 'Programming Languages', 2),
('JavaScript', 80, '2+ years', 'Programming Languages', 3),
('TypeScript', 75, '1+ year', 'Programming Languages', 4),
('Java', 70, '1+ year', 'Programming Languages', 5),
('Embedded C', 85, '2+ years', 'Programming Languages', 6),

('React', 85, '2+ years', 'Web Development', 1),
('Next.js', 80, '1+ year', 'Web Development', 2),
('HTML/CSS', 90, '3+ years', 'Web Development', 3),
('Tailwind CSS', 85, '1+ year', 'Web Development', 4),
('Node.js', 75, '1+ year', 'Web Development', 5),
('Express.js', 70, '1+ year', 'Web Development', 6),

('Arduino', 90, '3+ years', 'Embedded Systems', 1),
('ESP32/ESP8266', 85, '2+ years', 'Embedded Systems', 2),
('Raspberry Pi', 80, '2+ years', 'Embedded Systems', 3),
('Verilog', 75, '1+ year', 'Embedded Systems', 4),
('FPGA', 70, '1+ year', 'Embedded Systems', 5),
('PCB Design', 65, '1+ year', 'Embedded Systems', 6),

('TensorFlow', 80, '1+ year', 'AI/ML & Data Science', 1),
('OpenCV', 75, '1+ year', 'AI/ML & Data Science', 2),
('Scikit-learn', 75, '1+ year', 'AI/ML & Data Science', 3),
('Pandas', 80, '1+ year', 'AI/ML & Data Science', 4),
('NumPy', 85, '2+ years', 'AI/ML & Data Science', 5),
('Matplotlib', 80, '1+ year', 'AI/ML & Data Science', 6);

-- Insert sample certificates
INSERT INTO certificates (title, issuer, issue_date, credential_id, description, skills, certificate_type, internship_id) 
SELECT 'Outstanding Intern Certificate', 'Tech Innovation Labs', '2023-08-15'::date, 'TIL-2023-001', 
'Awarded for exceptional performance during internship program', 
ARRAY['Embedded Systems', 'IoT Development', 'Arduino Programming', 'Project Management'], 
'Internship', i.id
FROM internships i WHERE i.company = 'Tech Innovation Labs';

INSERT INTO certificates (title, issuer, issue_date, credential_id, description, skills, certificate_type) VALUES
('AWS IoT Core Fundamentals', 'Amazon Web Services', '2023-09-20', 'AWS-IOT-2023-456', 
'Completed comprehensive training on AWS IoT Core services and implementation', 
ARRAY['AWS IoT', 'Cloud Computing', 'Device Management', 'Data Analytics'], 'Professional'),

('Machine Learning with Python', 'IBM', '2023-07-10', 'IBM-ML-2023-789', 
'Successfully completed machine learning course with hands-on projects', 
ARRAY['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'], 'Course'),

('React Developer Certification', 'Meta', '2023-05-15', 'META-REACT-2023-012', 
'Certified in React development with advanced concepts and best practices', 
ARRAY['React', 'JavaScript', 'Frontend Development', 'Component Architecture'], 'Professional');
