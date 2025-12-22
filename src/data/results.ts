import { ResultTemplate } from '../types';

export const results: ResultTemplate[] = [
  // Emotion (2개)
  {
    id: 'emotion_high',
    name: '감성의 예술가',
    description: '당신은 풍부한 감성과 뛰어난 공감 능력을 가진 사람입니다. 타인의 감정을 잘 이해하고, 자신의 감정을 솔직하게 표현하는 것을 두려워하지 않습니다.',
    traits: ['emotion'],
    minScore: 70,
    maxScore: 100,
    color: '#FF6B6B',
    image: 'emotion-artist'
  },
  {
    id: 'emotion_moderate',
    name: '따뜻한 공감자',
    description: '당신은 감정적인 면과 이성적인 면의 균형을 잘 맞추는 사람입니다. 상황에 따라 감성적으로 접근하거나 논리적으로 판단할 수 있습니다.',
    traits: ['emotion'],
    minScore: 40,
    maxScore: 69,
    color: '#FF8E8E',
    image: 'emotion-balanced'
  },
  
  // Creativity (2개)
  {
    id: 'creativity_high',
    name: '혁신의 개척자',
    description: '당신은 창의적이고 독창적인 아이디어로 가득한 사람입니다. 기존의 틀을 벗어나 새로운 방식을 시도하는 것을 즐기며, 상상력이 풍부합니다.',
    traits: ['creativity'],
    minScore: 70,
    maxScore: 100,
    color: '#4ECDC4',
    image: 'creativity-innovator'
  },
  {
    id: 'creativity_moderate',
    name: '유연한 사고가',
    description: '당신은 필요에 따라 창의적인 접근과 체계적인 방법을 모두 활용할 수 있는 사람입니다. 상황에 맞는 최적의 해결책을 찾아냅니다.',
    traits: ['creativity'],
    minScore: 40,
    maxScore: 69,
    color: '#6FD9D1',
    image: 'creativity-flexible'
  },
  
  // Stability (2개)
  {
    id: 'stability_high',
    name: '신뢰의 기둥',
    description: '당신은 일관성 있고 안정적인 사람입니다. 계획을 세우고 그것을 착실히 실행하며, 주변 사람들에게 믿음직한 존재로 인식됩니다.',
    traits: ['stability'],
    minScore: 70,
    maxScore: 100,
    color: '#45B7D1',
    image: 'stability-pillar'
  },
  {
    id: 'stability_moderate',
    name: '균형잡힌 실행가',
    description: '당신은 안정성과 유연성의 균형을 잘 맞추는 사람입니다. 계획을 세우되 상황에 따라 조정할 수 있는 능력을 가지고 있습니다.',
    traits: ['stability'],
    minScore: 40,
    maxScore: 69,
    color: '#6BC5DB',
    image: 'stability-balanced'
  },
  
  // Social (2개)
  {
    id: 'social_high',
    name: '소통의 달인',
    description: '당신은 뛰어난 대인관계 능력을 가진 사람입니다. 사람들과 어울리는 것을 즐기며, 자연스럽게 분위기를 이끌어가는 능력이 있습니다.',
    traits: ['social'],
    minScore: 70,
    maxScore: 100,
    color: '#96CEB4',
    image: 'social-master'
  },
  {
    id: 'social_moderate',
    name: '조화로운 중재자',
    description: '당신은 사람들과의 관계를 중요하게 생각하면서도 혼자만의 시간도 필요로 하는 사람입니다. 상황에 맞게 사교적이거나 독립적일 수 있습니다.',
    traits: ['social'],
    minScore: 40,
    maxScore: 69,
    color: '#ACD9C4',
    image: 'social-mediator'
  },
  
  // Logic (2개)
  {
    id: 'logic_high',
    name: '분석의 전문가',
    description: '당신은 논리적이고 분석적인 사고를 가진 사람입니다. 데이터와 사실을 기반으로 판단하며, 합리적인 결정을 내리는 것을 중요하게 생각합니다.',
    traits: ['logic'],
    minScore: 70,
    maxScore: 100,
    color: '#FFEAA7',
    image: 'logic-analyst'
  },
  {
    id: 'logic_moderate',
    name: '합리적 판단자',
    description: '당신은 논리와 감성의 균형을 잘 맞추는 사람입니다. 상황에 따라 이성적으로 분석하거나 직관을 따를 수 있는 유연성을 가지고 있습니다.',
    traits: ['logic'],
    minScore: 40,
    maxScore: 69,
    color: '#FFF0C1',
    image: 'logic-balanced'
  }
];