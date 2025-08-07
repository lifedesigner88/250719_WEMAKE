INSERT INTO categories (name, description, created_at, updated_at)
VALUES ('생산성 도구', '업무 효율성을 높이고 작업을 체계적으로 관리하는 도구들', NOW(), NOW()),
       ('교육 및 학습', '온라인 학습, 스킬 개발, 교육 플랫폼 관련 서비스', NOW(), NOW()),
       ('건강 및 피트니스', '운동, 건강 관리, 웰니스 관련 앱과 서비스', NOW(), NOW()),
       ('개발 도구', '프로그래밍, 개발자를 위한 도구와 플랫폼', NOW(), NOW()),
       ('환경 및 지속가능성', '친환경 생활, 탄소 발자국 관리 관련 서비스', NOW(), NOW()),
       ('미디어 및 사진', '사진 편집, 미디어 관리, 콘텐츠 제작 도구', NOW(), NOW()),
       ('금융 및 재정관리', '가계부, 투자, 금융 서비스 관련 앱', NOW(), NOW()),
       ('요리 및 음식', '레시피, 식단 관리, 요리 관련 서비스', NOW(), NOW()),
       ('취미 및 라이프스타일', '개인 취미, 일상 관리 관련 앱과 서비스', NOW(), NOW()),
       ('음악 및 오디오', '음악 스트리밍, 오디오 편집, 사운드 관련 도구', NOW(), NOW()),
       ('보안 및 프라이버시', '개인정보 보호, 보안 관리 도구', NOW(), NOW()),
       ('날씨 및 환경정보', '날씨 예보, 환경 정보 제공 서비스', NOW(), NOW()),
       ('독서 및 문학', '독서 관리, 도서 추천, 문학 관련 플랫폼', NOW(), NOW()),
       ('스마트홈 및 IoT', '홈 오토메이션, IoT 기기 관리 서비스', NOW(), NOW()),
       ('이벤트 및 모임', '이벤트 기획, 모임 관리 관련 도구', NOW(), NOW()),
       ('반려동물', '펫케어, 반려동물 관리 관련 서비스', NOW(), NOW()),
       ('투자 및 암호화폐', '투자 관리, 암호화폐 추적 관련 서비스', NOW(), NOW()),
       ('오피스 및 문서', '문서 작성, 오피스 작업 관련 도구', NOW(), NOW()),
       ('여행 및 관광', '여행 계획, 관광 정보 제공 서비스', NOW(), NOW()),
       ('마케팅 및 SNS', '소셜미디어 관리, 마케팅 도구', NOW(), NOW()),
       ('설문 및 리서치', '설문조사, 데이터 수집 관련 도구', NOW(), NOW()),
       ('디자인 및 크리에이티브', '그래픽 디자인, 창작 도구', NOW(), NOW()),
       ('비즈니스 및 업무', '비즈니스 관리, 업무 효율성 도구', NOW(), NOW()),
       ('두뇌훈련 및 게임', '인지 능력 향상, 두뇌 게임 관련 앱', NOW(), NOW()),
       ('유틸리티 도구', '다양한 편의 기능을 제공하는 유틸리티 앱', NOW(), NOW()),
       ('미디어 제작', '영상, 오디오 제작 및 편집 도구', NOW(), NOW()),
       ('시스템 및 네트워크', '컴퓨터 시스템, 네트워크 관리 도구', NOW(), NOW()),
       ('웹 개발', '웹사이트 제작, 웹 개발 관련 도구', NOW(), NOW()),
       ('창작 및 글쓰기', '창작 활동, 글쓰기 지원 도구', NOW(), NOW()),
       ('쇼핑 및 라이프스타일', '온라인 쇼핑, 생활 편의 서비스', NOW(), NOW()),
       ('지역 서비스', '지역 기반 서비스, 로컬 비즈니스 관련 플랫폼', NOW(), NOW());


INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at,
                      updated_at)
VALUES ('TaskMaster Pro', '업무 생산성을 극대화하는 스마트 태스크 관리자', '개인과 팀의 업무 효율성을 높이는 지능형 작업 관리 도구입니다.',
        '할일을 추가하고 우선순위를 설정하며, AI가 최적의 작업 순서를 추천합니다.', 'task-icon.svg', 'https://taskmaster-pro.com', '{
    "views": 1250,
    "reviews": 45,
    "upvotes": 89
  }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 1, '2022-08-15 09:30:00', '2022-08-15 09:30:00'),
       ('MindMap Studio', '아이디어를 시각화하는 창의적 마인드맵 도구', '복잡한 아이디어와 프로젝트를 직관적인 마인드맵으로 정리하고 공유하세요.',
        '노드를 생성하고 연결하여 사고의 흐름을 시각화하고 팀과 실시간 협업합니다.', 'mindmap-icon.svg', 'https://mindmap-studio.io', '{
         "views": 980,
         "reviews": 32,
         "upvotes": 67
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 2, '2022-09-03 14:20:00', '2022-09-03 14:20:00'),
       ('FitTracker+', '개인 맞춤형 운동 및 건강 관리 앱', '운동 기록, 식단 관리, 건강 지표 추적을 한 곳에서 관리하세요.',
        '운동을 기록하고 칼로리를 추적하며, AI가 개인 맞춤 운동 계획을 제공합니다.', 'fitness-icon.svg', 'https://fittracker-plus.com', '{
         "views": 2100,
         "reviews": 78,
         "upvotes": 142
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 3, '2022-09-20 11:45:00', '2022-09-20 11:45:00'),
       ('CodeReview Buddy', '개발자를 위한 지능형 코드 리뷰 도구', '머신러닝을 활용한 자동 코드 분석으로 더 나은 코드 품질을 유지하세요.',
        '코드를 업로드하면 자동으로 버그와 개선점을 찾아 리포트를 제공합니다.', 'code-icon.svg', 'https://codereview-buddy.dev', '{
         "views": 1580,
         "reviews": 55,
         "upvotes": 103
       }', '77964340-e57d-49da-8a09-d0439679555a', 4, '2022-10-12 16:15:00', '2022-10-12 16:15:00'),
       ('EcoTrack', '친환경 생활 실천을 위한 탄소발자국 추적기', '일상 속 탄소 배출량을 측정하고 친환경 대안을 제안합니다.',
        '교통, 식단, 소비 패턴을 입력하면 탄소발자국을 계산하고 감축 방법을 안내합니다.', 'eco-icon.svg', 'https://ecotrack.green', '{
         "views": 750,
         "reviews": 28,
         "upvotes": 56
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 5, '2022-11-05 10:30:00', '2022-11-05 10:30:00'),
       ('StudyPlanner AI', '학습 효율성을 높이는 AI 기반 학습 계획 도구', '개인의 학습 패턴을 분석하여 최적화된 공부 계획을 수립합니다.',
        '목표를 설정하고 학습 진도를 입력하면 AI가 개인 맞춤 학습 일정을 생성합니다.', 'study-icon.svg', 'https://studyplanner-ai.edu', '{
         "views": 1890,
         "reviews": 67,
         "upvotes": 125
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 2, '2022-11-28 13:20:00', '2022-11-28 13:20:00'),
       ('PhotoSort Magic', '사진을 자동으로 분류하고 정리하는 스마트 갤러리', '수천 장의 사진을 AI가 자동으로 분류하고 태그를 달아 쉽게 찾을 수 있습니다.',
        '사진을 업로드하면 내용, 날짜, 장소별로 자동 분류하고 검색 가능한 태그를 생성합니다.', 'photo-icon.svg', 'https://photosort-magic.com', '{
         "views": 2350,
         "reviews": 89,
         "upvotes": 178
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 6, '2022-12-18 09:45:00', '2022-12-18 09:45:00'),
       ('BudgetWise', '스마트한 가계부 및 재정 관리 도구', '수입과 지출을 자동으로 분석하여 개인 재정을 최적화합니다.',
        '은행 계좌와 연동하여 자동으로 거래를 분류하고 예산 대비 지출을 분석합니다.', 'budget-icon.svg', 'https://budgetwise.finance', '{
         "views": 1650,
         "reviews": 52,
         "upvotes": 98
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 7, '2023-01-15 15:30:00', '2023-01-15 15:30:00'),
       ('TeamSync Hub', '원격 팀을 위한 올인원 협업 플랫폼', '화상회의, 파일 공유, 프로젝트 관리를 하나의 플랫폼에서 제공합니다.',
        '팀원들과 실시간 채팅, 화상회의, 파일 공유, 태스크 관리를 통합 환경에서 진행합니다.', 'team-icon.svg', 'https://teamsync-hub.work', '{
         "views": 3200,
         "reviews": 124,
         "upvotes": 245
       }', '77964340-e57d-49da-8a09-d0439679555a', 1, '2023-02-08 11:15:00', '2023-02-08 11:15:00'),
       ('RecipeGenius', 'AI가 추천하는 맞춤형 요리 레시피 앱', '냉장고 재료와 개인 취향을 기반으로 최적의 레시피를 제안합니다.',
        '보유 재료를 입력하고 선호도를 설정하면 AI가 맞춤 레시피와 조리법을 추천합니다.', 'recipe-icon.svg', 'https://recipegenius.food', '{
         "views": 2800,
         "reviews": 95,
         "upvotes": 187
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 8, '2023-03-02 14:45:00', '2023-03-02 14:45:00'),
       ('MoodTracker Pro', '감정 상태를 추적하고 관리하는 멘탈 헬스 도구', '일상의 감정 변화를 기록하고 패턴을 분석하여 정신 건강을 관리하세요.',
        '매일 기분을 기록하고 요인을 분석하여 감정 패턴과 개선 방법을 제시합니다.', 'mood-icon.svg', 'https://moodtracker-pro.health', '{
         "views": 1420,
         "reviews": 48,
         "upvotes": 92
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 3, '2023-03-25 10:20:00', '2023-03-25 10:20:00'),
       ('CodeSnippet Manager', '개발자를 위한 코드 조각 관리 및 공유 플랫폼', '자주 사용하는 코드 스니펫을 체계적으로 관리하고 팀과 공유하세요.',
        '코드 조각을 카테고리별로 저장하고 태그로 검색하며 팀원들과 공유할 수 있습니다.', 'snippet-icon.svg', 'https://codesnippet-manager.dev', '{
         "views": 1750,
         "reviews": 61,
         "upvotes": 118
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 4, '2023-04-18 16:30:00', '2023-04-18 16:30:00'),
       ('PlantCare Assistant', '식물 관리를 도와주는 스마트 가드닝 앱', '식물별 맞춤 관리 일정과 건강 상태 진단을 제공합니다.',
        '식물을 등록하고 사진을 찍으면 종류를 식별하고 물주기, 시비 일정을 알려줍니다.', 'plant-icon.svg', 'https://plantcare-assistant.garden', '{
         "views": 980,
         "reviews": 35,
         "upvotes": 74
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 9, '2023-05-12 12:45:00', '2023-05-12 12:45:00'),
       ('TimeZone Master', '글로벌 팀을 위한 시간대 관리 도구', '전 세계 시간대를 한눈에 보고 미팅 시간을 최적화하세요.',
        '여러 시간대의 시계를 표시하고 모든 참가자에게 적합한 미팅 시간을 찾아줍니다.', 'timezone-icon.svg', 'https://timezone-master.com', '{
         "views": 1230,
         "reviews": 42,
         "upvotes": 86
       }', '77964340-e57d-49da-8a09-d0439679555a', 1, '2023-06-08 09:15:00', '2023-06-08 09:15:00'),
       ('MusicMood AI', '감정에 맞는 음악을 추천하는 AI 플레이리스트 생성기', '현재 기분과 상황에 완벽하게 맞는 음악을 AI가 선곡합니다.',
        '기분, 활동, 장르 선호도를 입력하면 AI가 개인 맞춤 플레이리스트를 생성합니다.', 'music-icon.svg', 'https://musicmood-ai.music', '{
         "views": 3450,
         "reviews": 138,
         "upvotes": 267
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 10, '2023-07-01 17:20:00', '2023-07-01 17:20:00'),
       ('PasswordVault Pro', '고급 보안 기능을 갖춘 패스워드 매니저', '군사급 암호화로 패스워드를 안전하게 보관하고 관리합니다.',
        '마스터 패스워드로 모든 비밀번호를 보호하고 자동 생성 및 입력 기능을 제공합니다.', 'security-icon.svg', 'https://passwordvault-pro.security', '{
         "views": 2150,
         "reviews": 73,
         "upvotes": 145
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 11, '2023-07-28 13:40:00', '2023-07-28 13:40:00'),
       ('SkillBuilder Hub', '온라인 학습과 스킬 개발을 위한 개인화 플랫폼', '목표 스킬에 맞는 학습 경로를 AI가 설계하고 진도를 관리합니다.',
        '관심 분야를 선택하면 맞춤형 학습 로드맵과 추천 강의를 제공합니다.', 'skill-icon.svg', 'https://skillbuilder-hub.learn', '{
         "views": 1890,
         "reviews": 64,
         "upvotes": 127
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 2, '2023-08-22 11:25:00', '2023-08-22 11:25:00'),
       ('WeatherWise', '정확한 날씨 예보와 의상 추천 서비스', '상세한 날씨 정보와 함께 적절한 옷차림을 추천합니다.',
        '현재 위치의 날씨를 분석하여 온도, 습도, 바람을 고려한 의상을 제안합니다.', 'weather-icon.svg', 'https://weatherwise.forecast', '{
         "views": 2750,
         "reviews": 91,
         "upvotes": 184
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 12, '2023-09-15 15:50:00', '2023-09-15 15:50:00'),
       ('ExpenseTracker Mobile', '이동 중에도 사용하는 간편한 가계부 앱', '사진 한 장으로 영수증을 자동 인식하여 지출을 기록합니다.',
        '영수증을 촬영하면 OCR로 금액과 항목을 자동 입력하고 카테고리를 분류합니다.', 'expense-icon.svg', 'https://expensetracker-mobile.money', '{
         "views": 1680,
         "reviews": 56,
         "upvotes": 109
       }', '77964340-e57d-49da-8a09-d0439679555a', 7, '2023-10-10 10:35:00', '2023-10-10 10:35:00'),
       ('BookClub Connect', '독서 모임과 책 추천을 위한 소셜 플랫폼', '비슷한 취향의 독자들과 연결되어 책을 공유하고 토론하세요.',
        '읽은 책을 등록하고 리뷰를 작성하면 취향이 맞는 사람들과 매칭됩니다.', 'book-icon.svg', 'https://bookclub-connect.read', '{
         "views": 1340,
         "reviews": 47,
         "upvotes": 93
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 13, '2023-11-03 14:15:00', '2023-11-03 14:15:00'),
       ('HomeAutomation Hub', '스마트홈 기기를 통합 관리하는 중앙 제어 시스템', '다양한 브랜드의 IoT 기기를 하나의 앱으로 제어합니다.',
        '조명, 온도, 보안 시스템을 연결하여 음성이나 스케줄로 자동 제어합니다.', 'home-icon.svg', 'https://homeautomation-hub.smart', '{
         "views": 2980,
         "reviews": 112,
         "upvotes": 223
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 14, '2023-12-01 16:45:00', '2023-12-01 16:45:00'),
       ('LanguageBridge', '실시간 다국어 번역 및 언어 학습 도구', 'AI 기반 번역과 발음 교정으로 외국어 소통을 돕습니다.',
        '텍스트나 음성을 입력하면 실시간 번역하고 발음을 교정해줍니다.', 'language-icon.svg', 'https://languagebridge.translate', '{
         "views": 2250,
         "reviews": 78,
         "upvotes": 156
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 2, '2023-12-28 12:20:00', '2023-12-28 12:20:00'),
       ('EventPlanner Pro', '이벤트 기획부터 실행까지 올인원 관리 도구', '초대장 발송, 일정 조율, 예산 관리를 한 번에 처리합니다.',
        '이벤트를 생성하고 참석자를 초대하여 일정과 예산을 체계적으로 관리합니다.', 'event-icon.svg', 'https://eventplanner-pro.events', '{
         "views": 1750,
         "reviews": 62,
         "upvotes": 119
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 15, '2024-01-25 09:30:00', '2024-01-25 09:30:00'),
       ('FocusMode Timer', '집중력 향상을 위한 포모도로 타이머와 환경음', '작업 집중도를 높이는 타이머와 백그라운드 사운드를 제공합니다.',
        '25분 집중과 5분 휴식을 반복하며 백그라운드 음악이나 자연음을 재생합니다.', 'focus-icon.svg', 'https://focusmode-timer.productivity', '{
         "views": 1890,
         "reviews": 67,
         "upvotes": 128
       }', '77964340-e57d-49da-8a09-d0439679555a', 1, '2024-02-18 14:40:00', '2024-02-18 14:40:00'),
       ('NetworkAnalyzer', '네트워크 성능 모니터링 및 진단 도구', '실시간으로 네트워크 상태를 분석하고 문제점을 찾아냅니다.',
        '네트워크를 스캔하여 속도, 연결 상태, 보안 취약점을 검사하고 리포트를 생성합니다.', 'network-icon.svg', 'https://networkanalyzer.tools', '{
         "views": 1450,
         "reviews": 51,
         "upvotes": 97
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 4, '2024-03-15 11:55:00', '2024-03-15 11:55:00'),
       ('PetCare Companion', '반려동물 건강과 일상 관리 도우미', '예방접종, 사료, 산책 일정을 체계적으로 관리합니다.',
        '반려동물 정보를 등록하고 건강 기록, 병원 예약, 용품 구매를 관리합니다.', 'pet-icon.svg', 'https://petcare-companion.pet', '{
         "views": 2100,
         "reviews": 83,
         "upvotes": 165
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 16, '2024-04-08 13:25:00', '2024-04-08 13:25:00'),
       ('CryptoPortfolio Tracker', '암호화폐 포트폴리오 추적 및 분석 도구', '실시간 시세와 수익률을 추적하고 투자 성과를 분석합니다.',
        '보유 코인을 등록하면 실시간 가격과 수익률을 추적하고 투자 리포트를 제공합니다.', 'crypto-icon.svg', 'https://cryptoportfolio-tracker.finance', '{
         "views": 3250,
         "reviews": 118,
         "upvotes": 241
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 17, '2024-05-02 16:10:00', '2024-05-02 16:10:00'),
       ('MindfulMeditation', '일상의 스트레스를 해소하는 명상 가이드 앱', '개인 맞춤형 명상 프로그램과 마음챙김 연습을 제공합니다.',
        '레벨별 명상 가이드와 호흡법 연습으로 스트레스를 관리하고 집중력을 향상시킵니다.', 'meditation-icon.svg', 'https://mindfulmeditation.wellness', '{
         "views": 1680,
         "reviews": 59,
         "upvotes": 114
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 3, '2024-05-28 10:15:00', '2024-05-28 10:15:00'),
       ('DocumentScanner AI', '문서를 스마트하게 스캔하고 정리하는 도구', '카메라로 촬영한 문서를 고화질로 변환하고 OCR로 텍스트를 추출합니다.',
        '문서를 촬영하면 자동으로 모서리를 인식하고 텍스트를 추출하여 편집 가능한 파일로 변환합니다.', 'scanner-icon.svg', 'https://documentscanner-ai.tools',
        '{
          "views": 2450,
          "reviews": 87,
          "upvotes": 172
        }', '77964340-e57d-49da-8a09-d0439679555a', 18, '2024-06-22 15:30:00', '2024-06-22 15:30:00'),
       ('TravelPlanner Smart', '여행 계획부터 기록까지 스마트 여행 도우미', 'AI가 추천하는 맞춤형 여행 일정과 현지 정보를 제공합니다.',
        '목적지와 예산을 입력하면 최적의 일정과 숙소, 맛집을 추천하고 여행 기록을 관리합니다.', 'travel-icon.svg', 'https://travelplanner-smart.travel', '{
         "views": 2890,
         "reviews": 102,
         "upvotes": 195
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 19, '2024-07-15 12:45:00', '2024-07-15 12:45:00'),
       ('VoiceMemo Pro', '음성 메모와 자동 텍스트 변환 도구', '음성을 고품질로 녹음하고 AI가 정확하게 텍스트로 변환합니다.',
        '음성을 녹음하면 자동으로 텍스트로 변환하고 키워드별로 검색하며 카테고리로 분류합니다.', 'voice-icon.svg', 'https://voicememo-pro.record', '{
         "views": 1750,
         "reviews": 64,
         "upvotes": 122
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 18, '2024-08-05 09:20:00', '2024-08-05 09:20:00'),
       ('SocialMediaScheduler', '소셜미디어 게시물 예약 및 분석 도구', '여러 플랫폼에 동시에 게시하고 성과를 분석합니다.',
        '콘텐츠를 작성하고 게시 시간을 예약하여 인스타그램, 트위터 등에 자동 업로드합니다.', 'social-icon.svg', 'https://socialmedia-scheduler.marketing',
        '{
          "views": 2150,
          "reviews": 76,
          "upvotes": 148
        }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 20, '2024-08-28 14:35:00', '2024-08-28 14:35:00'),
       ('QuickPoll Creator', '실시간 설문조사와 투표 생성 도구', '간단한 설문부터 복잡한 조사까지 빠르게 생성하고 결과를 분석합니다.',
        '질문을 입력하고 링크를 공유하면 실시간으로 응답을 수집하고 차트로 결과를 표시합니다.', 'poll-icon.svg', 'https://quickpoll-creator.survey', '{
         "views": 1320,
         "reviews": 46,
         "upvotes": 89
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 21, '2024-09-18 11:50:00', '2024-09-18 11:50:00'),
       ('FileOrganizer Auto', '파일을 자동으로 분류하고 정리하는 도구', 'AI가 파일 내용을 분석하여 자동으로 폴더에 정리합니다.',
        '지정된 폴더를 모니터링하여 새 파일을 자동으로 분류하고 중복 파일을 찾아 정리합니다.', 'file-icon.svg', 'https://fileorganizer-auto.tools', '{
         "views": 1890,
         "reviews": 68,
         "upvotes": 131
       }', '77964340-e57d-49da-8a09-d0439679555a', 18, '2024-10-12 16:25:00', '2024-10-12 16:25:00'),
       ('ColorPalette Generator', '디자이너를 위한 색상 팔레트 생성 도구', '이미지나 키워드에서 조화로운 색상 조합을 추출합니다.',
        '이미지를 업로드하거나 키워드를 입력하면 어울리는 색상 팔레트와 HEX 코드를 생성합니다.', 'color-icon.svg', 'https://colorpalette-generator.design',
        '{
          "views": 2750,
          "reviews": 94,
          "upvotes": 186
        }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 22, '2024-11-05 13:40:00', '2024-11-05 13:40:00'),
       ('HabitTracker Plus', '건강한 습관 형성을 돕는 습관 추적기', '목표 설정부터 진행 상황 분석까지 습관 관리의 모든 것을 제공합니다.',
        '매일 실천할 습관을 등록하고 완료 상태를 체크하며 통계와 성취도를 확인합니다.', 'habit-icon.svg', 'https://habittracker-plus.lifestyle', '{
         "views": 1650,
         "reviews": 58,
         "upvotes": 112
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 3, '2024-11-28 10:30:00', '2024-11-28 10:30:00'),
       ('APITester Pro', '개발자를 위한 고급 API 테스팅 도구', 'REST API 테스트를 위한 직관적인 인터페이스와 자동화 기능을 제공합니다.',
        'HTTP 요청을 구성하고 응답을 확인하며 테스트 케이스를 저장하고 자동화할 수 있습니다.', 'api-icon.svg', 'https://apitester-pro.dev', '{
         "views": 1950,
         "reviews": 71,
         "upvotes": 137
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 4, '2024-12-18 15:15:00', '2024-12-18 15:15:00'),
       ('MealPrepPlanner', '건강한 식단을 위한 주간 식사 계획 도구', '영양소를 고려한 균형 잡힌 식단을 계획하고 장보기 리스트를 생성합니다.',
        '목표 칼로리와 영양소를 설정하면 일주일 식단을 추천하고 필요한 재료 목록을 만듭니다.', 'meal-icon.svg', 'https://mealprepplanner.nutrition', '{
         "views": 2280,
         "reviews": 81,
         "upvotes": 159
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 8, '2025-01-15 12:20:00', '2025-01-15 12:20:00'),
       ('BackupManager Cloud', '자동 백업과 클라우드 동기화 도구', '중요한 파일을 자동으로 백업하고 여러 클라우드 서비스와 동기화합니다.',
        '백업할 폴더를 선택하고 일정을 설정하면 자동으로 클라우드에 백업하고 버전을 관리합니다.', 'backup-icon.svg', 'https://backupmanager-cloud.storage', '{
         "views": 1780,
         "reviews": 63,
         "upvotes": 121
       }', '77964340-e57d-49da-8a09-d0439679555a', 11, '2025-02-08 09:45:00', '2025-02-08 09:45:00'),
       ('MusicPractice Coach', '악기 연습을 도와주는 개인 코치 앱', '메트로놈, 튜너, 연습 일지를 통합한 음악 연습 도구입니다.',
        '연습할 곡을 설정하고 메트로놈에 맞춰 연습하며 진도와 연습 시간을 기록합니다.', 'music-practice-icon.svg', 'https://musicpractice-coach.music',
        '{
          "views": 1450,
          "reviews": 52,
          "upvotes": 98
        }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 10, '2025-03-02 14:30:00', '2025-03-02 14:30:00'),
       ('PresentationMaker AI', 'AI가 도와주는 프레젠테이션 제작 도구', '키워드만 입력하면 전문적인 슬라이드를 자동 생성합니다.',
        '주제를 입력하고 스타일을 선택하면 AI가 구성과 디자인을 완성한 프레젠테이션을 만듭니다.', 'presentation-icon.svg',
        'https://presentationmaker-ai.office', '{
         "views": 2650,
         "reviews": 89,
         "upvotes": 174
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 18, '2025-03-28 11:40:00', '2025-03-28 11:40:00'),
       ('WorkoutBuilder', '개인 맞춤형 운동 루틴 생성기', '체력 수준과 목표에 맞는 운동 계획을 AI가 설계합니다.',
        '현재 체력과 목표를 입력하면 개인에게 최적화된 운동 루틴과 진행 계획을 제공합니다.', 'workout-icon.svg', 'https://workoutbuilder.fitness', '{
         "views": 1890,
         "reviews": 68,
         "upvotes": 132
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 3, '2025-04-22 16:50:00', '2025-04-22 16:50:00'),
       ('InvoiceGenerator Pro', '전문적인 세금계산서 및 견적서 생성 도구', '비즈니스에 필요한 각종 서류를 간단하게 생성하고 관리합니다.',
        '고객 정보와 항목을 입력하면 전문적인 디자인의 세금계산서와 견적서를 생성하고 이메일로 발송합니다.', 'invoice-icon.svg',
        'https://invoicegenerator-pro.business', '{
         "views": 2350,
         "reviews": 84,
         "upvotes": 167
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 23, '2025-05-15 13:25:00', '2025-05-15 13:25:00'),
       ('MemoryBooster Games', '인지 능력 향상을 위한 두뇌 훈련 게임', '기억력, 집중력, 논리력을 키우는 다양한 미니게임을 제공합니다.',
        '매일 다른 종류의 퍼즐과 게임을 통해 두뇌를 훈련하고 인지 능력 변화를 추적합니다.', 'brain-icon.svg', 'https://memorybooster-games.brain', '{
         "views": 1750,
         "reviews": 62,
         "upvotes": 119
       }', '77964340-e57d-49da-8a09-d0439679555a', 24, '2025-06-12 10:15:00', '2025-06-12 10:15:00'),
       ('WeatherWidget Pro', '홈 화면을 위한 고급 날씨 위젯', '상세하고 아름다운 날씨 정보를 홈 화면에 표시합니다.',
        '현재 날씨와 주간 예보를 다양한 스타일의 위젯으로 홈 화면에 배치할 수 있습니다.', 'weather-widget-icon.svg', 'https://weatherwidget-pro.weather',
        '{
          "views": 3150,
          "reviews": 115,
          "upvotes": 234
        }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 12, '2025-07-08 15:35:00', '2025-07-08 15:35:00'),
       ('DatabaseDesigner', '데이터베이스 설계와 모델링 도구', 'ER 다이어그램을 직관적으로 그리고 SQL 스크립트를 자동 생성합니다.',
        '테이블과 관계를 그래픽으로 설계하면 자동으로 DDL 스크립트를 생성하고 데이터베이스를 구축합니다.', 'database-icon.svg', 'https://databasedesigner.tools',
        '{
          "views": 1680,
          "reviews": 59,
          "upvotes": 114
        }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 4, '2025-08-02 12:50:00', '2025-08-02 12:50:00'),
       ('WaterReminder', '건강한 수분 섭취를 위한 물 마시기 알림 앱', '개인별 필요 수분량을 계산하고 규칙적인 물 마시기를 도와줍니다.',
        '몸무게와 활동량을 바탕으로 필요 수분량을 계산하고 적절한 간격으로 알림을 보냅니다.', 'water-icon.svg', 'https://waterreminder.health', '{
         "views": 1320,
         "reviews": 47,
         "upvotes": 91
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 3, '2025-08-28 09:25:00', '2025-08-28 09:25:00'),
       ('QRCode Studio', 'QR코드 생성과 관리를 위한 올인원 도구', '다양한 형태의 QR코드를 생성하고 스캔 통계를 분석합니다.',
        'URL, 텍스트, 연락처 등을 QR코드로 변환하고 디자인을 커스터마이징하며 스캔 통계를 확인합니다.', 'qr-icon.svg', 'https://qrcode-studio.tools', '{
         "views": 2450,
         "reviews": 88,
         "upvotes": 176
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 25, '2025-09-22 14:40:00', '2025-09-22 14:40:00'),
       ('ScreenRecorder HD', '고화질 화면 녹화와 편집 도구', '컴퓨터 화면을 HD 품질로 녹화하고 간단한 편집 기능을 제공합니다.',
        '화면의 전체나 일부를 선택하여 녹화하고 자막, 하이라이트 등을 추가하여 편집할 수 있습니다.', 'screen-icon.svg', 'https://screenrecorder-hd.media', '{
         "views": 2890,
         "reviews": 104,
         "upvotes": 201
       }', '77964340-e57d-49da-8a09-d0439679555a', 26, '2025-10-15 11:20:00', '2025-10-15 11:20:00'),
       ('PasswordGenerator Ultimate', '보안성 높은 비밀번호 생성 및 체크 도구', '다양한 조건의 강력한 비밀번호를 생성하고 보안성을 평가합니다.',
        '길이, 문자 조합을 설정하여 안전한 비밀번호를 생성하고 기존 비밀번호의 보안 강도를 분석합니다.', 'password-gen-icon.svg',
        'https://passwordgenerator-ultimate.security', '{
         "views": 1850,
         "reviews": 66,
         "upvotes": 127
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 11, '2025-11-08 16:45:00', '2025-11-08 16:45:00'),
       ('SmartCalendar AI', 'AI가 최적화하는 스마트 일정 관리자', '일정 패턴을 학습하여 최적의 시간 배치를 제안합니다.',
        '약속을 입력하면 이동 시간과 우선순위를 고려하여 최적의 일정표를 자동으로 구성합니다.', 'smart-calendar-icon.svg',
        'https://smartcalendar-ai.productivity', '{
         "views": 2150,
         "reviews": 77,
         "upvotes": 149
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 1, '2025-12-02 13:30:00', '2025-12-02 13:30:00'),
       ('CodeFormatter Pro', '코드 포맷팅과 정리를 위한 개발 도구', '다양한 프로그래밍 언어의 코드를 자동으로 정리하고 최적화합니다.',
        '코드를 입력하면 선택한 스타일 가이드에 따라 들여쓰기, 줄바꿈 등을 자동으로 정리합니다.', 'code-format-icon.svg', 'https://codeformatter-pro.dev', '{
         "views": 1650,
         "reviews": 58,
         "upvotes": 112
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 4, '2025-12-28 10:10:00', '2025-12-28 10:10:00'),
       ('SleepTracker Smart', '수면 패턴 분석과 개선을 위한 스마트 앱', '수면 데이터를 분석하여 더 나은 잠자리 습관을 제안합니다.',
        '수면 시간과 질을 기록하고 패턴을 분석하여 개선된 수면 루틴을 추천합니다.', 'sleep-icon.svg', 'https://sleeptracker-smart.health', '{
         "views": 1750,
         "reviews": 62,
         "upvotes": 118
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 3, '2026-01-25 15:20:00', '2026-01-25 15:20:00'),
       ('EmailTemplate Builder', '전문적인 이메일 템플릿 제작 도구', '마케팅과 비즈니스용 이메일 템플릿을 쉽게 만들고 관리합니다.',
        '드래그 앤 드롭으로 이메일 레이아웃을 구성하고 반응형 디자인으로 자동 최적화합니다.', 'email-icon.svg', 'https://emailtemplate-builder.marketing',
        '{
          "views": 2250,
          "reviews": 80,
          "upvotes": 158
        }', '77964340-e57d-49da-8a09-d0439679555a', 20, '2026-02-18 12:40:00', '2026-02-18 12:40:00'),
       ('AudioEditor Lite', '간단한 오디오 편집과 변환 도구', '오디오 파일을 자르고 합치며 다양한 포맷으로 변환합니다.',
        '오디오 파일을 불러와서 구간을 선택하여 자르고 여러 파일을 합치거나 포맷을 변환할 수 있습니다.', 'audio-icon.svg', 'https://audioeditor-lite.media', '{
         "views": 1580,
         "reviews": 55,
         "upvotes": 106
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 26, '2026-03-15 09:55:00', '2026-03-15 09:55:00'),
       ('BarcodeScanner Pro', '바코드와 QR코드 스캔 및 생성 도구', '다양한 형태의 바코드를 스캔하고 제품 정보를 확인합니다.',
        '카메라로 바코드를 스캔하면 제품 정보를 표시하고 나만의 바코드도 생성할 수 있습니다.', 'barcode-icon.svg', 'https://barcodescanner-pro.scan', '{
         "views": 3450,
         "reviews": 128,
         "upvotes": 256
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 25, '2026-04-12 14:15:00', '2026-04-12 14:15:00'),
       ('NoteTaking Deluxe', '고급 기능을 갖춘 디지털 노트 앱', '텍스트, 그림, 음성을 하나의 노트에 통합하여 기록합니다.',
        '키보드 입력, 손글씨, 음성 녹음을 조합하여 풍부한 내용의 노트를 만들고 태그로 분류합니다.', 'note-icon.svg', 'https://notetaking-deluxe.notes', '{
         "views": 1950,
         "reviews": 71,
         "upvotes": 138
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 18, '2026-05-08 11:30:00', '2026-05-08 11:30:00'),
       ('SystemMonitor Dashboard', '컴퓨터 성능 모니터링 대시보드', 'CPU, 메모리, 디스크 사용량을 실시간으로 모니터링합니다.',
        '시스템 리소스 사용량을 그래프로 표시하고 성능 병목 지점을 찾아 최적화 방안을 제시합니다.', 'system-icon.svg',
        'https://systemmonitor-dashboard.tools', '{
         "views": 1680,
         "reviews": 59,
         "upvotes": 114
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 27, '2026-06-02 16:25:00', '2026-06-02 16:25:00'),
       ('CloudSync Manager', '멀티 클라우드 동기화 관리 도구', '여러 클라우드 서비스 간의 파일 동기화를 관리합니다.',
        '구글드라이브, 드롭박스, 원드라이브 등의 파일을 한 곳에서 관리하고 자동 동기화합니다.', 'cloud-icon.svg', 'https://cloudsync-manager.cloud', '{
         "views": 2350,
         "reviews": 84,
         "upvotes": 167
       }', '77964340-e57d-49da-8a09-d0439679555a', 11, '2026-06-28 13:50:00', '2026-06-28 13:50:00'),
       ('RecipeVideo Maker', '요리 레시피를 비디오로 만드는 크리에이터 도구', '단계별 요리 과정을 자동으로 영상으로 편집합니다.',
        '레시피 단계를 입력하고 재료 사진을 추가하면 자동으로 요리 영상을 생성하고 자막을 추가합니다.', 'recipe-video-icon.svg',
        'https://recipevideo-maker.cooking', '{
         "views": 2750,
         "reviews": 96,
         "upvotes": 189
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 8, '2026-07-22 10:35:00', '2026-07-22 10:35:00'),
       ('WorkoutTimer Pro', '운동을 위한 고급 인터벌 타이머', 'HIIT, 타바타 등 다양한 운동 방식에 맞는 타이머를 제공합니다.',
        '운동과 휴식 시간을 설정하여 음성 안내와 함께 체계적인 인터벌 트레이닝을 진행합니다.', 'timer-icon.svg', 'https://workouttimer-pro.fitness', '{
         "views": 1450,
         "reviews": 52,
         "upvotes": 99
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 3, '2026-08-15 15:40:00', '2026-08-15 15:40:00'),
       ('TranslationBot', '실시간 대화 번역 도구', '음성 대화를 실시간으로 번역하여 언어 장벽을 해소합니다.',
        '두 명이 각자의 언어로 말하면 실시간으로 번역하여 음성과 텍스트로 전달합니다.', 'translate-icon.svg', 'https://translationbot.language', '{
         "views": 3150,
         "reviews": 118,
         "upvotes": 243
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 2, '2026-09-10 12:20:00', '2026-09-10 12:20:00'),
       ('InventoryTracker', '개인 및 비즈니스 재고 관리 시스템', '제품 입출고를 추적하고 재고 현황을 실시간으로 파악합니다.',
        '바코드 스캔으로 제품을 등록하고 입출고를 기록하여 재고 수준과 주문 시점을 관리합니다.', 'inventory-icon.svg', 'https://inventorytracker.business',
        '{
          "views": 2450,
          "reviews": 88,
          "upvotes": 174
        }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 23, '2026-10-05 09:45:00', '2026-10-05 09:45:00'),
       ('MoodJournal AI', 'AI 분석을 통한 감정 일기장', '감정 패턴을 분석하고 개인화된 정신 건강 조언을 제공합니다.',
        '매일의 감정과 상황을 기록하면 AI가 패턴을 분석하고 스트레스 관리 방법을 제안합니다.', 'mood-journal-icon.svg', 'https://moodjournal-ai.wellness',
        '{
          "views": 1650,
          "reviews": 58,
          "upvotes": 112
        }', '77964340-e57d-49da-8a09-d0439679555a', 3, '2026-11-01 14:30:00', '2026-11-01 14:30:00'),
       ('WebsiteBuilder Easy', '코딩 없이 만드는 반응형 웹사이트 빌더', '드래그 앤 드롭으로 전문적인 웹사이트를 쉽게 제작합니다.',
        '템플릿을 선택하고 콘텐츠를 추가하여 모바일과 데스크톱에 최적화된 웹사이트를 만듭니다.', 'website-icon.svg', 'https://websitebuilder-easy.web', '{
         "views": 2890,
         "reviews": 105,
         "upvotes": 208
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 28, '2026-11-28 11:15:00', '2026-11-28 11:15:00'),
       ('FlashCard Master', '효율적인 암기를 위한 디지털 플래시카드', '반복 학습 알고리즘으로 최적화된 복습 일정을 제공합니다.',
        '카드를 만들고 정답률에 따라 복습 빈도를 조절하여 장기 기억으로 전환시킵니다.', 'flashcard-icon.svg', 'https://flashcard-master.study', '{
         "views": 1750,
         "reviews": 62,
         "upvotes": 119
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 2, '2026-12-22 16:50:00', '2026-12-22 16:50:00'),
       ('BudgetAnalyzer Pro', '가계부 데이터를 분석하는 재정 인사이트 도구', '지출 패턴을 분석하고 절약 포인트를 찾아줍니다.',
        '가계부 데이터를 업로드하면 카테고리별 지출을 분석하고 절약 가능한 영역을 추천합니다.', 'budget-analyzer-icon.svg',
        'https://budgetanalyzer-pro.finance', '{
         "views": 2150,
         "reviews": 77,
         "upvotes": 148
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 7, '2027-01-18 13:25:00', '2027-01-18 13:25:00'),
       ('ImageCompressor', '사진 용량을 줄이는 이미지 최적화 도구', '화질 손실을 최소화하면서 파일 크기를 효과적으로 압축합니다.',
        '이미지를 업로드하면 품질을 유지하며 파일 크기를 줄이고 웹에 최적화된 포맷으로 변환합니다.', 'compress-icon.svg', 'https://imagecompressor.tools', '{
         "views": 3250,
         "reviews": 121,
         "upvotes": 238
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 26, '2027-02-12 10:40:00', '2027-02-12 10:40:00'),
       ('ConferenceCall Manager', '온라인 회의 예약 및 관리 도구', '화상회의를 예약하고 참석자를 관리하며 회의록을 자동 생성합니다.',
        '회의를 예약하고 초대장을 발송하며 회의 중 대화를 텍스트로 변환하여 회의록을 작성합니다.', 'conference-icon.svg',
        'https://conferencecall-manager.meeting', '{
         "views": 1890,
         "reviews": 68,
         "upvotes": 132
       }', '77964340-e57d-49da-8a09-d0439679555a', 1, '2027-03-08 15:55:00', '2027-03-08 15:55:00'),
       ('PersonalTrainer AI', 'AI 개인 트레이너와 운동 코칭 앱', '개인의 체력과 목표에 맞는 운동을 AI가 실시간으로 코칭합니다.',
        '운동 자세를 카메라로 분석하여 실시간 피드백을 제공하고 개인별 운동 강도를 조절합니다.', 'personal-trainer-icon.svg',
        'https://personaltrainer-ai.fitness', '{
         "views": 2650,
         "reviews": 92,
         "upvotes": 181
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 3, '2027-04-02 12:30:00', '2027-04-02 12:30:00'),
       ('LinkShortener Plus', 'URL 단축과 클릭 분석을 위한 마케팅 도구', '긴 URL을 짧게 만들고 클릭 통계를 상세히 분석합니다.',
        'URL을 입력하면 짧은 링크를 생성하고 클릭 수, 지역, 디바이스별 통계를 제공합니다.', 'link-icon.svg', 'https://linkshortener-plus.marketing', '{
         "views": 1950,
         "reviews": 71,
         "upvotes": 137
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 20, '2027-04-28 09:45:00', '2027-04-28 09:45:00'),
       ('VirtualBackground Studio', '화상회의용 가상 배경 생성 도구', 'AI를 활용하여 전문적인 가상 배경을 만들고 실시간으로 적용합니다.',
        '배경 이미지를 업로드하거나 키워드로 생성하여 화상회의에서 사용할 수 있는 배경을 만듭니다.', 'virtual-bg-icon.svg',
        'https://virtualbackground-studio.video', '{
         "views": 2350,
         "reviews": 84,
         "upvotes": 168
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 26, '2027-05-22 14:20:00', '2027-05-22 14:20:00'),
       ('TaskAutomator', '반복 작업을 자동화하는 워크플로우 도구', '일상의 반복적인 디지털 작업을 자동화하여 시간을 절약합니다.',
        '작업 단계를 설정하면 파일 이동, 이메일 발송 등의 반복 작업을 자동으로 실행합니다.', 'automation-icon.svg', 'https://taskautomator.productivity',
        '{
          "views": 1750,
          "reviews": 63,
          "upvotes": 121
        }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 1, '2027-06-15 11:35:00', '2027-06-15 11:35:00'),
       ('StoryBuilder AI', '창작을 돕는 AI 스토리 생성 도구', '작가들을 위한 창의적 글쓰기와 스토리 구성 도우미입니다.',
        '장르와 키워드를 입력하면 AI가 스토리 아이디어와 캐릭터를 제안하고 플롯을 구성합니다.', 'story-icon.svg', 'https://storybuilder-ai.creative', '{
         "views": 1650,
         "reviews": 58,
         "upvotes": 113
       }', '77964340-e57d-49da-8a09-d0439679555a', 29, '2027-07-12 16:40:00', '2027-07-12 16:40:00'),
       ('MemoryPalace', '기억술을 이용한 효과적 암기 훈련 앱', '고대 기억술 기법을 현대적으로 재해석한 암기 훈련 도구입니다.',
        '암기할 내용을 가상 공간에 배치하여 시각적 기억법으로 학습하고 복습 일정을 관리합니다.', 'memory-palace-icon.svg', 'https://memorypalace.brain', '{
         "views": 1450,
         "reviews": 51,
         "upvotes": 96
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 24, '2027-08-08 13:50:00', '2027-08-08 13:50:00'),
       ('CurrencyConverter Live', '실시간 환율 변환과 추이 분석 도구', '전 세계 통화를 실시간으로 변환하고 환율 변동을 추적합니다.',
        '통화를 선택하고 금액을 입력하면 실시간 환율로 변환하고 과거 환율 추이를 차트로 보여줍니다.', 'currency-icon.svg',
        'https://currencyconverter-live.finance', '{
         "views": 2750,
         "reviews": 97,
         "upvotes": 192
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 7, '2027-09-02 10:25:00', '2027-09-02 10:25:00'),
       ('MediaLibrary Organizer', '사진과 동영상을 자동 분류하는 미디어 관리자', 'AI가 내용을 분석하여 미디어 파일을 자동으로 분류하고 중복을 제거합니다.',
        '미디어 폴더를 지정하면 AI가 내용을 분석하여 인물, 장소, 날짜별로 자동 분류하고 중복 파일을 찾습니다.', 'media-library-icon.svg',
        'https://medialibrary-organizer.media', '{
         "views": 2150,
         "reviews": 78,
         "upvotes": 151
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 6, '2027-09-28 15:15:00', '2027-09-28 15:15:00'),
       ('ProjectTimer', '프로젝트별 시간 추적 및 생산성 분석 도구', '작업 시간을 정확하게 기록하고 프로젝트별 생산성을 분석합니다.',
        '프로젝트를 생성하고 작업을 시작하면 시간을 자동 추적하여 일일/주간 리포트를 생성합니다.', 'project-timer-icon.svg',
        'https://projecttimer.productivity', '{
         "views": 1890,
         "reviews": 67,
         "upvotes": 129
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 1, '2027-10-22 12:05:00', '2027-10-22 12:05:00'),
       ('FontExplorer', '폰트 미리보기와 관리를 위한 디자인 도구', '시스템 폰트를 탐색하고 텍스트 미리보기로 최적의 폰트를 선택합니다.',
        '설치된 폰트를 한눈에 보고 사용자 텍스트로 미리보기하며 폰트 정보와 사용 예시를 확인합니다.', 'font-icon.svg', 'https://fontexplorer.design', '{
         "views": 1750,
         "reviews": 62,
         "upvotes": 118
       }', '77964340-e57d-49da-8a09-d0439679555a', 22, '2027-11-18 09:30:00', '2027-11-18 09:30:00'),
       ('MindfulBreaks', '업무 중 마음챙김을 위한 휴식 가이드 앱', '정기적인 휴식과 명상으로 업무 스트레스를 관리합니다.',
        '설정된 간격으로 휴식을 알리고 간단한 명상이나 스트레칭 가이드를 제공합니다.', 'mindful-breaks-icon.svg', 'https://mindfulbreaks.wellness', '{
         "views": 1450,
         "reviews": 52,
         "upvotes": 98
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 3, '2027-12-15 14:45:00', '2027-12-15 14:45:00'),
       ('LogAnalyzer Pro', '서버 로그 분석과 모니터링 도구', '대용량 로그 파일을 분석하여 패턴과 이슈를 찾아냅니다.',
        '로그 파일을 업로드하면 자동으로 파싱하여 에러, 경고, 트래픽 패턴을 분석하고 리포트를 생성합니다.', 'log-analyzer-icon.svg',
        'https://loganalyzer-pro.dev', '{
         "views": 2350,
         "reviews": 85,
         "upvotes": 169
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 4, '2028-01-12 11:20:00', '2028-01-12 11:20:00'),
       ('DigitalDetox', '디지털 사용 시간 관리와 건강한 습관 형성 앱', '스마트폰과 앱 사용 시간을 추적하고 디지털 디톡스를 도와줍니다.',
        '앱 사용 시간을 모니터링하고 과도한 사용을 알리며 건강한 디지털 습관을 형성하도록 돕습니다.', 'digital-detox-icon.svg',
        'https://digitaldetox.wellness', '{
         "views": 1950,
         "reviews": 71,
         "upvotes": 138
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 3, '2028-02-08 16:35:00', '2028-02-08 16:35:00'),
       ('VirtualBookshelf', '독서 기록과 추천을 위한 디지털 서재', '읽은 책을 기록하고 AI가 취향에 맞는 책을 추천합니다.',
        '책을 검색하여 서재에 추가하고 평점과 리뷰를 작성하면 비슷한 취향의 다른 책을 추천받습니다.', 'bookshelf-icon.svg', 'https://virtualbookshelf.books',
        '{
          "views": 1650,
          "reviews": 59,
          "upvotes": 114
        }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 13, '2028-03-05 13:50:00', '2028-03-05 13:50:00'),
       ('CreativeWriting Prompt', '창작 영감을 주는 글쓰기 프롬프트 생성기', '작가의 창의성을 자극하는 다양한 글쓰기 아이디어를 제공합니다.',
        '장르와 테마를 선택하면 창의적인 글쓰기 프롬프트와 캐릭터 아이디어를 무작위로 생성합니다.', 'writing-prompt-icon.svg',
        'https://creativewriting-prompt.writing', '{
         "views": 1280,
         "reviews": 45,
         "upvotes": 87
       }', '77964340-e57d-49da-8a09-d0439679555a', 29, '2028-04-01 10:15:00', '2028-04-01 10:15:00'),
       ('BackgroundRemover AI', 'AI를 활용한 이미지 배경 제거 도구', '몇 초 만에 사진에서 배경을 정확하게 제거하고 편집합니다.',
        '이미지를 업로드하면 AI가 자동으로 배경을 감지하여 제거하고 새로운 배경으로 교체할 수 있습니다.', 'bg-remover-icon.svg',
        'https://backgroundremover-ai.photo', '{
         "views": 4250,
         "reviews": 156,
         "upvotes": 298
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 26, '2028-04-28 15:40:00', '2028-04-28 15:40:00'),
       ('SmartShopping List', 'AI가 관리하는 지능형 쇼핑 목록', '구매 패턴을 학습하여 필요한 물건을 미리 추천하고 최적의 쇼핑 경로를 제안합니다.',
        '구매한 물건을 기록하면 소비 패턴을 분석하여 다음에 필요할 물건을 예측하고 할인 정보를 알려줍니다.', 'shopping-list-icon.svg',
        'https://smartshopping-list.lifestyle', '{
         "views": 2150,
         "reviews": 78,
         "upvotes": 152
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 30, '2028-05-25 12:25:00', '2028-05-25 12:25:00'),
       ('NetworkSpeedTest', '정확한 인터넷 속도 측정 및 분석 도구', '다양한 서버로 인터넷 속도를 측정하고 시간대별 변화를 추적합니다.',
        '업로드/다운로드 속도와 핑을 측정하고 시간대별 속도 변화를 그래프로 표시합니다.', 'speed-test-icon.svg', 'https://networkspeedtest.network', '{
         "views": 3450,
         "reviews": 127,
         "upvotes": 248
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 27, '2028-06-22 09:50:00', '2028-06-22 09:50:00'),
       ('TaskPrioritizer', '업무 우선순위를 자동으로 분석하는 생산성 도구', 'AI가 업무의 중요도와 긴급성을 분석하여 최적의 작업 순서를 제안합니다.',
        '할 일을 입력하면 마감일, 중요도, 소요 시간을 고려하여 가장 효율적인 작업 순서를 추천합니다.', 'priority-icon.svg',
        'https://taskprioritizer.productivity', '{
         "views": 1750,
         "reviews": 63,
         "upvotes": 121
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 1, '2028-07-18 14:30:00', '2028-07-18 14:30:00'),
       ('MindMapCollaborator', '팀 협업을 위한 실시간 마인드맵 도구', '여러 명이 동시에 편집할 수 있는 협업 마인드맵 플랫폼입니다.',
        '팀원을 초대하여 실시간으로 마인드맵을 함께 편집하고 아이디어를 공유하며 변경사항을 추적합니다.', 'collab-mindmap-icon.svg',
        'https://mindmapcollaborator.team', '{
         "views": 2050,
         "reviews": 74,
         "upvotes": 143
       }', '77964340-e57d-49da-8a09-d0439679555a', 2, '2028-08-15 11:45:00', '2028-08-15 11:45:00'),
       ('BrainWave Focus', '집중력 향상을 위한 바이노럴 비트 생성기', '뇌파를 조절하는 사운드로 집중력과 창의성을 향상시킵니다.',
        '목적에 맞는 주파수를 선택하면 집중, 창의, 휴식에 도움되는 바이노럴 비트를 생성합니다.', 'brainwave-icon.svg', 'https://brainwave-focus.audio', '{
         "views": 1850,
         "reviews": 66,
         "upvotes": 127
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 24, '2028-09-12 16:55:00', '2028-09-12 16:55:00'),
       ('AlarmClock Smart', '수면 사이클을 고려한 스마트 알람', '수면 패턴을 분석하여 가장 편안한 시점에 깨워주는 지능형 알람입니다.',
        '수면 데이터를 분석하여 얕은 잠일 때 알람을 울리고 점진적으로 볼륨을 높여 자연스럽게 깨워줍니다.', 'smart-alarm-icon.svg',
        'https://alarmclock-smart.sleep', '{
         "views": 2250,
         "reviews": 82,
         "upvotes": 159
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 3, '2028-10-08 13:20:00', '2028-10-08 13:20:00'),
       ('CodeSnippetAI', 'AI가 생성하는 맞춤형 코드 스니펫 도구', '요구사항을 입력하면 AI가 최적화된 코드를 생성하고 설명을 제공합니다.',
        '원하는 기능을 자연어로 설명하면 여러 프로그래밍 언어로 구현된 코드와 사용법을 생성합니다.', 'code-ai-icon.svg', 'https://codesnippetai.dev', '{
         "views": 2750,
         "reviews": 98,
         "upvotes": 194
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 4, '2028-11-02 10:35:00', '2028-11-02 10:35:00'),
       ('GymBuddy Finder', '운동 파트너 매칭과 피트니스 소셜 네트워크', '비슷한 운동 목표를 가진 사람들과 연결되어 함께 운동할 수 있습니다.',
        '운동 종류와 시간대를 설정하면 근처의 운동 파트너를 추천하고 그룹 운동 모임을 만들 수 있습니다.', 'gym-buddy-icon.svg',
        'https://gymbuddy-finder.fitness', '{
         "views": 1950,
         "reviews": 71,
         "upvotes": 138
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 3, '2028-11-28 15:50:00', '2028-11-28 15:50:00'),
       ('DocumentTemplate Hub', '다양한 문서 템플릿 제작과 관리 도구', '계약서, 제안서, 보고서 등 비즈니스 문서 템플릿을 쉽게 만들고 사용합니다.',
        '문서 유형을 선택하고 필요한 정보를 입력하면 전문적인 문서 템플릿을 생성하고 맞춤 수정할 수 있습니다.', 'doc-template-icon.svg',
        'https://documenttemplate-hub.business', '{
         "views": 2350,
         "reviews": 86,
         "upvotes": 171
       }', '77964340-e57d-49da-8a09-d0439679555a', 23, '2028-12-25 12:15:00', '2028-12-25 12:15:00'),
       ('VirtualPetCare', '가상 반려동물 키우기와 관리 게임', '실제 반려동물처럼 돌보고 교감할 수 있는 AI 펫 시뮬레이션입니다.',
        '가상 펫을 선택하여 먹이주기, 놀아주기, 훈련시키기를 통해 성장시키고 다양한 활동을 함께 합니다.', 'virtual-pet-icon.svg', 'https://virtualpetcare.game',
        '{
          "views": 1650,
          "reviews": 59,
          "upvotes": 115
        }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 24, '2029-01-22 09:40:00', '2029-01-22 09:40:00'),
       ('MealNutrition Tracker', '식사의 영양 성분을 분석하는 건강 관리 앱', '음식 사진을 찍으면 AI가 영양 성분을 분석하고 일일 목표와 비교합니다.',
        '식사 사진을 촬영하면 음식을 인식하여 칼로리와 영양소를 계산하고 건강한 식단을 위한 조언을 제공합니다.', 'nutrition-icon.svg',
        'https://mealnutrition-tracker.health', '{
         "views": 2150,
         "reviews": 78,
         "upvotes": 151
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 8, '2029-02-18 14:25:00', '2029-02-18 14:25:00'),
       ('TimelapseCreator', '일상을 타임랩스 영상으로 만드는 크리에이터 도구', '연속된 사진이나 영상을 자동으로 편집하여 아름다운 타임랩스를 생성합니다.',
        '사진이나 영상을 업로드하면 자동으로 시간 순서를 맞춰 부드러운 타임랩스 영상을 만들고 음악을 추가합니다.', 'timelapse-icon.svg',
        'https://timelapsecreator.video', '{
         "views": 2850,
         "reviews": 103,
         "upvotes": 201
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 26, '2029-03-15 11:50:00', '2029-03-15 11:50:00'),
       ('LocalBusiness Finder', '주변 로컬 비즈니스 발견과 리뷰 플랫폼', '근처의 맛집, 카페, 서비스업체를 찾고 실제 이용 후기를 확인합니다.',
        'GPS를 이용하여 주변 업체를 표시하고 실시간 리뷰와 평점으로 최고의 로컬 비즈니스를 추천합니다.', 'local-business-icon.svg',
        'https://localbusiness-finder.local', '{
         "views": 3150,
         "reviews": 116,
         "upvotes": 231
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 31, '2029-04-12 16:30:00', '2029-04-12 16:30:00'),
       ('WifiAnalyzer Pro', '무선 네트워크 분석과 최적화 도구', '주변 WiFi 신호를 분석하여 최적의 채널과 설정을 추천합니다.',
        '무선 네트워크를 스캔하여 신호 강도, 채널 혼잡도를 분석하고 더 빠른 인터넷 연결을 위한 설정을 제안합니다.', 'wifi-analyzer-icon.svg',
        'https://wifianalyzer-pro.network', '{
         "views": 2450,
         "reviews": 89,
         "upvotes": 177
       }', '77964340-e57d-49da-8a09-d0439679555a', 27, '2029-05-08 13:45:00', '2029-05-08 13:45:00'),
       ('AIWritingAssistant', '창작과 업무 글쓰기를 돕는 AI 어시스턴트', '문서 작성, 이메일, 블로그 글쓰기를 AI가 도와주는 종합 글쓰기 도구입니다.',
        '글의 주제와 목적을 입력하면 AI가 구조를 잡아주고 문체를 개선하며 창의적 아이디어를 제공합니다.', 'ai-writing-icon.svg',
        'https://aiwritingassistant.write', '{
         "views": 3750,
         "reviews": 142,
         "upvotes": 284
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 29, '2029-06-05 10:55:00', '2029-06-05 10:55:00');


INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at,
                      updated_at)
VALUES ('DailyFlow', '하루 루틴을 최적화하는 스마트 스케줄러', '개인의 생체리듬과 습관을 분석하여 가장 효율적인 하루 일정을 자동으로 구성해주는 AI 기반 스케줄러입니다.',
        '기존 일정과 습관을 입력하면 AI가 에너지 레벨과 집중도를 고려하여 최적의 시간 배치를 제안합니다.', 'dailyflow-icon.svg', 'https://dailyflow.schedule',
        '{
          "views": 1850,
          "reviews": 42,
          "upvotes": 95
        }', '77964340-e57d-49da-8a09-d0439679555a', 1, '2025-08-07 09:30:00', '2025-08-07 09:30:00'),

       ('CodeMentor AI', '실시간 코딩 멘토링 플랫폼', '초보 개발자를 위한 AI 멘토가 코드 리뷰, 디버깅, 베스트 프랙티스를 실시간으로 가르쳐주는 학습 플랫폼입니다.',
        '코드를 작성하면 AI 멘토가 즉시 피드백을 제공하고, 단계별 학습 로드맵과 개인 맞춤 과제를 추천합니다.', 'codementor-icon.svg',
        'https://codementor-ai.dev', '{
         "views": 2750,
         "reviews": 89,
         "upvotes": 167
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 4, '2025-08-07 11:45:00', '2025-08-07 11:45:00'),

       ('MindfulMoments', '일상 속 마음챙김 실천 도우미', '바쁜 현대인을 위한 짧은 명상과 마음챙김 연습을 통해 스트레스를 관리하고 정신 건강을 개선하는 웰니스 앱입니다.',
        '하루 중 적절한 시점에 1-5분 길이의 간단한 명상과 호흡 연습을 안내하고 감정 상태를 추적합니다.', 'mindful-moments-icon.svg',
        'https://mindfulmoments.wellness', '{
         "views": 1650,
         "reviews": 67,
         "upvotes": 123
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 3, '2025-08-07 14:20:00', '2025-08-07 14:20:00'),

       ('EcoLife Tracker', '지속가능한 생활 습관 추적기', '개인의 환경 친화적 행동을 기록하고 탄소 발자국을 줄이는 구체적인 방법을 제안하는 친환경 라이프스타일 앱입니다.',
        '일상 활동을 기록하면 환경 영향을 계산하고, 친환경 대안을 추천하며 지역별 환경 보호 활동 정보를 제공합니다.', 'ecolife-icon.svg',
        'https://ecolife-tracker.green', '{
         "views": 980,
         "reviews": 34,
         "upvotes": 78
       }', '99fa0874-3b12-4380-afd2-5a3be9e393ef', 5, '2025-08-07 16:15:00', '2025-08-07 16:15:00'),

       ('SmartBudget Pro', '인공지능 기반 개인 재정 관리자', '수입과 지출을 자동으로 분석하고 개인 맞춤형 예산 계획과 투자 조언을 제공하는 스마트 가계부 서비스입니다.',
        '은행 계좌 연동으로 자동 가계부 작성, AI 분석을 통한 지출 패턴 파악 및 절약 방법 제안, 목표 기반 저축 계획을 수립합니다.', 'smartbudget-icon.svg',
        'https://smartbudget-pro.finance', '{
         "views": 2850,
         "reviews": 112,
         "upvotes": 198
       }', 'b0e04298-ab61-454f-9e4d-1e592a6aad35', 7, '2025-08-07 18:40:00', '2025-08-07 18:40:00'),

       ('PhotoStory AI', '추억을 스토리로 만드는 사진 큐레이션 앱', '흩어져 있는 사진들을 AI가 자동으로 분석하여 의미 있는 스토리와 앨범으로 구성해주는 스마트 포토 매니저입니다.',
        '사진을 업로드하면 얼굴 인식, 위치 정보, 시간대별 분석을 통해 자동으로 이벤트별 앨범을 생성하고 슬라이드쇼를 제작합니다.', 'photostory-icon.svg',
        'https://photostory-ai.memories', '{
         "views": 1450,
         "reviews": 56,
         "upvotes": 108
       }', '77964340-e57d-49da-8a09-d0439679555a', 6, '2025-08-07 20:10:00', '2025-08-07 20:10:00'),

       ('FlavorMatch', '개인 취향 기반 맞춤 레시피 추천', '개인의 음식 선호도와 건강 상태를 분석하여 완벽한 맛과 영양을 갖춘 레시피를 추천하는 스마트 쿠킹 어시스턴트입니다.',
        '좋아하는 음식과 알레르기 정보를 입력하면 AI가 개인 맞춤 레시피를 추천하고, 영양소 균형까지 고려한 주간 식단을 제안합니다.', 'flavormatch-icon.svg',
        'https://flavormatch.cooking', '{
         "views": 2250,
         "reviews": 78,
         "upvotes": 145
       }', 'ada26f4d-64f6-434a-a811-4cc612c383da', 8, '2025-08-07 21:35:00', '2025-08-07 21:35:00'),

       ('PlantGuardian', 'AI 기반 식물 건강 진단 및 케어 가이드', '식물 사진을 촬영하면 AI가 건강 상태를 진단하고 맞춤형 케어 방법을 알려주는 스마트 가드닝 도우미입니다.',
        '스마트폰 카메라로 식물을 촬영하면 질병과 영양 상태를 분석하여 구체적인 해결 방법과 케어 일정을 제공합니다.', 'plantguardian-icon.svg',
        'https://plantguardian.garden', '{
         "views": 1750,
         "reviews": 63,
         "upvotes": 119
       }', '152dada0-4e89-44dd-a0c5-631cccba1b12', 9, '2025-08-07 22:50:00', '2025-08-07 22:50:00');