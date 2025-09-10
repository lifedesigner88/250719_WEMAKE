-- Supabase SQL Editor 또는 psql 등에서 실행하세요.
INSERT INTO public.gpt_ideas (idea, views, claimed_at, claimed_by, created_at)
VALUES
-- 1
('AI 기반 개인 재무 코치 웹앱', 124, now() - interval '14 days', '77964340-e57d-49da-8a09-d0439679555a',
 now() - interval '15 days'),
-- 2 (NULL claimed_by)
('습관 형성 트래커(소셜 리더보드 포함)', 89, NULL, NULL, now() - interval '14 days'),
-- 3
('여행 일정 자동 생성기(예산 최적화)', 56, now() - interval '13 days', 'ada26f4d-64f6-434a-a811-4cc612c383da',
 now() - interval '13 days'),
-- 4 (NULL)
('개발자 포트폴리오 분석·피드백 도구', 31, NULL, NULL, now() - interval '12 days'),
-- 5
('음식 사진으로 칼로리 추정 앱', 210, now() - interval '11 days', '152dada0-4e89-44dd-a0c5-631cccba1b12',
 now() - interval '12 days'),
-- 6
('문서 요약 + 질의응답 내비게이터', 76, now() - interval '10 days', '99fa0874-3b12-4380-afd2-5a3be9e393ef',
 now() - interval '10 days'),
-- 7 (NULL)
('소규모 팀용 번다운 차트 자동화', 18, NULL, NULL, now() - interval '9 days'),
-- 8
('이력서→직무 맞춤 리라이트 서비스', 142, now() - interval '8 days', 'b0e04298-ab61-454f-9e4d-1e592a6aad35',
 now() - interval '9 days'),
-- 9
('동네 상권 데이터 맵(창업 인사이트)', 67, now() - interval '8 days', '77964340-e57d-49da-8a09-d0439679555a',
 now() - interval '8 days'),
-- 10
('회의록 실시간 액션아이템 추출', 95, now() - interval '7 days', 'ada26f4d-64f6-434a-a811-4cc612c383da', now() - interval '7 days'),
-- 11 (NULL)
('사이드프로젝트 매칭(역할·시간대 필터)', 40, NULL, NULL, now() - interval '7 days'),
-- 12
('뉴스레터 주제 레코멘더(트렌드 감지)', 52, now() - interval '6 days', '152dada0-4e89-44dd-a0c5-631cccba1b12',
 now() - interval '6 days'),
-- 13
('이커머스 리뷰 분석 대시보드', 173, now() - interval '6 days', '99fa0874-3b12-4380-afd2-5a3be9e393ef', now() - interval '6 days'),
-- 14
('코드 스니펫 검색 + 팀 공유 허브', 61, now() - interval '5 days', 'b0e04298-ab61-454f-9e4d-1e592a6aad35',
 now() - interval '5 days'),
-- 15 (NULL)
('개인화 운동 루틴 플래너', 28, NULL, NULL, now() - interval '5 days'),
-- 16
('OKR 목표 수립·진척 자동 코치', 80, now() - interval '4 days', '77964340-e57d-49da-8a09-d0439679555a',
 now() - interval '4 days'),
-- 17
('블로그 SEO 갭 분석기', 133, now() - interval '4 days', 'ada26f4d-64f6-434a-a811-4cc612c383da', now() - interval '4 days'),
-- 18 (NULL)
('학습 카드 생성기(문답·스페이싱 반복)', 22, NULL, NULL, now() - interval '3 days'),
-- 19
('B2B 세일즈 이메일 개인화 엔진', 196, now() - interval '3 days', '152dada0-4e89-44dd-a0c5-631cccba1b12',
 now() - interval '3 days'),
-- 20
('로그 모니터링 → 원인 요약 알림', 74, now() - interval '3 days', '99fa0874-3b12-4380-afd2-5a3be9e393ef',
 now() - interval '3 days'),
-- 21
('구독 서비스 취소 예방(이탈 신호 탐지)', 119, now() - interval '2 days', 'b0e04298-ab61-454f-9e4d-1e592a6aad35',
 now() - interval '2 days'),
-- 22 (NULL)
('캘린더 기반 에너지 레벨 최적화', 15, NULL, NULL, now() - interval '2 days'),
-- 23
('오픈소스 이슈 큐레이터(난이도/태그)', 58, now() - interval '2 days', '77964340-e57d-49da-8a09-d0439679555a',
 now() - interval '2 days'),
-- 24
('디자인 토큰 동기화 도구(Figma↔코드)', 91, now() - interval '36 hours', 'ada26f4d-64f6-434a-a811-4cc612c383da',
 now() - interval '40 hours'),
-- 25
('프롬프트 A/B 테스팅 대시보드', 134, now() - interval '30 hours', '152dada0-4e89-44dd-a0c5-631cccba1b12',
 now() - interval '36 hours'),
-- 26
('문서 번역 품질 평가/리뷰 플랫폼', 47, now() - interval '28 hours', '99fa0874-3b12-4380-afd2-5a3be9e393ef',
 now() - interval '32 hours'),
-- 27 (NULL)
('채용 공고 스크래퍼→스킬맵 생성', 20, NULL, NULL, now() - interval '26 hours'),
-- 28
('데이터셋 프로파일링 자동 리포터', 108, now() - interval '22 hours', 'b0e04298-ab61-454f-9e4d-1e592a6aad35',
 now() - interval '24 hours'),
-- 29
('멀티 플랫폼 소셜 게시 스케줄러', 69, now() - interval '20 hours', '77964340-e57d-49da-8a09-d0439679555a',
 now() - interval '22 hours'),
-- 30 (NULL)
('PR 설명 자동 생성 + 체크리스트', 26, NULL, NULL, now() - interval '18 hours');