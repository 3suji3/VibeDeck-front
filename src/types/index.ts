// 성격 특성 타입
export interface Trait {
  id: string;
  name: string;
  description: string;
  color: string;
}

// 질문 옵션 타입
export interface Option {
  id: string;
  text: string;
  traits: Record<string, number>; // traitId -> score
}

// 질문 타입
export interface Question {
  id: string;
  text: string;
  category: string;
  options: Option[];
}

// 결과 템플릿 타입
export interface ResultTemplate {
  id: string;
  name: string;
  description: string;
  traits: string[]; // trait ids
  minScore: number;
  maxScore: number;
  image?: string;
  color: string;
}

// 카드 타입
export interface Card {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  traits: string[]; // trait ids
}

// 히스토리 아이템 타입
export interface HistoryItem {
  id: string;
  timestamp: number;
  answers: Record<string, string>; // questionId -> optionId
  result: ResultTemplate;
  traits: Record<string, number>; // traitId -> score
}