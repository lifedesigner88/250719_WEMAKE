-- First Seed Data for WEMAKE Database
-- Maintaining specified profile IDs and creating dummy data for all tables

-- 해당 ID 값을 기반으로 업데이트 하기.
UPDATE profiles
SET
    name = CASE profile_id
               WHEN '77964340-e57d-49da-8a09-d0439679555a' THEN 'John Developer'
               WHEN 'ada26f4d-64f6-434a-a811-4cc612c383da' THEN 'Sarah Designer'
               WHEN '152dada0-4e89-44dd-a0c5-631cccba1b12' THEN 'Mike Founder'
               WHEN '99fa0874-3b12-4380-afd2-5a3be9e393ef' THEN 'Alice Marketer'
               WHEN 'b0e04298-ab61-454f-9e4d-1e592a6aad35' THEN 'Bob PM'
        END,
    username = CASE profile_id
                   WHEN '77964340-e57d-49da-8a09-d0439679555a' THEN 'johndev'
                   WHEN 'ada26f4d-64f6-434a-a811-4cc612c383da' THEN 'sarahdesign'
                   WHEN '152dada0-4e89-44dd-a0c5-631cccba1b12' THEN 'mikefounder'
                   WHEN '99fa0874-3b12-4380-afd2-5a3be9e393ef' THEN 'alicemarket'
                   WHEN 'b0e04298-ab61-454f-9e4d-1e592a6aad35' THEN 'bobpm'
        END,
    headline = CASE profile_id
                   WHEN '77964340-e57d-49da-8a09-d0439679555a' THEN 'Full Stack Developer'
                   WHEN 'ada26f4d-64f6-434a-a811-4cc612c383da' THEN 'UI/UX Designer'
                   WHEN '152dada0-4e89-44dd-a0c5-631cccba1b12' THEN 'Tech Entrepreneur'
                   WHEN '99fa0874-3b12-4380-afd2-5a3be9e393ef' THEN 'Growth Marketer'
                   WHEN 'b0e04298-ab61-454f-9e4d-1e592a6aad35' THEN 'Senior Product Manager'
        END,
    bio = CASE profile_id
              WHEN '77964340-e57d-49da-8a09-d0439679555a' THEN 'Passionate about building amazing products'
              WHEN 'ada26f4d-64f6-434a-a811-4cc612c383da' THEN 'Creating beautiful and intuitive user experiences'
              WHEN '152dada0-4e89-44dd-a0c5-631cccba1b12' THEN 'Building the next big thing in tech'
              WHEN '99fa0874-3b12-4380-afd2-5a3be9e393ef' THEN 'Scaling products through data-driven marketing'
              WHEN 'b0e04298-ab61-454f-9e4d-1e592a6aad35' THEN 'Leading product strategy and execution'
        END,
    role = CASE profile_id
               WHEN '77964340-e57d-49da-8a09-d0439679555a' THEN 'developer'::role
               WHEN 'ada26f4d-64f6-434a-a811-4cc612c383da' THEN 'designer'::role
               WHEN '152dada0-4e89-44dd-a0c5-631cccba1b12' THEN 'founder'::role
               WHEN '99fa0874-3b12-4380-afd2-5a3be9e393ef' THEN 'marketer'::role
               WHEN 'b0e04298-ab61-454f-9e4d-1e592a6aad35' THEN 'product-manager'::role
        END,
    stats = CASE profile_id
                WHEN '77964340-e57d-49da-8a09-d0439679555a' THEN '{"followers": 150, "following": 75}'::jsonb
                WHEN 'ada26f4d-64f6-434a-a811-4cc612c383da' THEN '{"followers": 200, "following": 120}'::jsonb
                WHEN '152dada0-4e89-44dd-a0c5-631cccba1b12' THEN '{"followers": 500, "following": 200}'::jsonb
                WHEN '99fa0874-3b12-4380-afd2-5a3be9e393ef' THEN '{"followers": 180, "following": 90}'::jsonb
                WHEN 'b0e04298-ab61-454f-9e4d-1e592a6aad35' THEN '{"followers": 220, "following": 110}'::jsonb
        END,
    views = CASE profile_id
                WHEN '77964340-e57d-49da-8a09-d0439679555a' THEN '{"total": 1200, "monthly": 300}'::jsonb
                WHEN 'ada26f4d-64f6-434a-a811-4cc612c383da' THEN '{"total": 1800, "monthly": 450}'::jsonb
                WHEN '152dada0-4e89-44dd-a0c5-631cccba1b12' THEN '{"total": 3500, "monthly": 800}'::jsonb
                WHEN '99fa0874-3b12-4380-afd2-5a3be9e393ef' THEN '{"total": 1500, "monthly": 350}'::jsonb
                WHEN 'b0e04298-ab61-454f-9e4d-1e592a6aad35' THEN '{"total": 2000, "monthly": 500}'::jsonb
        END,
    updated_at = NOW()
WHERE profile_id IN (
                     '77964340-e57d-49da-8a09-d0439679555a',
                     'ada26f4d-64f6-434a-a811-4cc612c383da',
                     '152dada0-4e89-44dd-a0c5-631cccba1b12',
                     '99fa0874-3b12-4380-afd2-5a3be9e393ef',
                     'b0e04298-ab61-454f-9e4d-1e592a6aad35'
    );

-- Insert categories
INSERT INTO categories (name, description, created_at, updated_at)
VALUES ('Web Development', 'Tools and platforms for web development', NOW(), NOW()),
       ('Mobile Apps', 'Mobile application development tools', NOW(), NOW()),
       ('Design Tools', 'UI/UX and graphic design applications', NOW(), NOW()),
       ('Productivity', 'Tools to boost productivity and efficiency', NOW(), NOW()),
       ('AI & Machine Learning', 'Artificial intelligence and ML platforms', NOW(), NOW()),
       ('E-commerce', 'Online shopping and marketplace solutions', NOW(), NOW()),
       ('Social Media', 'Social networking and community platforms', NOW(), NOW()),
       ('Developer Tools', 'Development utilities and frameworks', NOW(), NOW());

-- Insert jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name,
                  company_logo_url, company_location, apply_url, job_types, job_location, salary_range, create_at,
                  update_at)
VALUES ('Senior Frontend Developer', 'Join our team to build amazing user interfaces',
        'Develop React applications, collaborate with designers, optimize performance',
        'Bachelor degree, 5+ years React experience', 'Health insurance, flexible hours, remote work',
        'React, TypeScript, CSS, JavaScript', 'TechCorp Inc', 'https://example.com/logo1.png', 'San Francisco, CA',
        'https://example.com/apply1', 'full-time', 'hybrid', '$100,000 - $120,000', NOW(), NOW()),
       ('UI/UX Designer', 'Create beautiful and intuitive user experiences',
        'Design mockups, conduct user research, prototype interfaces', '3+ years design experience, Figma proficiency',
        'Health insurance, design budget, conferences', 'Figma, Sketch, Adobe Creative Suite', 'DesignStudio',
        'https://example.com/logo2.png', 'New York, NY', 'https://example.com/apply2', 'full-time', 'in-person',
        '$70,000 - $100,000', NOW(), NOW()),
       ('Backend Engineer', 'Build scalable server-side applications',
        'Develop APIs, manage databases, ensure system reliability', 'Computer Science degree, Node.js experience',
        'Stock options, unlimited PTO, learning budget', 'Node.js, PostgreSQL, AWS, Docker', 'CloudTech',
        'https://example.com/logo3.png', 'Austin, TX', 'https://example.com/apply3', 'full-time', 'remote',
        '$120,000 - $150,000', NOW(), NOW()),
       ('Product Manager', 'Lead product strategy and development',
        'Define roadmaps, work with engineering, analyze metrics', 'MBA preferred, 4+ years PM experience',
        'Equity, health benefits, flexible schedule', 'Product Strategy, Analytics, Agile', 'StartupXYZ',
        'https://example.com/logo4.png', 'Seattle, WA', 'https://example.com/apply4', 'full-time', 'hybrid',
        '$150,000 - $250,000', NOW(), NOW()),
       ('DevOps Engineer', 'Manage infrastructure and deployment pipelines',
        'Setup CI/CD, monitor systems, optimize performance', 'Linux expertise, cloud platform experience',
        'Remote work, tech stipend, training budget', 'AWS, Kubernetes, Terraform, Python', 'InfraCorp',
        'https://example.com/logo5.png', 'Remote', 'https://example.com/apply5', 'full-time', 'remote',
        '$100,000 - $120,000', NOW(), NOW()),
       ('Marketing Specialist', 'Drive growth through digital marketing',
        'Create campaigns, analyze performance, manage social media', 'Marketing degree, 2+ years experience',
        'Health insurance, marketing tools, bonuses', 'Google Ads, SEO, Social Media, Analytics', 'GrowthCo',
        'https://example.com/logo6.png', 'Los Angeles, CA', 'https://example.com/apply6', 'part-time', 'remote',
        '$50,000 - $70,000', NOW(), NOW()),
       ('Data Scientist', 'Extract insights from complex datasets',
        'Build ML models, analyze data, create visualizations', 'PhD in related field, Python/R proficiency',
        'Research time, conference attendance, high salary', 'Python, R, SQL, Machine Learning', 'DataTech',
        'https://example.com/logo7.png', 'Boston, MA', 'https://example.com/apply7', 'full-time', 'hybrid',
        '$120,000 - $150,000', NOW(), NOW()),
       ('Freelance Writer', 'Create engaging content for tech companies',
        'Write blog posts, documentation, marketing copy', 'Strong writing portfolio, tech background',
        'Flexible schedule, per-project pay', 'Technical Writing, SEO, Content Strategy', 'ContentAgency',
        'https://example.com/logo8.png', 'Remote', 'https://example.com/apply8', 'freelance', 'remote', '$0 - $50,000',
        NOW(), NOW());

-- Insert products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at,
                      updated_at)
VALUES ('CodeFlow', 'Streamline your development workflow',
        'A powerful IDE extension that helps developers write better code faster',
        'Install the extension, connect your repositories, and get AI-powered suggestions',
        'https://example.com/icon1.png', 'https://codeflow.dev', '{
    "views": 1250,
    "reviews": 23
  }', '77964340-e57d-49da-8a09-d0439679555a', 1, NOW(), NOW()),
       ('DesignSync', 'Collaborate on designs in real-time',
        'Real-time design collaboration tool for distributed teams',
        'Create a workspace, invite team members, and start designing together', 'https://example.com/icon2.png',
        'https://designsync.io', '{
         "views": 890,
         "reviews": 15
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 3, NOW(), NOW()),
       ('TaskMaster Pro', 'Ultimate productivity companion',
        'AI-powered task management with smart scheduling and priority optimization',
        'Add your tasks, let AI organize them, and follow the optimized schedule', 'https://example.com/icon3.png',
        'https://taskmasterpro.com', '{
         "views": 2100,
         "reviews": 45
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 4, NOW(), NOW()),
       ('MobileKit', 'Rapid mobile app development', 'No-code platform for building native mobile applications',
        'Choose templates, customize with drag-and-drop, and deploy to app stores', 'https://example.com/icon4.png',
        'https://mobilekit.app', '{
         "views": 1680,
         "reviews": 32
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 2, NOW(), NOW()),
       ('AIAnalyzer', 'Smart data insights platform',
        'Machine learning platform that automatically analyzes your business data',
        'Upload your data, select analysis type, and get actionable insights', 'https://example.com/icon5.png',
        'https://aianalyzer.tech', '{
         "views": 950,
         "reviews": 18
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 5, NOW(), NOW()),
       ('ShopBuilder', 'E-commerce made simple', 'Build beautiful online stores without coding',
        'Choose a template, add products, configure payments, and launch', 'https://example.com/icon6.png',
        'https://shopbuilder.store', '{
         "views": 1420,
         "reviews": 28
       }', '77964340-e57d-49da-8a09-d0439679555a', 6, NOW(), NOW()),
       ('SocialHub', 'Manage all social media in one place',
        'Unified dashboard for managing multiple social media accounts',
        'Connect accounts, schedule posts, and track engagement metrics', 'https://example.com/icon7.png',
        'https://socialhub.manage', '{
         "views": 1150,
         "reviews": 22
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 7, NOW(), NOW()),
       ('DevToolbox', 'Essential developer utilities', 'Collection of handy tools every developer needs',
        'Access tools through web interface or install CLI for terminal use', 'https://example.com/icon8.png',
        'https://devtoolbox.dev', '{
         "views": 780,
         "reviews": 12
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 8, NOW(), NOW());

-- Insert follows relationships
INSERT INTO follows (follower_id, following_id, created_at)
VALUES ('77964340-e57d-49da-8a09-d0439679555a', 'ada26f4d-64f6-434a-a811-4cc612c383da', NOW()),
       ('77964340-e57d-49da-8a09-d0439679555a', '152dada0-4e89-44dd-a0c5-631cccba1b12', NOW()),
       ('ada26f4d-64f6-434a-a811-4cc612c383da', '77964340-e57d-49da-8a09-d0439679555a', NOW()),
       ('ada26f4d-64f6-434a-a811-4cc612c383da', '152dada0-4e89-44dd-a0c5-631cccba1b12', NOW()),
       ('ada26f4d-64f6-434a-a811-4cc612c383da', '99fa0874-3b12-4380-afd2-5a3be9e393ef', NOW()),
       ('152dada0-4e89-44dd-a0c5-631cccba1b12', '77964340-e57d-49da-8a09-d0439679555a', NOW()),
       ('152dada0-4e89-44dd-a0c5-631cccba1b12', 'ada26f4d-64f6-434a-a811-4cc612c383da', NOW()),
       ('152dada0-4e89-44dd-a0c5-631cccba1b12', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', NOW()),
       ('99fa0874-3b12-4380-afd2-5a3be9e393ef', 'ada26f4d-64f6-434a-a811-4cc612c383da', NOW()),
       ('99fa0874-3b12-4380-afd2-5a3be9e393ef', '152dada0-4e89-44dd-a0c5-631cccba1b12', NOW()),
       ('b0e04298-ab61-454f-9e4d-1e592a6aad35', '77964340-e57d-49da-8a09-d0439679555a', NOW()),
       ('b0e04298-ab61-454f-9e4d-1e592a6aad35', '152dada0-4e89-44dd-a0c5-631cccba1b12', NOW());

-- Insert reviews
INSERT INTO reviews (product_id, profile_id, rating, review, created_at, updated_at)
VALUES (1, 'ada26f4d-64f6-434a-a811-4cc612c383da', 5, 'Amazing tool! Really improved my development workflow.', NOW(),
        NOW()),
       (1, '152dada0-4e89-44dd-a0c5-631cccba1b12', 4, 'Great features, could use better documentation.', NOW(), NOW()),
       (2, '77964340-e57d-49da-8a09-d0439679555a', 5, 'Perfect for team collaboration. Highly recommended!', NOW(),
        NOW()),
       (2, '99fa0874-3b12-4380-afd2-5a3be9e393ef', 4, 'Good tool, but sometimes has sync issues.', NOW(), NOW()),
       (3, 'ada26f4d-64f6-434a-a811-4cc612c383da', 5, 'Best productivity app I have ever used!', NOW(), NOW()),
       (3, 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 5, 'AI scheduling is a game changer.', NOW(), NOW()),
       (4, '152dada0-4e89-44dd-a0c5-631cccba1b12', 4, 'Easy to use, great for rapid prototyping.', NOW(), NOW()),
       (5, '77964340-e57d-49da-8a09-d0439679555a', 3, 'Good insights but interface could be better.', NOW(), NOW()),
       (6, 'ada26f4d-64f6-434a-a811-4cc612c383da', 4, 'Simple setup, good templates available.', NOW(), NOW()),
       (7, '99fa0874-3b12-4380-afd2-5a3be9e393ef', 5, 'Saves me hours of social media management!', NOW(), NOW());

-- Insert product upvotes
INSERT INTO product_upvotes (product_id, profile_id)
VALUES (1, 'ada26f4d-64f6-434a-a811-4cc612c383da'),
       (1, '152dada0-4e89-44dd-a0c5-631cccba1b12'),
       (1, '99fa0874-3b12-4380-afd2-5a3be9e393ef'),
       (2, '77964340-e57d-49da-8a09-d0439679555a'),
       (2, '152dada0-4e89-44dd-a0c5-631cccba1b12'),
       (3, 'ada26f4d-64f6-434a-a811-4cc612c383da'),
       (3, 'b0e04298-ab61-454f-9e4d-1e592a6aad35'),
       (3, '77964340-e57d-49da-8a09-d0439679555a'),
       (4, '152dada0-4e89-44dd-a0c5-631cccba1b12'),
       (4, 'ada26f4d-64f6-434a-a811-4cc612c383da'),
       (5, '77964340-e57d-49da-8a09-d0439679555a'),
       (6, 'ada26f4d-64f6-434a-a811-4cc612c383da'),
       (7, '99fa0874-3b12-4380-afd2-5a3be9e393ef'),
       (8, '152dada0-4e89-44dd-a0c5-631cccba1b12');

-- Insert topics
INSERT INTO topics (name, slug, created_at)
VALUES ('General Discussion', 'general-discussion', NOW()),
       ('Product Feedback', 'product-feedback', NOW()),
       ('Tech News', 'tech-news', NOW()),
       ('Career Advice', 'career-advice', NOW()),
       ('Startup Stories', 'startup-stories', NOW()),
       ('Design Inspiration', 'design-inspiration', NOW()),
       ('Development Tips', 'development-tips', NOW());

-- Insert posts
INSERT INTO posts (title, content, topic_id, profile_id, created_at, updated_at)
VALUES ('Welcome to the community!',
        'Hey everyone! Excited to be part of this amazing community. Looking forward to sharing ideas and learning from all of you.',
        1, '77964340-e57d-49da-8a09-d0439679555a', NOW(), NOW()),
       ('Thoughts on the new React 19 features',
        'Just tried out the new React 19 features and I am blown away by the improvements. The new compiler is a game changer!',
        3, 'ada26f4d-64f6-434a-a811-4cc612c383da', NOW(), NOW()),
       ('How I built my first SaaS product',
        'Sharing my journey of building TaskMaster Pro from idea to launch. It took 8 months but was totally worth it!',
        5, '152dada0-4e89-44dd-a0c5-631cccba1b12', NOW(), NOW()),
       ('Best practices for user onboarding',
        'After analyzing 100+ apps, here are the key patterns I noticed for effective user onboarding flows.', 2,
        '99fa0874-3b12-4380-afd2-5a3be9e393ef', NOW(), NOW()),
       ('Remote work productivity tips',
        'Working remotely for 3 years taught me these essential productivity hacks. Hope they help you too!', 4,
        'b0e04298-ab61-454f-9e4d-1e592a6aad35', NOW(), NOW()),
       ('Design system evolution at scale',
        'How we evolved our design system to support 50+ products and 200+ designers across multiple teams.', 6,
        'ada26f4d-64f6-434a-a811-4cc612c383da', NOW(), NOW()),
       ('TypeScript tips for better code',
        'Advanced TypeScript patterns that will make your code more maintainable and type-safe.', 7,
        '77964340-e57d-49da-8a09-d0439679555a', NOW(), NOW()),
       ('Startup funding landscape 2024',
        'Analysis of current funding trends and what founders should know about raising capital this year.', 5,
        '152dada0-4e89-44dd-a0c5-631cccba1b12', NOW(), NOW());

-- Insert post upvotes
INSERT INTO post_upvotes (post_id, profile_id)
VALUES (1, 'ada26f4d-64f6-434a-a811-4cc612c383da'),
       (1, '152dada0-4e89-44dd-a0c5-631cccba1b12'),
       (2, '77964340-e57d-49da-8a09-d0439679555a'),
       (2, '99fa0874-3b12-4380-afd2-5a3be9e393ef'),
       (3, 'ada26f4d-64f6-434a-a811-4cc612c383da'),
       (3, 'b0e04298-ab61-454f-9e4d-1e592a6aad35'),
       (4, '152dada0-4e89-44dd-a0c5-631cccba1b12'),
       (5, '77964340-e57d-49da-8a09-d0439679555a'),
       (6, '99fa0874-3b12-4380-afd2-5a3be9e393ef'),
       (7, 'ada26f4d-64f6-434a-a811-4cc612c383da'),
       (8, '152dada0-4e89-44dd-a0c5-631cccba1b12');

-- Insert post replies
INSERT INTO post_replies (post_id, profile_id, reply, created_at, updated_at)
VALUES (1, 'ada26f4d-64f6-434a-a811-4cc612c383da',
        'Welcome! Great to have you here. Looking forward to your contributions!', NOW(), NOW()),
       (1, '152dada0-4e89-44dd-a0c5-631cccba1b12',
        'Welcome to the community! Feel free to reach out if you have any questions.', NOW(), NOW()),
       (2, '77964340-e57d-49da-8a09-d0439679555a', 'Totally agree! The new compiler optimizations are incredible.',
        NOW(), NOW()),
       (3, '99fa0874-3b12-4380-afd2-5a3be9e393ef',
        'Inspiring story! Would love to hear more about your marketing strategy.', NOW(), NOW()),
       (4, 'b0e04298-ab61-454f-9e4d-1e592a6aad35',
        'Great insights! The progressive disclosure pattern is especially effective.', NOW(), NOW()),
       (5, 'ada26f4d-64f6-434a-a811-4cc612c383da', 'These tips are gold! The Pomodoro technique changed my life.',
        NOW(), NOW()),
       (6, '77964340-e57d-49da-8a09-d0439679555a', 'Amazing work! How do you handle design token versioning?', NOW(),
        NOW()),
       (7, '99fa0874-3b12-4380-afd2-5a3be9e393ef',
        'Love these patterns! The utility types section is particularly helpful.', NOW(), NOW());

-- Insert GPT ideas
INSERT INTO gpt_ideas (idea, views, claimed_by, claimed_at, created_at)
VALUES ('AI-powered code review assistant that learns from your team preferences', 45,
        '77964340-e57d-49da-8a09-d0439679555a', NOW(), NOW()),
       ('Smart calendar that automatically blocks focus time based on your productivity patterns', 32, NULL, NULL,
        NOW()),
       ('Collaborative whiteboard with real-time voice transcription and action item extraction', 28,
        'ada26f4d-64f6-434a-a811-4cc612c383da', NOW(), NOW()),
       ('Personal finance app that gamifies saving and investing with social challenges', 67, NULL, NULL, NOW()),
       ('Developer tool that automatically generates API documentation from code comments', 23,
        '152dada0-4e89-44dd-a0c5-631cccba1b12', NOW(), NOW()),
       ('Fitness app that creates custom workouts based on available equipment and time', 41, NULL, NULL, NOW()),
       ('Language learning platform that uses AI to create personalized conversation scenarios', 55,
        '99fa0874-3b12-4380-afd2-5a3be9e393ef', NOW(), NOW()),
       ('Project management tool that predicts task completion times using historical data', 38, NULL, NULL, NOW()),
       ('Social media scheduler with AI-generated content suggestions based on trending topics', 29,
        'b0e04298-ab61-454f-9e4d-1e592a6aad35', NOW(), NOW()),
       ('Recipe app that suggests meals based on ingredients you have and dietary preferences', 52, NULL, NULL, NOW());

-- Insert GPT ideas likes
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id)
VALUES (1, 'ada26f4d-64f6-434a-a811-4cc612c383da'),
       (1, '152dada0-4e89-44dd-a0c5-631cccba1b12'),
       (2, '77964340-e57d-49da-8a09-d0439679555a'),
       (2, '99fa0874-3b12-4380-afd2-5a3be9e393ef'),
       (3, '152dada0-4e89-44dd-a0c5-631cccba1b12'),
       (4, 'ada26f4d-64f6-434a-a811-4cc612c383da'),
       (4, 'b0e04298-ab61-454f-9e4d-1e592a6aad35'),
       (5, '77964340-e57d-49da-8a09-d0439679555a'),
       (6, '99fa0874-3b12-4380-afd2-5a3be9e393ef'),
       (7, 'ada26f4d-64f6-434a-a811-4cc612c383da'),
       (8, '152dada0-4e89-44dd-a0c5-631cccba1b12'),
       (9, 'b0e04298-ab61-454f-9e4d-1e592a6aad35'),
       (10, '77964340-e57d-49da-8a09-d0439679555a');

-- Insert team data
INSERT INTO team (product_name, team_size, equity_split, product_stage, roles, product_description, created_at,
                  updated_at)
VALUES ('NextGen Analytics', 4, 25, 'mvp', 'Frontend Developer, Backend Developer, Data Scientist, Product Manager',
        'AI-powered analytics platform for e-commerce businesses to optimize their conversion rates and customer retention.',
        NOW(), NOW()),
       ('EcoTracker', 3, 33, 'prototype', 'Mobile Developer, UX Designer, Environmental Scientist',
        'Mobile app that helps users track their carbon footprint and suggests eco-friendly alternatives for daily activities.',
        NOW(), NOW()),
       ('CodeMentor AI', 5, 20, 'product', 'Full-stack Developer, ML Engineer, DevOps, Designer, Marketing',
        'AI-powered coding mentor that provides personalized learning paths and real-time code feedback for developers.',
        NOW(), NOW()),
       ('HealthSync', 2, 50, 'idea', 'Healthcare Professional, Software Developer',
        'Platform connecting patients with healthcare providers for remote monitoring and personalized treatment plans.',
        NOW(), NOW()),
       ('SmartHome Hub', 6, 16, 'mvp',
        'IoT Engineer, Mobile Developer, Backend Developer, UI Designer, QA Engineer, Product Owner',
        'Unified platform for managing all smart home devices with advanced automation and energy optimization features.',
        NOW(), NOW()),
       ('FoodieConnect', 3, 33, 'prototype', 'Chef, App Developer, Marketing Specialist',
        'Social platform for food enthusiasts to share recipes, cooking tips, and organize local cooking events.',
        NOW(), NOW()),
       ('LearnTogether', 4, 25, 'idea', 'Education Specialist, Frontend Developer, Backend Developer, UX Researcher',
        'Collaborative learning platform that matches students with similar learning goals and creates study groups.',
        NOW(), NOW());

-- Insert message rooms
INSERT INTO message_rooms (created_at)
VALUES (NOW()),
       (NOW()),
       (NOW()),
       (NOW()),
       (NOW());

-- Insert message room members
INSERT INTO message_room_members (message_room_id, profile_id, created_at)
VALUES (1, '77964340-e57d-49da-8a09-d0439679555a', NOW()),
       (1, 'ada26f4d-64f6-434a-a811-4cc612c383da', NOW()),
       (2, '152dada0-4e89-44dd-a0c5-631cccba1b12', NOW()),
       (2, '99fa0874-3b12-4380-afd2-5a3be9e393ef', NOW()),
       (3, 'ada26f4d-64f6-434a-a811-4cc612c383da', NOW()),
       (3, 'b0e04298-ab61-454f-9e4d-1e592a6aad35', NOW()),
       (4, '77964340-e57d-49da-8a09-d0439679555a', NOW()),
       (4, '152dada0-4e89-44dd-a0c5-631cccba1b12', NOW()),
       (4, '99fa0874-3b12-4380-afd2-5a3be9e393ef', NOW()),
       (5, 'ada26f4d-64f6-434a-a811-4cc612c383da', NOW()),
       (5, '152dada0-4e89-44dd-a0c5-631cccba1b12', NOW()),
       (5, 'b0e04298-ab61-454f-9e4d-1e592a6aad35', NOW());

-- Insert messages
INSERT INTO messages (message_room_id, sender_id, content, created_at)
VALUES (1, '77964340-e57d-49da-8a09-d0439679555a',
        'Hey Sarah! Loved your latest design work on DesignSync. The user flow is incredibly intuitive.', NOW()),
       (1, 'ada26f4d-64f6-434a-a811-4cc612c383da',
        'Thanks John! Your feedback means a lot. How is CodeFlow coming along?', NOW()),
       (1, '77964340-e57d-49da-8a09-d0439679555a',
        'Great! Just pushed a major update with AI-powered code suggestions. Would love your thoughts on the UI.',
        NOW()),
       (2, '152dada0-4e89-44dd-a0c5-631cccba1b12',
        'Alice, I saw your marketing campaign for MobileKit. The conversion rates are impressive!', NOW()),
       (2, '99fa0874-3b12-4380-afd2-5a3be9e393ef',
        'Thank you Mike! The key was focusing on the no-code messaging. Developers love the simplicity.', NOW()),
       (3, 'ada26f4d-64f6-434a-a811-4cc612c383da',
        'Bob, your product management insights in the latest post were spot on. Especially the part about user research.',
        NOW()),
       (3, 'b0e04298-ab61-454f-9e4d-1e592a6aad35',
        'Thanks Sarah! User research is often overlooked but its so crucial for product success.', NOW()),
       (4, '77964340-e57d-49da-8a09-d0439679555a',
        'Team meeting tomorrow at 2 PM to discuss the new feature roadmap. Alice, can you prepare the user analytics?',
        NOW()),
       (4, '99fa0874-3b12-4380-afd2-5a3be9e393ef',
        'Absolutely! Ill have the engagement metrics and user feedback summary ready.', NOW()),
       (4, '152dada0-4e89-44dd-a0c5-631cccba1b12',
        'Perfect. Ill bring the technical feasibility analysis for each proposed feature.', NOW()),
       (5, 'ada26f4d-64f6-434a-a811-4cc612c383da',
        'Anyone interested in collaborating on a design system project? I have some ideas for component libraries.',
        NOW()),
       (5, '152dada0-4e89-44dd-a0c5-631cccba1b12',
        'Count me in! I can handle the technical implementation and documentation.', NOW()),
       (5, 'b0e04298-ab61-454f-9e4d-1e592a6aad35',
        'This sounds great! I can contribute to the product strategy and user experience guidelines.', NOW());

-- Insert notifications
INSERT INTO notifications (source_id, product_id, post_id, target_id, type, created_at)
VALUES ('ada26f4d-64f6-434a-a811-4cc612c383da', NULL, NULL, '77964340-e57d-49da-8a09-d0439679555a', 'follow', NOW()),
       ('152dada0-4e89-44dd-a0c5-631cccba1b12', NULL, NULL, '77964340-e57d-49da-8a09-d0439679555a', 'follow', NOW()),
       ('99fa0874-3b12-4380-afd2-5a3be9e393ef', NULL, NULL, 'ada26f4d-64f6-434a-a811-4cc612c383da', 'follow', NOW()),
       ('77964340-e57d-49da-8a09-d0439679555a', 1, NULL, 'ada26f4d-64f6-434a-a811-4cc612c383da', 'review', NOW()),
       ('152dada0-4e89-44dd-a0c5-631cccba1b12', 1, NULL, 'ada26f4d-64f6-434a-a811-4cc612c383da', 'review', NOW()),
       ('ada26f4d-64f6-434a-a811-4cc612c383da', 2, NULL, '77964340-e57d-49da-8a09-d0439679555a', 'review', NOW()),
       ('b0e04298-ab61-454f-9e4d-1e592a6aad35', 3, NULL, '152dada0-4e89-44dd-a0c5-631cccba1b12', 'review', NOW()),
       ('ada26f4d-64f6-434a-a811-4cc612c383da', NULL, 1, '77964340-e57d-49da-8a09-d0439679555a', 'reply', NOW()),
       ('152dada0-4e89-44dd-a0c5-631cccba1b12', NULL, 1, '77964340-e57d-49da-8a09-d0439679555a', 'reply', NOW()),
       ('77964340-e57d-49da-8a09-d0439679555a', NULL, 2, 'ada26f4d-64f6-434a-a811-4cc612c383da', 'reply', NOW()),
       ('99fa0874-3b12-4380-afd2-5a3be9e393ef', NULL, 3, '152dada0-4e89-44dd-a0c5-631cccba1b12', 'reply', NOW()),
       ('b0e04298-ab61-454f-9e4d-1e592a6aad35', NULL, 4, '99fa0874-3b12-4380-afd2-5a3be9e393ef', 'reply', NOW());

-- End of seed data
-- Total records created:
-- Profiles: 5
-- Categories: 8  
-- Jobs: 8
-- Products: 8
-- Follows: 12
-- Reviews: 10
-- Product upvotes: 14
-- Topics: 7
-- Posts: 8
-- Post upvotes: 11
-- Post replies: 8
-- GPT ideas: 10
-- GPT ideas likes: 13
-- Team: 7
-- Message rooms: 5
-- Message room members: 12
-- Messages: 13
-- Notifications: 12