/*
 * 사이트의 모든 내용은 이 파일 하나에 있습니다.
 * 화면 코드(index.html, style.css, app.js)는 이 데이터를 읽어서 그리기만 합니다.
 *
 * 날짜 형식: "YYYY-MM"
 * kind: "period"(기간, 막대) | "point"(시점, 깃발) | "milestone"(전 트랙을 가로지르는 세로선)
 * track: 아래 tracks의 id 중 하나 (milestone은 track 없음)
 * featured: true면 대표 경험으로 강조
 * todo: 아직 채우지 않은 내용. 화면에 '작성 필요'로 표시되며, 공개 전에 모두 지워야 합니다.
 */
window.PORTFOLIO = {
  updated: "2026-10",

  profile: {
    name: "황정환",
    role: "Product Manager 지원자",
    intro: "커리어패스",
    facts: [
      { label: "학력", value: "건국대학교 행정학과, 정치외교학과 복수전공 (2027년 2월 졸업 예정)" },
      { label: "병역", value: "육군 병장 만기전역 (2024년 1월)" }
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jeonghwan365" },
      { label: "이메일", href: "mailto:hiji0011@konkuk.ac.kr" }
    ]
  },

  footer: {
    note: "이 사이트는 Claude Code로 기획하고 만들었습니다. 만든 과정은 GitHub 저장소에서 볼 수 있습니다.",
    repo: "https://github.com/jeonghwan365/jeonghwan365.github.io"
  },

  timeline: {
    start: "2023-10",
    end: "2027-03",
    graduation: { date: "2027-02", label: "졸업 예정" }
  },

  tracks: [
    { id: "study", label: "학업·어학" },
    { id: "work", label: "실무 경험" },
    { id: "project", label: "프로젝트·수상" },
    { id: "campus", label: "교내 활동" }
  ],

  items: [
    {
      id: "jlpt-n3",
      kind: "point",
      track: "study",
      start: "2023-12",
      short: "JLPT N3",
      title: "JLPT N3 취득",
      meta: [
        { label: "구분", value: "어학" }
      ],
      summary: ["군 복무 중 준비해 취득했습니다."]
    },
    {
      id: "discharge",
      kind: "milestone",
      start: "2024-01",
      short: "전역",
      title: "육군 병장 만기전역",
      meta: [
        { label: "보직", value: "유해발굴병" }
      ],
      summary: ["유해발굴병으로 복무하고 병장으로 만기전역했습니다."]
    },
    {
      id: "buddy-2024-summer",
      kind: "period",
      track: "campus",
      start: "2024-07",
      end: "2024-08",
      short: "버디 프로그램",
      title: "교내 버디 프로그램, 우수 버디 선정",
      meta: [
        { label: "결과", value: "우수 버디 선정" }
      ],
      summary: ["교내 버디 프로그램에 참여해 우수 버디로 선정되었습니다."],
      role: [
        "입국 직후의 단기 교환학생을 맡아 기숙사 입주 준비부터 캠퍼스 생활 적응, 한국 생활 체험 활동까지 현장에서 지원했습니다.",
        "참가 인원이 크게 늘어난 첫 해라 정해진 매뉴얼이 부족했고, 현장에서 바로 판단해 움직여야 하는 일이 많았습니다."
      ]
    },
    {
      id: "kiip-fiscal",
      kind: "point",
      track: "project",
      start: "2024-11",
      short: "재정마스터 장려상",
      title: "사회통합프로그램(KIIP) 재정 분석",
      featured: true,
      meta: [
        { label: "대회", value: "청년국가재정마스터" },
        { label: "결과", value: "장려상" },
        { label: "형태", value: "5인 팀" },
        { label: "분량", value: "보고서 24쪽" }
      ],
      summary: [
        "외국인 대상 사회통합프로그램(KIIP)의 재정 운용을 분석한 팀 프로젝트입니다."
      ],
      conclusion: [
        { label: "문제", text: "예산은 2009~2023년 평균 97% 넘게 집행됐지만, 2023년 추정치 기준 중도포기율은 70%대, 사회적응률은 30%대로 사업 성과가 낮았습니다." },
        { label: "원인", text: "생업·양육과 병행하기 어려운 수업 여건과 교통 접근성, 시험 결과와 관계없이 다음 단계로 올라가는 재이수 제도, 2017년 이후 1,000원 오른 강사비와 여성가족부 유사 사업과의 중복을 원인으로 짚었습니다." },
        { label: "해법", text: "부분 유료화와 유사 사업 예산 통합으로 약 103.2억 원을 확보해 정부 재정 의존도를 낮추고, 재이수 제도 개편과 외국인종합안내센터(1345) 내 KIIP 전담 상담원 배정을 제안했습니다." }
      ],
      role: [
        "대전에 있는 거점운영기관을 직접 찾아가 협조를 요청하고, 외국인 수강생을 대상으로 대면 설문을 진행했습니다.",
        "보고서는 팀이 함께 썼고, 저는 행정학 전공을 살려 정책 분석 부분에 집중했습니다."
      ],
      learned: [
        "수업에서 배운 사회조사 방법을 현장에 적용해, 2차 자료를 바탕으로 설문과 인터뷰라는 1차 자료를 직접 만들었습니다.",
        "자료를 넓게 모으는 과정에서 연구자로서 오류도 여러 번 범했지만, 현장에서 사회문제를 직접 마주하며 정책 과정에서 교수님들이 무엇을 중시하는지, 실제 참여자들은 어떻게 생각하는지를 함께 볼 수 있었습니다."
      ],
      document: {
        label: "보고서 원문",
        file: "files/kiip-report.pdf"
      }
    },
    {
      id: "buddy-2024-winter",
      kind: "period",
      track: "campus",
      start: "2024-12",
      end: "2025-01",
      short: "버디 프로그램",
      title: "교내 버디 프로그램, 우수 버디 선정",
      meta: [
        { label: "결과", value: "우수 버디 선정" }
      ],
      summary: ["다시 한 번 교내 버디 프로그램에 참여해 우수 버디로 선정되었습니다."],
      role: [
        "입국 직후의 단기 교환학생을 맡아 기숙사 입주 준비부터 캠퍼스 생활 적응, 한국 생활 체험 활동까지 현장에서 지원했습니다."
      ]
    },
    {
      id: "intl-office-intern",
      kind: "period",
      track: "work",
      start: "2025-03",
      end: "2025-06",
      short: "국제처 인턴",
      title: "건국대학교 국제처 학생 인턴",
      meta: [
        { label: "담당", value: "단기 인바운드 프로그램" }
      ],
      summary: [
        "국제처에서 단기 인바운드 프로그램을 담당하는 학생 인턴으로 일했습니다.",
        "두 차례 버디 활동에서 우수 버디로 선정된 것이 계기가 되었습니다."
      ],
      role: [
        "인바운드 외국인 학생의 문의를 영문 이메일로 응대했습니다.",
        "같은 질문이 반복된다는 점에 착안해 FAQ 체계를 만들었습니다. 실제 문의에서 개인정보를 모두 지우고 익명화한 내용만 사용했습니다.",
        "프로그램 홍보 포스터를 디자인했습니다.",
        "드론 교육을 이수한 경험을 살려 개회식·폐회식 야외 촬영을 자원해 맡았고, 촬영본은 konkuk_shortstay에 게시했습니다."
      ]
    },
    {
      id: "seongsinui-essay",
      kind: "point",
      track: "project",
      start: "2025-06",
      short: "에세이 최우수상",
      title: "제9회 성신의 에세이 경진대회 최우수상",
      meta: [
        { label: "대회", value: "제9회 성신의 에세이 경진대회" },
        { label: "주제", value: "알고리즘과 주의력 경제 (문화비평)" },
        { label: "결과", value: "최우수상" },
        { label: "분량", value: "6쪽" }
      ],
      summary: [
        "알고리즘과 주의력 경제를 다룬 문화비평 에세이로 교내 대회 최우수상을 받았습니다.",
        "주의력이 디지털 통화처럼 거래되는 구조가 팬덤 정치의 감정 동원 수단으로 바뀌는 경로를 추적하고, Truth Social을 사례로 살폈습니다."
      ],
      document: {
        label: "에세이 원문",
        file: "files/seongsinui-essay.pdf"
      }
    },
    {
      id: "seoul-city-hall",
      kind: "period",
      track: "work",
      start: "2025-07",
      end: "2025-08",
      short: "서울시청",
      title: "서울시청 중대재해본부 대학생 아르바이트",
      summary: [
        "서울시청 중대재해본부에서 대학생 아르바이트로 일했습니다.",
        "중대시민재해 대응 체계를 만들기 위해 관리 대상 시설을 유형별로 분류하는 담당 변호사의 작업을 도왔습니다."
      ],
      role: [
        "시설 유형마다 적용되는 관계 법령을 학습한 뒤, 시설물안전법·소방시설법·전기안전관리법·화학물질관리법 등 40여 개 법령의 적용 여부를 교차 정리한 법령 매트릭스를 만들었습니다.",
        "법정 점검 항목별 주기와 실시 시기를 표준화된 형식으로 정리했습니다."
      ]
    },
    {
      id: "a-eye",
      kind: "point",
      track: "project",
      start: "2025-09",
      short: "A-Eye 기획서",
      title: "A-Eye 스마트글래스 기획서",
      featured: true,
      meta: [
        { label: "대회", value: "꿈(KU:Maker) 아이디어 공모전" },
        { label: "결과", value: "본선 진출" },
        { label: "형태", value: "2인 팀" },
        { label: "분량", value: "7쪽" }
      ],
      summary: [
        "'누구나 만들고 개선할 수 있는 30만 원대 AR 글래스'를 목표로 한 제품 아이디어를 기획서로 구체화한 팀 프로젝트입니다.",
        "본선에 진출했지만 최종 선정되지 못해, 계획했던 MVP 제작까지는 이어지지 않았습니다."
      ],
      role: [
        "목표 가격($300)을 먼저 정하고, 부품 명세서의 19개 항목 단가를 적산해 그 가격에 도달할 수 있는지 따져 보는 방식으로 원가를 산출했습니다.",
        "경쟁 제품 4종(HoloLens 2, Apple Vision Pro, Meta Quest 3, XREAL Air 2)을 초기 구매가가 아니라 액세서리·소프트웨어·유지보수를 포함한 1년 총소유비용(TCO)으로 비교했습니다.",
        "발표 자료(PPT)를 만들었습니다.",
        "하드웨어 설계는 팀원이 맡았습니다."
      ],
      document: {
        label: "기획서 원문",
        file: "files/a-eye-proposal.pdf"
      }
    },
    {
      id: "mnd-intern",
      kind: "period",
      track: "work",
      start: "2025-11",
      end: "2026-02",
      short: "국방부 인턴",
      title: "국방부 전산정보원 청년인턴",
      meta: [
        { label: "결과", value: "수료" }
      ],
      summary: ["국방부 전산정보원에서 청년인턴으로 일하고 수료했습니다."]
    },
    {
      id: "extraction-paradox",
      kind: "point",
      track: "project",
      start: "2026-03",
      short: "Extraction Paradox",
      title: "Extraction Paradox",
      meta: [
        { label: "대회", value: "한미협회 대학생 에세이 대회 제출작" },
        { label: "형태", value: "개인, 영문" },
        { label: "분량", value: "26쪽 (영문)" }
      ],
      summary: [
        "미국의 동맹국 대상 통상 압박이 한국과 일본의 국가체력(National Stamina)을 소진시켜 결국 미국 자신의 인도·태평양 안보 구조를 약화시킨다는 '추출의 역설'을, 반복 죄수의 딜레마 모델로 분석한 영문 에세이입니다.",
        "대안으로 한일 초국경 경제 클러스터와, 동맹의 틀을 FTA에서 'Fair Trade for Alliance'로 바꾸는 구상을 제시했습니다."
      ],
      document: {
        label: "에세이 원문",
        file: "files/extraction-paradox.pdf"
      }
    },
    {
      id: "polisci-double-major",
      kind: "period",
      track: "study",
      start: "2026-03",
      end: "2027-02",
      short: "정치외교학 복수전공",
      title: "정치외교학과 복수전공 시작",
      summary: ["행정학 전공에 더해 정치외교학을 복수전공으로 시작했습니다."]
    },
    {
      id: "shanghai-exchange",
      kind: "period",
      track: "study",
      start: "2026-07",
      end: "2026-07",
      short: "상하이 단기교환",
      title: "상하이교통대학교 단기 교환학생",
      meta: [
        { label: "학교", value: "상하이교통대학교 (중국 상하이)" },
        { label: "기간", value: "2026.07.13 – 07.27" }
      ],
      summary: ["방학 중 중국 상하이에서 단기 교환학생 프로그램에 참여했습니다."]
    }
  ]
};
