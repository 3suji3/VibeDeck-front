import { motion } from 'framer-motion'

interface TestSetCardProps {
  id: string
  title: string
  subtitle: string
  coverTheme: string
  description: string
  tags: string[]
  questionCount: number
  onSelect: (id: string) => void
  delay?: number
}

const themeGradients: Record<string, string> = {
  cosmic: 'from-indigo-400 via-purple-500 to-pink-500',
  sunset: 'from-orange-300 via-pink-400 to-purple-500',
  rainbow: 'from-pink-300 via-purple-400 via-blue-400 to-cyan-400',
  golden: 'from-yellow-300 via-orange-400 to-pink-400',
  ocean: 'from-cyan-300 via-blue-400 to-purple-500',
  forest: 'from-green-300 via-emerald-400 to-teal-500'
}

export default function TestSetCard({
  id,
  title,
  subtitle,
  coverTheme,
  description,
  tags,
  questionCount,
  onSelect,
  delay = 0
}: TestSetCardProps) {
  const gradientClass = themeGradients[coverTheme] || themeGradients.cosmic

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay, 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(id)}
      className="cursor-pointer group relative"
    >
      <div className="dreamy-card overflow-hidden h-full">
        {/* Cover with gradient */}
        <div className={`h-40 bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          
          {/* Question count badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-white/25 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium border border-white/30">
              {questionCount}문항
            </span>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-sm leading-tight">
              {title}
            </h3>
            <p className="text-white/90 text-sm font-medium drop-shadow-sm leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-body leading-relaxed line-clamp-3 break-words max-w-full overflow-hidden">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 min-w-0 max-w-full">
            {tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.1 + index * 0.05 }}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200/50 break-words max-w-full min-w-0 overflow-hidden"
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%', minWidth: 0, display: 'block' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
