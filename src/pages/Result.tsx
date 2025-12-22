import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TestResult } from '../utils/scoring'
import { useStore } from '../store/useStore'
import { useTestSetStore } from '../store/useTestSetStore'
import VibeCard from '../components/result/VibeCard'
import TraitChart from '../components/result/TraitChart'
import Button from '../components/ui/Button'

export default function Result() {
  const navigate = useNavigate()
  const location = useLocation()
  const { reset, answers } = useStore()
  const { selectedSetId, testSets, questions } = useTestSetStore()
  const [result, setResult] = useState<TestResult | null>(null)
  const [shareMessage, setShareMessage] = useState('')

  useEffect(() => {
    // Check if all questions are answered
    const totalAnswered = Object.keys(answers).length
    const allAnswered = totalAnswered === questions.length

    if (!allAnswered && questions.length > 0) {
      navigate('/test')
      return
    }

    const stateResult = location.state?.result
    if (stateResult) {
      setResult(stateResult)
    } else if (selectedSetId) {
      try {
        const historyKey = `vibedeck.history.${selectedSetId}`
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]')
        if (history.length > 0) {
          setResult(history[0])
        } else {
          navigate('/')
        }
      } catch {
        navigate('/')
      }
    } else {
      navigate('/')
    }
  }, [location.state, selectedSetId, navigate, answers, questions.length])

  const handleRestart = () => {
    reset()
    navigate('/test')
  }

  const handleHome = () => {
    reset()
    navigate('/')
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setShareMessage('링크가 복사되었습니다! 🎉')
      setTimeout(() => setShareMessage(''), 3000)
    } catch {
      setShareMessage('링크 복사에 실패했습니다.')
      setTimeout(() => setShareMessage(''), 3000)
    }
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-600">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  const currentTestSet = testSets.find(set => set.id === result.setId)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          {currentTestSet?.title || '테스트'} 결과
        </div>
        <h1 className="text-display mb-4">
          당신의 VibeDeck 결과
        </h1>
        <p className="text-body">
          {new Date(result.timestamp).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })} 측정
        </p>
      </motion.div>

      {/* Result Template */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="dreamy-card p-8 mb-12"
      >
        <div className="text-center">
          <h2 className="text-heading mb-4">
            {result.resultTemplate.title}
          </h2>
          <p className="text-body leading-relaxed mb-6 max-w-3xl mx-auto">
            {result.resultTemplate.summary}
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-2xl">
            <span className="font-medium">주요 특성: {result.topTrait}</span>
            {result.secondTrait && (
              <span className="ml-2 text-purple-500">+ {result.secondTrait}</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <VibeCard 
          {...result.mainCard}
          isPrimary={true}
          delay={0.3}
        />
        {result.secondaryCard && (
          <VibeCard 
            {...result.secondaryCard}
            delay={0.4}
          />
        )}
      </div>

      {/* Chart */}
      <TraitChart scores={result.scores} />

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12"
      >
        {shareMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-green-600 font-medium"
          >
            {shareMessage}
          </motion.div>
        )}
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={handleShare}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <span>🔗</span>
            결과 공유하기
          </Button>
          
          <Button
            onClick={handleRestart}
            variant="ghost"
            className="flex items-center gap-2"
          >
            <span>🔄</span>
            다시 테스트하기
          </Button>

          <Button
            onClick={handleHome}
            className="flex items-center gap-2"
          >
            <span>🏠</span>
            다른 테스트 해보기
          </Button>
        </div>
      </motion.div>

      {/* Tips Section */}
      {result.resultTemplate.tips && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16 glass-card p-8"
        >
          <h3 className="text-heading text-center mb-8">
            💡 당신을 위한 성장 팁
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {result.resultTemplate.tips.map((tip: string, index: number) => (
              <div key={index} className="bg-white/70 rounded-2xl p-6 shadow-soft">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3">
                  {index + 1}
                </div>
                <p className="text-body leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
