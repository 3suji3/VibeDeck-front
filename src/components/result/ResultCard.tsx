import { motion } from 'framer-motion'
import { Card } from '../../types'

interface ResultCardProps {
  card: Card
  isPrimary?: boolean
  delay?: number
}

export default function ResultCard({ card, isPrimary = false, delay = 0 }: ResultCardProps) {
  const getGradientClass = (image: string) => {
    const gradients: Record<string, string> = {
      'gradient-sunset': 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600',
      'gradient-aurora': 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-600',
      'gradient-warm': 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
      'gradient-neon': 'bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-600',
      'gradient-cosmic': 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500',
      'gradient-adventure': 'bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600',
      'gradient-mountain': 'bg-gradient-to-br from-slate-400 via-gray-600 to-slate-800',
      'gradient-earth': 'bg-gradient-to-br from-amber-600 via-orange-700 to-red-800',
      'gradient-rainbow': 'bg-gradient-to-br from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400',
      'gradient-golden': 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600',
      'gradient-crystal': 'bg-gradient-to-br from-blue-200 via-indigo-400 to-purple-600',
      'gradient-steel': 'bg-gradient-to-br from-gray-400 via-slate-600 to-gray-800',
      'gradient-symphony': 'bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500',
      'gradient-future': 'bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-700'
    }
    return gradients[image] || 'bg-gradient-to-br from-purple-400 to-pink-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
        isPrimary ? 'ring-2 ring-purple-200' : ''
      }`}
    >
      {/* Card Image/Gradient */}
      <div className={`h-32 ${getGradientClass(card.image || 'gradient-sunset')} relative`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className={`font-bold text-white ${isPrimary ? 'text-xl' : 'text-lg'}`}>
            {card.title}
          </h3>
        </div>
        {isPrimary && (
          <div className="absolute top-4 right-4">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              주 카드
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        <p className="text-gray-600 leading-relaxed mb-4">
          {card.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {card.traits.map((trait) => (
            <span
              key={trait}
              className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}