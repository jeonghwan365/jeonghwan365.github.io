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
    role: "Product Manager",
    intro: "",
    introTodo: "첫 화면 한 줄 소개 (직접 작성)",
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
      summary: ["유해발굴병으로 복무하고 병장으로 만기전역했습니다."],
      todo: "복무에서 얻은 것 한두 줄 (선택)"
    },
    {
      id: "buddy-2024-summer",
      kind: "point",
      track: "campus",
      start: "2024-07",
      short: "버디 프로그램",
      title: "교내 버디 프로그램, 우수 버디 선정",
      meta: [
        { label: "결과", value: "우수 버디 선정" }
      ],
      summary: ["교내 버디 프로그램에 참여해 우수 버디로 선정되었습니다."],
      todo: "맡은 일 (누구를, 무엇을 도왔는지)"
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
        { label: "형태", value: "5인 팀" }
      ],
      summary: [
        "외국인 대상 사회통합프로그램(KIIP)의 재정 운용을 분석한 팀 프로젝트입니다."
      ],
      role: [
        "대전에 있는 거점운영기관을 직접 찾아가 협조를 요청하고, 외국인 수강생을 대상으로 대면 설문을 진행했습니다.",
        "보고서는 팀이 함께 썼고, 저는 행정학 전공을 살려 정책 분석 부분에 집중했습니다."
      ],
      todo: "보고서 핵심 결론 2~3줄 요약 (원문을 보고 직접 작성)",
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
      todo: "맡은 일 (첫 참여와 달라진 점이 있다면 함께)"
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
      summary: ["국제처에서 단기 인바운드 프로그램을 담당하는 학생 인턴으로 일했습니다."],
      todo: "맡은 업무와 결과"
    },
    {
      id: "seongsinui-essay",
      kind: "point",
      track: "project",
      start: "2025-06",
      short: "에세이 최우수상",
      title: "성신의 에세이 대회 최우수상",
      meta: [
        { label: "주제", value: "알고리즘과 주의력 경제 (문화비평)" },
        { label: "결과", value: "최우수상" }
      ],
      summary: ["알고리즘과 주의력 경제를 다룬 문화비평 에세이로 교내 대회 최우수상을 받았습니다."],
      todo: "에세이의 핵심 주장 한 줄 (선택)"
    },
    {
      id: "seoul-city-hall",
      kind: "period",
      track: "work",
      start: "2025-07",
      end: "2025-08",
      short: "서울시청",
      title: "서울시청 중대재해본부 대학생 아르바이트",
      summary: ["서울시청 중대재해본부에서 대학생 아르바이트로 일했습니다."],
      todo: "맡은 업무"
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
        { label: "대회", value: "KU:Maker 아이디어 공모전" },
        { label: "형태", value: "팀" }
      ],
      summary: ["스마트글래스 제품 아이디어를 기획서로 구체화한 팀 프로젝트입니다."],
      role: [
        "부품 명세서를 바탕으로 제품 원가를 산출했습니다.",
        "경쟁 제품의 가격을 비교했습니다.",
        "발표 자료(PPT)를 만들었습니다.",
        "기술 설계는 팀원이 맡았습니다."
      ],
      todo: "결과와 배운 점"
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
      summary: ["국방부 전산정보원에서 청년인턴으로 일하고 수료했습니다."],
      todo: "맡은 업무 (있는 그대로)"
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
        { label: "형태", value: "개인, 영문" }
      ],
      summary: ["한일 경제 협력의 한계와 가능성을 죄수의 딜레마로 분석한 영문 에세이입니다."],
      todo: "핵심 주장 한 줄",
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
      summary: ["방학 중 중국 상하이에서 단기 교환학생 프로그램에 참여했습니다."],
      todo: "배운 것"
    }
  ]
};
