-- 77964340-e57d-49da-8a09-d0439679555a
-- ada26f4d-64f6-434a-a811-4cc612c383da
-- 152dada0-4e89-44dd-a0c5-631cccba1b12
-- 99fa0874-3b12-4380-afd2-5a3be9e393ef
-- b0e04298-ab61-454f-9e4d-1e592a6aad35
--
--
-- 위에 5개의 Profile_id 로
--
-- ```typescript
-- export const products = pgTable("products", {
--     product_id: bigint({ mode: "number" })
--         .primaryKey()
--         .generatedAlwaysAsIdentity(),
--     name: text().notNull(),
--     tagline: text().notNull(),
--     description: text().notNull(),
--     how_it_works: text().notNull(),
--     icon: text().notNull(),
--     url: text().notNull(),
--     stats: jsonb().notNull().default({ views: 0, reviews: 0, upvotes: 0 }),
--     profile_id: uuid()
--         .references(() => profiles.profile_id, { onDelete: "cascade" })
--         .notNull(),
--     category_id: bigint({ mode: "number" }).references(
--         () => categories.category_id,
--         { onDelete: "set null" }
--     ),
--     created_at: timestamp().notNull().defaultNow(),
--     updated_at: timestamp().notNull().defaultNow(),
-- });
-- ```
--
-- category_id 는 1~30 사이로 지정하고
--
-- products 업로드 하는 SQL INSERT 5개만 만들어줘.
-- 생성시기는 오늘 날짜로 부탁해, 그리고 views, reviews, upvotes, 값도 임의로 넣어줘.


INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at,
                      updated_at)
VALUES ('CloudSync',
        '파일 동기화의 혁신',
        '모든 디바이스에서 파일을 실시간으로 동기화하고 백업하는 클라우드 스토리지 서비스입니다.',
        '앱을 설치하면 지정한 폴더의 파일들이 자동으로 클라우드와 동기화됩니다.',
        'cloudsync-icon.png',
        'https://cloudsync.example.com',
        '{
          "views": 3847,
          "reviews": 67,
          "upvotes": 324
        }'::jsonb,
        '5f06c46b-421e-4c42-8064-6da0c1dd117f',
        18,
        '2025-08-15'::timestamp,
        '2025-08-15'::timestamp);

INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at,
                      updated_at)
VALUES ('SmartEmail',
        'AI 이메일 어시스턴트',
        '중요한 이메일을 자동으로 분류하고 답변 템플릿을 제안하는 스마트 이메일 관리 도구입니다.',
        '이메일 계정을 연결하면 AI가 중요도를 분석하고 자동 답변을 제안합니다.',
        'smartemail-icon.svg',
        'https://smartemail.example.com',
        '{
          "views": 2196,
          "reviews": 41,
          "upvotes": 178
        }'::jsonb,
        '5f06c46b-421e-4c42-8064-6da0c1dd117f',
        9,
        '2025-08-15'::timestamp,
        '2025-08-15'::timestamp);

INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at,
                      updated_at)
VALUES ('BudgetTracker',
        '스마트한 가계부',
        '카드 사용 내역을 자동으로 분석하고 지출 패턴을 시각화하는 개인 재정 관리 앱입니다.',
        '은행 계좌와 카드를 연결하면 자동으로 거래 내역을 불러와 카테고리별로 분석합니다.',
        'budgettracker-icon.png',
        'https://budgettracker.example.com',
        '{
          "views": 1534,
          "reviews": 23,
          "upvotes": 95
        }'::jsonb,
        '5f06c46b-421e-4c42-8064-6da0c1dd117f',
        26,
        '2025-08-15'::timestamp,
        '2025-08-15'::timestamp);

INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at,
                      updated_at)
VALUES ('FitnessCoach',
        'AI 개인 트레이너',
        '개인 맞춤형 운동 계획을 제공하고 운동 자세를 분석해주는 AI 피트니스 코칭 앱입니다.',
        '목표를 설정하면 AI가 맞춤 운동 프로그램을 생성하고 카메라로 자세를 교정해줍니다.',
        'fitnesscoach-icon.svg',
        'https://fitnesscoach.example.com',
        '{
          "views": 4231,
          "reviews": 89,
          "upvotes": 456
        }'::jsonb,
        '5f06c46b-421e-4c42-8064-6da0c1dd117f',
        3,
        '2025-08-15'::timestamp,
        '2025-08-15'::timestamp);

INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at,
                      updated_at)
VALUES ('LangLearn',
        '몰입형 언어 학습',
        'AI 대화 파트너와 실제 상황을 시뮬레이션하며 자연스럽게 외국어를 익히는 학습 플랫폼입니다.',
        '학습할 언어를 선택하면 AI 튜터가 레벨에 맞는 대화를 제공하고 발음을 교정해줍니다.',
        'langlearn-icon.png',
        'https://langlearn.example.com',
        '{
          "views": 2873,
          "reviews": 56,
          "upvotes": 267
        }'::jsonb,
        '5f06c46b-421e-4c42-8064-6da0c1dd117f',
        14,
        '2025-08-15'::timestamp,
        '2025-08-15'::timestamp);

INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at,
                      updated_at)
VALUES ('WorkSpace',
        '가상 오피스 환경',
        '원격 근무팀을 위한 가상 오피스 공간으로 자연스러운 소통과 협업을 지원하는 플랫폼입니다.',
        '팀 공간에 입장하면 아바타로 이동하며 동료와 음성/화상 채팅으로 소통할 수 있습니다.',
        'workspace-icon.svg',
        'https://workspace.example.com',
        '{
          "views": 3659,
          "reviews": 73,
          "upvotes": 389
        }'::jsonb,
        '5f06c46b-421e-4c42-8064-6da0c1dd117f',
        21,
        '2025-08-15'::timestamp,
        '2025-08-15'::timestamp);
