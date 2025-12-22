export const TRAITS = ['emotion', 'creativity', 'stability', 'social', 'logic'] as const;

export type TraitId = typeof TRAITS[number];

export const traitInfo: Record<TraitId, { name: string; description: string; color: string }> = {
  emotion: {
    name: '감정',
    description: '감성과 공감 능력',
    color: '#FF6B6B'
  },
  creativity: {
    name: '창의성',
    description: '상상력과 혁신적 사고',
    color: '#4ECDC4'
  },
  stability: {
    name: '안정성',
    description: '일관성과 신뢰성',
    color: '#45B7D1'
  },
  social: {
    name: '사회성',
    description: '대인관계와 소통',
    color: '#96CEB4'
  },
  logic: {
    name: '논리성',
    description: '분석적 사고와 합리성',
    color: '#FFEAA7'
  }
};