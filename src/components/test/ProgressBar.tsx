import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
        <span className="font-medium">질문 {current} / {total}</span>
        <span className="text-purple-600 font-semibold">{Math.round(progress)}%</span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 1 
              }}
            />
          </motion.div>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: total }, (_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index < current 
                  ? 'bg-purple-500' 
                  : index === current - 1
                  ? 'bg-purple-300'
                  : 'bg-gray-300'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: index === current - 1 ? 1.2 : 1,
                backgroundColor: index < current 
                  ? '#8B5CF6' 
                  : index === current - 1
                  ? '#A78BFA'
                  : '#D1D5DB'
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}