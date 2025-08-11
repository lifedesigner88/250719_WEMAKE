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


INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at)
VALUES (
           'NovaBoard',
           '팀 협업을 더 빠르게',
           '칸반 기반으로 태스크를 시각화하고 진행 상황을 추적하는 협업 툴입니다.',
           '보드를 만들고 리스트/카드를 드래그해 워크플로우를 관리합니다.',
           'novaboard.png',
           'https://example.com/novaboard',
           '{"views": 1234, "reviews": 17, "upvotes": 92}'::jsonb,
           '77964340-e57d-49da-8a09-d0439679555a',
           3,
           NOW(),
           NOW()
       );

INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at)
VALUES (
           'PulseInsight',
           '제품 지표를 한눈에',
           '실시간 대시보드로 핵심 KPI를 모니터링하고 알림을 제공합니다.',
           '데이터 소스를 연결하면 주요 지표를 자동 수집·시각화합니다.',
           'pulseinsight.svg',
           'https://example.com/pulseinsight',
           '{"views": 2789, "reviews": 33, "upvotes": 141}'::jsonb,
           'ada26f4d-64f6-434a-a811-4cc612c383da',
           7,
           NOW(),
           NOW()
       );

INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at)
VALUES (
           'WhisperDocs',
           '문서 협업의 표준',
           '버전 관리와 권한 제어가 포함된 팀 문서 협업 공간입니다.',
           '문서를 생성하고 멤버를 초대해 실시간으로 공동 편집합니다.',
           'whisperdocs.png',
           'https://example.com/whisperdocs',
           '{"views": 987, "reviews": 12, "upvotes": 58}'::jsonb,
           '152dada0-4e89-44dd-a0c5-631cccba1b12',
           12,
           NOW(),
           NOW()
       );

INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at)
VALUES (
           'RelayForms',
           '간단하지만 강력한 폼',
           '설문/신청/피드백 폼을 빠르게 생성하고 응답을 분석합니다.',
           '드래그 앤 드롭으로 폼을 만들고 링크를 공유해 응답을 수집합니다.',
           'relayforms.svg',
           'https://example.com/relayforms',
           '{"views": 1560, "reviews": 21, "upvotes": 77}'::jsonb,
           '99fa0874-3b12-4380-afd2-5a3be9e393ef',
           21,
           NOW(),
           NOW()
       );

INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at)
VALUES (
           'SparkQueue',
           '이벤트 처리 가속화',
           '분산 큐 기반의 확장 가능한 이벤트 파이프라인입니다.',
           '프로듀서를 연결하면 컨슈머가 자동으로 스케일링되어 처리량을 보장합니다.',
           'sparkqueue.png',
           'https://example.com/sparkqueue',
           '{"views": 3412, "reviews": 49, "upvotes": 203}'::jsonb,
           'b0e04298-ab61-454f-9e4d-1e592a6aad35',
           27,
           NOW(),
           NOW()
       );