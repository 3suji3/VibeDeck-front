import { Question } from '../types';

export const questions: Question[] = [
  // Choice Questions (8개)
  {
    id: 'q1',
    text: '새로운 사람들과 만날 때 당신은?',
    category: 'social',
    options: [
      {
        id: 'q1_1',
        text: '먼저 다가가서 대화를 시작한다',
        traits: { social: 3, emotion: 1 }
      },
      {
        id: 'q1_2', 
        text: '상대방이 먼저 말을 걸기를 기다린다',
        traits: { stability: 2, logic: 1 }
      },
      {
        id: 'q1_3',
        text: '자연스럽게 대화에 참여한다',
        traits: { social: 2, creativity: 1 }
      },
      {
        id: 'q1_4',
        text: '조용히 관찰하며 분위기를 파악한다',
        traits: { logic: 2, stability: 1 }
      }
    ]
  },
  {
    id: 'q2',
    text: '계획을 세울 때 당신은?',
    category: 'planning',
    options: [
      {
        id: 'q2_1',
        text: '세밀하게 모든 것을 준비한다',
        traits: { stability: 3, logic: 2 }
      },
      {
        id: 'q2_2',
        text: '큰 틀만 정하고 즉흥적으로 진행한다',
        traits: { creativity: 3, emotion: 1 }
      },
      {
        id: 'q2_3',
        text: '상황에 따라 유연하게 조정한다',
        traits: { social: 1, logic: 1, stability: 1 }
      },
      {
        id: 'q2_4',
        text: '직감을 믿고 흐름에 맡긴다',
        traits: { emotion: 2, creativity: 2 }
      }
    ]
  },
  {
    id: 'q3',
    text: '스트레스를 받을 때 당신은?',
    category: 'stress',
    options: [
      {
        id: 'q3_1',
        text: '혼자만의 시간을 가지며 정리한다',
        traits: { stability: 2, logic: 2 }
      },
      {
        id: 'q3_2',
        text: '친구들과 이야기하며 해결한다',
        traits: { social: 3, emotion: 2 }
      },
      {
        id: 'q3_3',
        text: '운동이나 취미활동으로 풀어낸다',
        traits: { creativity: 2, stability: 1 }
      },
      {
        id: 'q3_4',
        text: '감정을 솔직하게 표현한다',
        traits: { emotion: 3, social: 1 }
      }
    ]
  },
  {
    id: 'q4',
    text: '문제를 해결할 때 당신은?',
    category: 'problem_solving',
    options: [
      {
        id: 'q4_1',
        text: '데이터와 사실을 기반으로 분석한다',
        traits: { logic: 3, stability: 1 }
      },
      {
        id: 'q4_2',
        text: '직감과 감으로 판단한다',
        traits: { emotion: 2, creativity: 2 }
      },
      {
        id: 'q4_3',
        text: '여러 사람의 의견을 듣고 결정한다',
        traits: { social: 3, emotion: 1 }
      },
      {
        id: 'q4_4',
        text: '창의적인 해결책을 찾아본다',
        traits: { creativity: 3, logic: 1 }
      }
    ]
  },
  {
    id: 'q5',
    text: '새로운 아이디어를 떠올릴 때 당신은?',
    category: 'creativity',
    options: [
      {
        id: 'q5_1',
        text: '기존 방식을 개선하는 방향으로 생각한다',
        traits: { logic: 2, stability: 2 }
      },
      {
        id: 'q5_2',
        text: '완전히 새로운 접근을 시도한다',
        traits: { creativity: 3, emotion: 1 }
      },
      {
        id: 'q5_3',
        text: '다른 사람들과 브레인스토밍한다',
        traits: { social: 2, creativity: 2 }
      },
      {
        id: 'q5_4',
        text: '혼자 깊이 생각하며 영감을 기다린다',
        traits: { emotion: 2, creativity: 1, stability: 1 }
      }
    ]
  },
  {
    id: 'q6',
    text: '중요한 결정을 내릴 때 당신은?',
    category: 'decision',
    options: [
      {
        id: 'q6_1',
        text: '충분히 고민한 후 신중하게 결정한다',
        traits: { stability: 3, logic: 2 }
      },
      {
        id: 'q6_2',
        text: '마음이 이끄는 대로 빠르게 결정한다',
        traits: { emotion: 3, creativity: 1 }
      },
      {
        id: 'q6_3',
        text: '주변 사람들의 조언을 구한다',
        traits: { social: 3, stability: 1 }
      },
      {
        id: 'q6_4',
        text: '장단점을 분석해서 합리적으로 판단한다',
        traits: { logic: 3, stability: 1 }
      }
    ]
  },
  {
    id: 'q7',
    text: '여가 시간을 보낼 때 당신은?',
    category: 'leisure',
    options: [
      {
        id: 'q7_1',
        text: '혼자 조용히 책을 읽거나 영화를 본다',
        traits: { stability: 2, emotion: 1 }
      },
      {
        id: 'q7_2',
        text: '친구들과 함께 활동적으로 놀러 간다',
        traits: { social: 3, creativity: 1 }
      },
      {
        id: 'q7_3',
        text: '새로운 취미나 활동을 시도한다',
        traits: { creativity: 3, logic: 1 }
      },
      {
        id: 'q7_4',
        text: '감성적인 활동(음악, 예술)을 즐긴다',
        traits: { emotion: 3, creativity: 1 }
      }
    ]
  },
  {
    id: 'q8',
    text: '프로젝트를 진행할 때 당신은?',
    category: 'work',
    options: [
      {
        id: 'q8_1',
        text: '체계적인 계획을 세우고 단계별로 진행한다',
        traits: { logic: 3, stability: 2 }
      },
      {
        id: 'q8_2',
        text: '흐름에 따라 유연하게 대응한다',
        traits: { creativity: 2, emotion: 2 }
      },
      {
        id: 'q8_3',
        text: '팀원들과 협력하며 함께 진행한다',
        traits: { social: 3, emotion: 1 }
      },
      {
        id: 'q8_4',
        text: '독창적인 방법으로 차별화를 시도한다',
        traits: { creativity: 3, logic: 1 }
      }
    ]
  },
  
  // Likert Questions (4개) - 5점 척도
  {
    id: 'q9',
    text: '나는 감정 표현을 자유롭게 하는 편이다',
    category: 'emotion_expression',
    options: [
      { id: 'q9_1', text: '전혀 그렇지 않다', traits: { stability: 2, logic: 1 } },
      { id: 'q9_2', text: '그렇지 않다', traits: { stability: 1 } },
      { id: 'q9_3', text: '보통이다', traits: {} },
      { id: 'q9_4', text: '그렇다', traits: { emotion: 1, social: 1 } },
      { id: 'q9_5', text: '매우 그렇다', traits: { emotion: 3, social: 1 } }
    ]
  },
  {
    id: 'q10',
    text: '나는 새로운 것을 시도하는 것을 좋아한다',
    category: 'novelty',
    options: [
      { id: 'q10_1', text: '전혀 그렇지 않다', traits: { stability: 3 } },
      { id: 'q10_2', text: '그렇지 않다', traits: { stability: 2 } },
      { id: 'q10_3', text: '보통이다', traits: { stability: 1 } },
      { id: 'q10_4', text: '그렇다', traits: { creativity: 2 } },
      { id: 'q10_5', text: '매우 그렇다', traits: { creativity: 3, emotion: 1 } }
    ]
  },
  {
    id: 'q11',
    text: '나는 논리적으로 생각하고 분석하는 것을 선호한다',
    category: 'logical_thinking',
    options: [
      { id: 'q11_1', text: '전혀 그렇지 않다', traits: { emotion: 2, creativity: 1 } },
      { id: 'q11_2', text: '그렇지 않다', traits: { emotion: 1 } },
      { id: 'q11_3', text: '보통이다', traits: {} },
      { id: 'q11_4', text: '그렇다', traits: { logic: 2, stability: 1 } },
      { id: 'q11_5', text: '매우 그렇다', traits: { logic: 3, stability: 1 } }
    ]
  },
  {
    id: 'q12',
    text: '나는 사람들과 어울리는 것이 즐겁다',
    category: 'social_preference',
    options: [
      { id: 'q12_1', text: '전혀 그렇지 않다', traits: { stability: 2 } },
      { id: 'q12_2', text: '그렇지 않다', traits: { stability: 1 } },
      { id: 'q12_3', text: '보통이다', traits: {} },
      { id: 'q12_4', text: '그렇다', traits: { social: 2, emotion: 1 } },
      { id: 'q12_5', text: '매우 그렇다', traits: { social: 3, emotion: 1 } }
    ]
  }
];