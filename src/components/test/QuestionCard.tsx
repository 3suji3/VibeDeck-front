import { motion } from 'framer-motion'
import { Question } from '../../types'

interface QuestionCardProps {
  question: Question
  selectedOption: string | undefined
  onOptionSelect: (optionId: string) => void
}

export default function QuestionCard({ question, selectedOption, onOptionSelect }: QuestionCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent, optionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOptionSelect(optionId)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-8 shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center leading-relaxed">
        {question.text}
      </h2>

      <div className="space-y-4">
        {question.options.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`relative cursor-pointer rounded-xl border-2 transition-all duration-200 ${
              selectedOption === option.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
            }`}
            onClick={() => onOptionSelect(option.id)}
            onKeyDown={(e) => handleKeyDown(e, option.id)}
            tabIndex={0}
            role="radio"
            aria-checked={selectedOption === option.id}
            aria-label={option.text}
          >
            <div className="flex items-center p-4">
              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 ${
                selectedOption === option.id
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-gray-300'
              }`}>
                {selectedOption === option.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 bg-white rounded-full m-0.5"
                  />
                )}
              </div>
              <span className={`text-lg ${
                selectedOption === option.id ? 'text-purple-700 font-medium' : 'text-gray-700'
              }`}>
                {option.text}
              </span>
            </div>
            
            {/* Focus indicator */}
            <div className="absolute inset-0 rounded-xl ring-2 ring-purple-500 ring-opacity-0 focus-within:ring-opacity-50 transition-all" />
          </motion.div>
        ))}
      </div>

      {!selectedOption && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-500 mt-6 text-sm"
        >
          답변을 선택해주세요
        </motion.p>
      )}
    </motion.div>
  )
}