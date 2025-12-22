import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTestSetStore } from '../store/useTestSetStore'
import TestSetCard from '../components/home/TestSetCard'
import Button from '../components/ui/Button'

export default function Home() {
  const navigate = useNavigate()
  const { testSets, selectSet } = useTestSetStore()

  const handleSetSelect = (setId: string) => {
    selectSet(setId)
    navigate('/test')
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative inline-block mb-8"
        >
          <h1 className="text-display mb-4">
            VibeDeck
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-subheading max-w-2xl mx-auto">
            당신만의 특별한 성향을 발견해보세요
          </p>
          <p className="text-body max-w-xl mx-auto">
            다양한 테스트 중에서 원하는 것을 선택하고, 
            숨겨진 매력과 특성을 찾아보세요
          </p>
        </motion.div>
      </motion.div>

      {/* Test Sets Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid md:grid-cols-2 gap-8 mb-16"
      >
        {testSets.map((testSet, index) => (
          <TestSetCard
            key={testSet.id}
            {...testSet}
            onSelect={handleSetSelect}
            delay={0.8 + index * 0.1}
          />
        ))}
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="glass-card p-8 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🎯</span>
          <h3 className="text-heading text-xl">어떤 테스트를 선택해야 할까요?</h3>
        </div>
        <p className="text-body max-w-2xl mx-auto mb-6">
          각 테스트는 약 3-5분 소요되며, 언제든지 다른 테스트도 시도해볼 수 있습니다. 
          결과는 자동으로 저장되어 언제든 다시 확인할 수 있어요.
        </p>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin')}
          className="text-sm"
        >
          관리자 페이지
        </Button>
      </motion.div>
    </div>
  )
}
