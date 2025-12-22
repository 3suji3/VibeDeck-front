import { Card } from '../types';

export const cards: Card[] = [
  // Emotion Cards (3개)
  {
    id: 'emotion_artist',
    title: '감성의 화가',
    description: '마음의 색깔을 캔버스에 담아내는 예술가',
    category: 'emotion',
    traits: ['emotion'],
    image: 'gradient-sunset'
  },
  {
    id: 'emotion_poet',
    title: '마음의 시인',
    description: '감정을 아름다운 언어로 표현하는 낭만가',
    category: 'emotion',
    traits: ['emotion'],
    image: 'gradient-aurora'
  },
  {
    id: 'emotion_healer',
    title: '치유의 손길',
    description: '타인의 아픔을 어루만지는 따뜻한 마음',
    category: 'emotion',
    traits: ['emotion'],
    image: 'gradient-warm'
  },
  
  // Creativity Cards (3개)
  {
    id: 'creativity_inventor',
    title: '미래의 발명가',
    description: '상상을 현실로 만들어내는 혁신가',
    category: 'creativity',
    traits: ['creativity'],
    image: 'gradient-neon'
  },
  {
    id: 'creativity_dreamer',
    title: '꿈꾸는 몽상가',
    description: '무한한 가능성을 그려내는 상상력의 소유자',
    category: 'creativity',
    traits: ['creativity'],
    image: 'gradient-cosmic'
  },
  {
    id: 'creativity_explorer',
    title: '새로운 탐험가',
    description: '미지의 영역을 개척하는 모험가',
    category: 'creativity',
    traits: ['creativity'],
    image: 'gradient-adventure'
  },
  
  // Stability Cards (2개)
  {
    id: 'stability_guardian',
    title: '든든한 수호자',
    description: '변하지 않는 믿음으로 지켜주는 보호자',
    category: 'stability',
    traits: ['stability'],
    image: 'gradient-mountain'
  },
  {
    id: 'stability_builder',
    title: '견고한 건축가',
    description: '단단한 기초 위에 미래를 세우는 설계자',
    category: 'stability',
    traits: ['stability'],
    image: 'gradient-earth'
  },
  
  // Social Cards (2개)
  {
    id: 'social_connector',
    title: '마음의 다리',
    description: '사람과 사람을 이어주는 소통의 전문가',
    category: 'social',
    traits: ['social'],
    image: 'gradient-rainbow'
  },
  {
    id: 'social_leader',
    title: '카리스마 리더',
    description: '자연스럽게 사람들을 이끄는 타고난 지도자',
    category: 'social',
    traits: ['social'],
    image: 'gradient-golden'
  },
  
  // Logic Cards (2개)
  {
    id: 'logic_scientist',
    title: '진리의 탐구자',
    description: '논리와 분석으로 세상을 이해하는 과학자',
    category: 'logic',
    traits: ['logic'],
    image: 'gradient-crystal'
  },
  {
    id: 'logic_strategist',
    title: '전략의 마스터',
    description: '치밀한 계획으로 승리를 이끄는 전략가',
    category: 'logic',
    traits: ['logic'],
    image: 'gradient-steel'
  },
  
  // Mixed Cards (복합 특성, 2개)
  {
    id: 'mixed_harmony',
    title: '조화의 마에스트로',
    description: '서로 다른 요소들을 아름답게 조화시키는 지휘자',
    category: 'mixed',
    traits: ['emotion', 'social'],
    image: 'gradient-symphony'
  },
  {
    id: 'mixed_visionary',
    title: '미래의 비전가',
    description: '창의성과 논리를 결합해 새로운 길을 제시하는 선구자',
    category: 'mixed',
    traits: ['creativity', 'logic'],
    image: 'gradient-future'
  }
];