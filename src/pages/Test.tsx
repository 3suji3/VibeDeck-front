import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { useTestSetStore } from '../store/useTestSetStore'
import { calculateResult, saveResult } from '../utils/scoring'
import QuestionCard from '../components/test/QuestionCard'
import ProgressBar from '../components/test/ProgressBar'
import Button from '../components/ui/Button'

export default function Test() {
  const navigate = useNavigate()
  const { step, answers, setAnswer, nextStep, prevStep } = useStore()
  const { selectedSetId, questions, isLoaded, loadSetData } = useTestSetStore()
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false)
  
  useEffect(() => {
    if (!selectedSetId) {
      navigate('/')
      return
    }
    
    if (selectedSetId && !isLoaded) {
      loadSetData(selectedSetId)
    }
  }, [selectedSetId, isLoaded, loadSetData, navigate])

  const currentQuestion = questions[step]
  const selectedOption = currentQuestion ? answers[currentQuestion.id] : undefined
  const isLastQuestion = step === questions.length - 1
  const totalAnswered = Object.keys(answers).length
  const allAnswered = totalAnswered === questions.length

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return
    setAnswer(currentQuestion.id, optionId)
    
    // Auto advance to next question after selection
    setTimeout(() => {
      if (!isLastQuestion) {
        nextStep()
      }
    }, 300)
  }

  const handleNext = async () => {
    if (!selectedOption || !selectedSetId) return

    if (isLastQuestion && allAnswered) {
      const result = calculateResult(answers, selectedSetId)
      saveResult(result, selectedSetId)
      navigate('/result', { state: { result } })
    } else if (isLastQuestion && !allAnswered) {
      setShowIncompleteWarning(true)
      setTimeout(() => setShowIncompleteWarning(false), 3000)
    } else {
      nextStep()
    }
  }

  const handlePrev = () => {
    if (step > 0) {
      prevStep()
    } else {
      navigate('/')
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Don't handle keyboard navigation if user is focused on form elements
    const target = event.target as HTMLElement
    if (target.matches('input, textarea, select, button, [role="radio"]')) {
      return
    }

    if (event.key === 'ArrowLeft' && step > 0) {
      event.preventDefault()
      prevStep()
    } else if (event.key === 'ArrowRight' && step < questions.length - 1) {
      event.preventDefault()
      nextStep()
    }
  }

  if (!selectedSetId || !isLoaded || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-600">질문을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-slate-600 mb-4">질문을 찾을 수 없습니다.</p>
          <Button onClick={() => navigate('/')}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="max-w-4xl mx-auto focus:outline-none" 
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <ProgressBar current={step + 1} total={questions.length} />

      {/* Progress status */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm">
          <span className="text-slate-600">답변 완료:</span>
          <span className="font-semibold text-purple-600">{totalAnswered}/{questions.length}</span>
          {!allAnswered && (
            <span className="text-orange-500 text-xs">• 모든 문항에 답해주세요</span>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut"
          }}
        >
          <QuestionCard
            question={currentQuestion}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
          />
        </motion.div>
      </AnimatePresence>

      {/* Warning message */}
      <AnimatePresence>
        {showIncompleteWarning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-orange-100 border border-orange-200 rounded-2xl text-center"
          >
            <p className="text-orange-700 font-medium">
              ⚠️ 모든 문항에 답변해야 결과를 확인할 수 있습니다
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center mt-8"
      >
        <Button
          onClick={handlePrev}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <span>←</span>
          {step === 0 ? '홈으로' : '이전'}
        </Button>

        <div className="flex items-center gap-4">
          <span className="text-caption hidden sm:block">
            키보드: ← → 화살표로 이동
          </span>
          
          <Button
            onClick={handleNext}
            disabled={isLastQuestion && !allAnswered}
            className="flex items-center gap-2 min-w-[140px]"
          >
            {isLastQuestion ? (
              <>
                결과 보기
                <span>✨</span>
              </>
            ) : (
              <>
                다음
                <span>→</span>
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="sr-only" aria-live="polite">
        {questions.length}개 질문 중 {step + 1}번째 질문입니다.
      </div>
    </div>
  )
}
