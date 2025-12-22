import { motion } from 'framer-motion'

interface VibeCardProps {
  id: string
  name: string
  subtitle: string
  theme: string
  symbol: string
  imageUrl?: string
  isPrimary?: boolean
  delay?: number
}

const themeGradients: Record<string, string> = {
  sunset: 'from-orange-300 via-pink-400 to-purple-500',
  aurora: 'from-green-300 via-blue-400 to-purple-500',
  neon: 'from-cyan-300 via-purple-400 to-pink-500',
  cosmic: 'from-indigo-400 via-purple-500 to-pink-500',
  mountain: 'from-slate-300 via-gray-400 to-slate-600',
  earth: 'from-amber-400 via-orange-500 to-red-500',
  rainbow: 'from-pink-300 via-purple-400 via-blue-400 to-cyan-400',
  golden: 'from-yellow-300 via-amber-400 to-orange-500',
  crystal: 'from-blue-200 via-indigo-300 to-purple-400',
  steel: 'from-gray-300 via-slate-400 to-gray-600',
  symphony: 'from-pink-300 via-purple-300 to-indigo-400',
  future: 'from-cyan-200 via-blue-300 to-indigo-500'
}

export default function VibeCard({ 
  name, 
  subtitle, 
  theme, 
  symbol, 
  imageUrl, 
  isPrimary = false, 
  delay = 0 
}: VibeCardProps) {
  const gradientClass = themeGradients[theme] || themeGradients.cosmic

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={`relative overflow-hidden dreamy-card group ${
        isPrimary ? 'ring-2 ring-purple-200/60' : ''
      }`}
    >
      {/* Background gradient */}
      <div className={`h-48 bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full animate-pulse" />
        <div className="absolute top-8 right-8 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-6 left-4 w-2 h-2 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Image or Symbol */}
        <div className="relative h-full flex items-center justify-center">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.div 
              className="text-7xl filter drop-shadow-lg"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {symbol}
            </motion.div>
          )}
        </div>
        
        {isPrimary && (
          <motion.div 
            className="absolute top-4 left-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            <span className="bg-white/25 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium border border-white/30">
              ✨ 주 카드
            </span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="relative bg-white/90 backdrop-blur-xl p-6">
        <motion.h3 
          className={`font-bold text-slate-800 mb-3 ${isPrimary ? 'text-xl' : 'text-lg'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2 }}
        >
          {name}
        </motion.h3>
        <motion.p 
          className="text-body leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
    </motion.div>
  )
}
