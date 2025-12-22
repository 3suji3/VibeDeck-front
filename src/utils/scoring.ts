export interface TestResult {
  scores: Record<string, number>
  topTrait: string
  secondTrait?: string
  resultTemplate: any
  mainCard: any
  secondaryCard?: any
  timestamp: number
  setId: string
}

export function calculateResult(answers: Record<string, string>, setId: string): TestResult {
  // 임시로 store에서 직접 가져오지 않고 파라미터로 받도록 수정
  const scores: Record<string, number> = {}

  // 기본 traits 설정
  const defaultTraits = ['emotion', 'creativity', 'stability', 'social', 'logic']
  defaultTraits.forEach(trait => {
    scores[trait] = Math.floor(Math.random() * 100)
  })

  // topTrait 계산
  const sortedTraits = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .map(([trait]) => trait)
  
  const topTrait = sortedTraits[0]
  const secondTrait = scores[sortedTraits[1]] > 30 ? sortedTraits[1] : undefined

  // 기본 결과 템플릿
  const resultTemplate = {
    id: `${topTrait}_high`,
    title: `${topTrait} 타입`,
    summary: `당신은 ${topTrait} 특성이 강한 사람입니다.`,
    tips: [
      "자신의 강점을 활용해보세요",
      "다른 특성도 함께 발전시켜보세요",
      "균형잡힌 성장을 추구해보세요"
    ],
    traits: [topTrait],
    minScore: 70,
    maxScore: 100,
    color: "#8B5CF6"
  }

  // 기본 카드
  const mainCard = {
    id: `${topTrait}_card`,
    name: `${topTrait} 카드`,
    traitTag: topTrait,
    subtitle: `당신의 ${topTrait} 특성`,
    theme: 'cosmic',
    symbol: '✨'
  }

  const result = {
    scores,
    topTrait,
    secondTrait,
    resultTemplate,
    mainCard,
    secondaryCard: undefined,
    timestamp: Date.now(),
    setId
  }

  return result
}

export function saveResult(result: TestResult, setId: string): void {
  try {
    const historyKey = `vibedeck.history.${setId}`
    const stored = localStorage.getItem(historyKey)
    const history = stored ? JSON.parse(stored) : []
    
    history.unshift({ ...result, createdAt: new Date().toISOString() })
    const trimmed = history.slice(0, 10)
    
    localStorage.setItem(historyKey, JSON.stringify(trimmed))
  } catch (error) {
    console.error('Failed to save result:', error)
  }
}
