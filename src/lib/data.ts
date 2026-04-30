// =============================================================================
// GEMSTONE — Site Configuration
// =============================================================================

export const siteConfig = {
  name: "GEMSTONE",
  tagline: "WE RENDER THE UNSEEN.",
  description:
    "정제되지 않은 데이터 속에서 빛나는 인사이트를 세공하는 데이터 분석 크루",
  url: "https://gemstone-site.vercel.app",
};

// =============================================================================
// Navigation
// =============================================================================

export const navItems = [
  { label: "PARAMETERS", href: "#parameters" },
  { label: "ARCHIVE", href: "#archive" },
  { label: "INIT", href: "#init" },
  { label: "EXECUTE", href: "#execute" },
];

// =============================================================================
// Core Parameters — Club Introduction Data
// =============================================================================

export const coreParameters = [
  {
    id: "DEPENDENCY",
    label: "DEPENDENCY",
    value: "NONE",
    numericValue: 0,
    maxValue: 100,
    description:
      "사전 지식은 필요 없습니다. 열정이라는 변수만 있다면 시스템이 빌드합니다.",
  },
  {
    id: "LEARNING_CURVE",
    label: "LEARNING_CURVE",
    value: "OPTIMIZED",
    numericValue: 92,
    maxValue: 100,
    description:
      "실전 파이썬 분석 기법만 압축하여 누구나 데이터와 대화하게 만듭니다.",
  },
  {
    id: "TEAM_STATUS",
    label: "TEAM_STATUS",
    value: "RECRUITING",
    numericValue: 67,
    maxValue: 100,
    description:
      "데이터를 해체하고 재조립할 새로운 원석을 호출합니다.",
  },
];

// =============================================================================
// Data Archive — ML Project Showcase
// =============================================================================

export interface Project {
  id: string;
  field: string;
  title: string;
  titleKr: string;
  description: string;
  tech: string[];
  status: "EXECUTED" | "IN_PROGRESS" | "ARCHIVED";
  accuracy?: string;
}

export const projects: Project[] = [
  {
    id: "GEM-001",
    field: "MARKETING",
    title: "Customer Churn Prediction",
    titleKr: "이탈 고객 예측 모델",
    description:
      "통신사 고객 데이터 12,000건을 분석하여 이탈 가능성이 높은 고객을 사전 식별하는 예측 모델을 구축. 로지스틱 회귀와 XGBoost 앙상블로 이탈률을 23% 감소시킨 마케팅 전략 도출.",
    tech: ["Python", "XGBoost", "Pandas", "Scikit-learn", "Matplotlib"],
    status: "EXECUTED",
    accuracy: "94.2%",
  },
  {
    id: "GEM-002",
    field: "SPORTS",
    title: "Player Performance Analytics",
    titleKr: "KBO 선수 성적 예측",
    description:
      "KBO 리그 5시즌 타격 데이터를 시계열 분석하여 차기 시즌 OPS를 예측하는 모델 개발. ARIMA와 LSTM을 비교 실험하여 선수 컨디션 변화 패턴을 정량화.",
    tech: ["Python", "TensorFlow", "LSTM", "Statsmodels", "Seaborn"],
    status: "EXECUTED",
    accuracy: "87.6%",
  },
  {
    id: "GEM-003",
    field: "HEALTHCARE",
    title: "Medical Image Classification",
    titleKr: "흉부 X-ray 이미지 분류",
    description:
      "NIH Chest X-ray 데이터셋 10만 장을 활용하여 폐렴·결핵 등 14개 질환을 자동 분류하는 CNN 모델 구축. Transfer Learning(ResNet-50)으로 전문의 수준의 정확도 달성.",
    tech: ["Python", "PyTorch", "ResNet-50", "OpenCV", "NumPy"],
    status: "EXECUTED",
    accuracy: "91.8%",
  },
  {
    id: "GEM-004",
    field: "FINANCE",
    title: "Credit Risk Scoring",
    titleKr: "신용 리스크 스코어링",
    description:
      "금융 거래 데이터 50,000건의 피처 엔지니어링을 통해 대출 부도 확률을 예측하는 신용 평가 모델 개발. 랜덤 포레스트와 LightGBM의 스태킹 앙상블로 AUC 0.96 달성.",
    tech: ["Python", "LightGBM", "RandomForest", "SHAP", "Plotly"],
    status: "EXECUTED",
    accuracy: "96.1%",
  },
];

// =============================================================================
// Curriculum Steps
// =============================================================================

export const curriculumSteps = [
  { step: 1, title: "Python 기초", description: "변수, 반복문, 함수 — 코딩의 첫 번째 원석을 다듬다" },
  { step: 2, title: "데이터 정제", description: "Pandas · NumPy로 결측치와 노이즈를 제거하다" },
  { step: 3, title: "시각화", description: "Matplotlib · Seaborn으로 데이터에 형태를 부여하다" },
  { step: 4, title: "실전 ML 프로젝트", description: "팀 프로젝트로 인사이트를 세공하다" },
];

// =============================================================================
// External Links
// =============================================================================

export const links = {
  applyForm: "https://forms.gle/PMs8zMKMdKVJwCfC6",
};
