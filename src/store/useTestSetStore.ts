import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TestSet {
  id: string
  title: string
  subtitle: string
  coverTheme: string
  description: string
  tags: string[]
  questionCount: number
}

interface TestSetStore {
  testSets: TestSet[]
  selectedSetId: string | null
  questions: any[]
  results: any[]
  cards: any[]
  isLoaded: boolean
  
  selectSet: (setId: string) => void
  loadSetData: (setId: string) => Promise<void>
  clearSelection: () => void
  initializeTestSets: () => void
}

const defaultTestSets: TestSet[] = [
  {
    id: "personality",
    title: "성향 테스트",
    subtitle: "당신의 진짜 성향을 발견하세요",
    coverTheme: "cosmic",
    description: "5가지 핵심 특성을 통해 당신만의 독특한 성향을 분석합니다. 감정, 창의성, 안정성, 사회성, 논리성의 균형을 확인해보세요.",
    tags: ["성격", "특성", "자아분석"],
    questionCount: 12
  },
  {
    id: "love",
    title: "연애 성향",
    subtitle: "사랑에서의 당신은 어떤 모습인가요?",
    coverTheme: "sunset",
    description: "연인과의 관계에서 나타나는 당신의 모습을 분석합니다. 애정표현, 소통방식, 갈등해결 등 연애의 다양한 면을 살펴보세요.",
    tags: ["연애", "관계", "사랑"],
    questionCount: 15
  },
  {
    id: "character",
    title: "성격 유형",
    subtitle: "나는 어떤 사람일까?",
    coverTheme: "rainbow",
    description: "일상생활에서 드러나는 성격적 특징을 종합적으로 분석합니다. 내향성, 외향성, 감정처리 방식 등을 파악해보세요.",
    tags: ["성격", "유형", "심리"],
    questionCount: 18
  },
  {
    id: "friendship",
    title: "우정 스타일",
    subtitle: "친구들과의 관계에서 나는?",
    coverTheme: "golden",
    description: "친구관계에서 보이는 당신의 모습을 분석합니다. 우정을 쌓는 방식, 친구에게 주는 에너지, 갈등 상황 대처법을 알아보세요.",
    tags: ["우정", "친구", "인간관계"],
    questionCount: 10
  }
]

export const useTestSetStore = create<TestSetStore>()(
  persist(
    (set, get) => ({
      testSets: defaultTestSets,
      selectedSetId: null,
      questions: [],
      results: [],
      cards: [],
      isLoaded: false,
      
      initializeTestSets: () => {
        set({ testSets: defaultTestSets })
      },
      
      selectSet: (setId: string) => {
        set({ selectedSetId: setId })
        get().loadSetData(setId)
      },
      
      loadSetData: async (setId: string) => {
        try {
          // localStorage에서 먼저 시도
          const storedQuestions = localStorage.getItem(`vibedeck.set.${setId}.questions`)
          const storedResults = localStorage.getItem(`vibedeck.set.${setId}.results`)
          const storedCards = localStorage.getItem(`vibedeck.set.${setId}.cards`)
          
          let questions, results, cards
          
          if (storedQuestions && storedResults && storedCards) {
            questions = JSON.parse(storedQuestions)
            results = JSON.parse(storedResults)
            cards = JSON.parse(storedCards)
          } else {
            // fallback to default data
            const defaultData = getDefaultSetData(setId)
            questions = defaultData.questions
            results = defaultData.results
            cards = defaultData.cards
          }
          
          set({
            questions,
            results,
            cards,
            isLoaded: true
          })
        } catch (error) {
          console.error(`Failed to load test set ${setId}:`, error)
          set({ isLoaded: false })
        }
      },
      
      clearSelection: () => {
        set({
          selectedSetId: null,
          questions: [],
          results: [],
          cards: [],
          isLoaded: false
        })
      }
    }),
    {
      name: 'test-set-storage',
      partialize: (state) => ({ selectedSetId: state.selectedSetId })
    }
  )
)

function getDefaultSetData(setId: string) {
  const defaultSets: Record<string, any> = {
    personality: {
      questions: [
        {
          id: "q1",
          text: "새로운 사람들과 만날 때 당신은?",
          category: "social",
          options: [
            {
              id: "q1_1",
              text: "먼저 다가가서 대화를 시작한다",
              traits: { social: 3, emotion: 1 }
            },
            {
              id: "q1_2", 
              text: "상대방이 먼저 말을 걸기를 기다린다",
              traits: { stability: 2, logic: 1 }
            },
            {
              id: "q1_3",
              text: "자연스럽게 대화에 참여한다",
              traits: { social: 2, creativity: 1 }
            },
            {
              id: "q1_4",
              text: "조용히 관찰하며 분위기를 파악한다",
              traits: { logic: 2, stability: 1 }
            }
          ]
        }
      ],
      results: [
        {
          id: "emotion_high",
          title: "감성의 예술가",
          summary: "당신은 풍부한 감성과 뛰어난 공감 능력을 가진 사람입니다. 타인의 감정을 잘 이해하고, 자신의 감정을 솔직하게 표현하는 것을 두려워하지 않습니다.",
          tips: [
            "감정 일기를 써보며 내면의 목소리에 귀 기울여보세요",
            "예술 활동이나 창작을 통해 감정을 표현해보세요",
            "타인과의 깊은 대화를 통해 공감 능력을 더욱 발전시켜보세요"
          ],
          traits: ["emotion"],
          minScore: 70,
          maxScore: 100,
          color: "#FF6B6B"
        }
      ],
      cards: [
        {
          id: "emotion_artist",
          name: "감성의 화가",
          traitTag: "emotion",
          subtitle: "마음의 색깔을 캔버스에 담아내는 예술가",
          theme: "sunset",
          symbol: "🎨"
        }
      ]
    },
    love: {
      questions: [
        {
          id: "l1",
          text: "연인과 데이트할 때 당신은?",
          category: "dating",
          options: [
            {
              id: "l1_1",
              text: "미리 계획을 세워서 완벽한 데이트를 준비한다",
              traits: { planning: 3, caring: 2 }
            },
            {
              id: "l1_2",
              text: "그때그때 분위기에 맞춰 즉흥적으로 즐긴다",
              traits: { spontaneous: 3, playful: 2 }
            },
            {
              id: "l1_3",
              text: "연인이 좋아할 만한 것을 우선 생각한다",
              traits: { caring: 3, empathy: 1 }
            },
            {
              id: "l1_4",
              text: "둘 다 편안하게 즐길 수 있는 것을 선택한다",
              traits: { balance: 2, harmony: 2 }
            }
          ]
        }
      ],
      results: [
        {
          id: "caring_lover",
          title: "배려하는 연인",
          summary: "당신은 상대방을 깊이 생각하고 배려하는 연애 스타일을 가지고 있습니다. 연인의 행복을 위해 노력하며, 세심한 관심과 사랑을 표현합니다.",
          tips: [
            "자신의 감정도 솔직하게 표현해보세요",
            "때로는 즉흥적인 로맨스도 시도해보세요",
            "연인과의 소통 시간을 더 늘려보세요"
          ],
          traits: ["caring"],
          minScore: 70,
          maxScore: 100,
          color: "#FF69B4"
        }
      ],
      cards: [
        {
          id: "caring_heart",
          name: "따뜻한 마음",
          traitTag: "caring",
          subtitle: "상대방을 향한 깊은 배려와 사랑",
          theme: "sunset",
          symbol: "💕"
        }
      ]
    },
    character: {
      questions: [
        {
          id: "c1",
          text: "파티에서 당신의 모습은?",
          category: "social_behavior",
          options: [
            {
              id: "c1_1",
              text: "많은 사람들과 활발하게 대화한다",
              traits: { extrovert: 3, energetic: 2 }
            },
            {
              id: "c1_2",
              text: "친한 몇 명과 깊은 대화를 나눈다",
              traits: { introvert: 2, deep: 3 }
            },
            {
              id: "c1_3",
              text: "분위기를 관찰하며 적절히 참여한다",
              traits: { observer: 3, adaptive: 2 }
            },
            {
              id: "c1_4",
              text: "조용한 곳에서 휴식을 취한다",
              traits: { introvert: 3, peaceful: 2 }
            }
          ]
        }
      ],
      results: [
        {
          id: "extrovert_leader",
          title: "활발한 리더",
          summary: "당신은 에너지가 넘치고 사람들과 함께하는 것을 즐기는 성격입니다. 자연스럽게 리더십을 발휘하며, 주변 사람들에게 긍정적인 영향을 미칩니다.",
          tips: [
            "혼자만의 시간도 가져보세요",
            "다른 사람의 의견에도 귀 기울여보세요",
            "때로는 뒤에서 지원하는 역할도 해보세요"
          ],
          traits: ["extrovert"],
          minScore: 70,
          maxScore: 100,
          color: "#FFD700"
        }
      ],
      cards: [
        {
          id: "leader_star",
          name: "빛나는 리더",
          traitTag: "extrovert",
          subtitle: "사람들을 이끄는 카리스마와 에너지",
          theme: "golden",
          symbol: "⭐"
        }
      ]
    },
    friendship: {
      questions: [
        {
          id: "f1",
          text: "친구가 힘들어할 때 당신은?",
          category: "support",
          options: [
            {
              id: "f1_1",
              text: "바로 달려가서 위로해준다",
              traits: { supportive: 3, empathetic: 2 }
            },
            {
              id: "f1_2",
              text: "실용적인 해결책을 제시한다",
              traits: { practical: 3, helpful: 2 }
            },
            {
              id: "f1_3",
              text: "조용히 곁에서 들어준다",
              traits: { listener: 3, calm: 2 }
            },
            {
              id: "f1_4",
              text: "재미있는 일로 기분을 전환시켜준다",
              traits: { cheerful: 3, positive: 2 }
            }
          ]
        }
      ],
      results: [
        {
          id: "supportive_friend",
          title: "든든한 지지자",
          summary: "당신은 친구들에게 든든한 버팀목이 되어주는 우정 스타일을 가지고 있습니다. 어려운 상황에서도 변함없이 곁에 있어주며, 진심어린 지지를 보내줍니다.",
          tips: [
            "자신의 고민도 친구들과 나눠보세요",
            "때로는 가벼운 농담으로 분위기를 바꿔보세요",
            "친구들과의 즐거운 추억도 많이 만들어보세요"
          ],
          traits: ["supportive"],
          minScore: 70,
          maxScore: 100,
          color: "#32CD32"
        }
      ],
      cards: [
        {
          id: "support_pillar",
          name: "든든한 기둥",
          traitTag: "supportive",
          subtitle: "친구들의 든든한 버팀목",
          theme: "mountain",
          symbol: "🤝"
        }
      ]
    }
  }
  
  return defaultSets[setId] || defaultSets.personality
}
