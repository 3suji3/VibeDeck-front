import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

interface TraitChartProps {
  scores: Record<string, number>
}

export default function TraitChart({ scores }: TraitChartProps) {
  const chartData = Object.entries(scores).map(([trait, score]) => ({
    trait: trait,
    score: score,
    fullMark: 100
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="dreamy-card p-8"
    >
      <motion.h3 
        className="text-heading text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <span className="inline-flex items-center gap-2">
          📊 성향 분석 차트
        </span>
      </motion.h3>
      
      <motion.div 
        className="h-80 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid 
              stroke="#e2e8f0" 
              strokeWidth={1}
              radialLines={true}
            />
            <PolarAngleAxis 
              dataKey="trait" 
              tick={{ 
                fontSize: 14, 
                fill: '#475569',
                fontWeight: 500
              }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ 
                fontSize: 12, 
                fill: '#94a3b8' 
              }}
              tickCount={6}
            />
            <Radar
              name="점수"
              dataKey="score"
              stroke="url(#chartGradient)"
              fill="url(#chartGradient)"
              fillOpacity={0.2}
              strokeWidth={3}
              dot={{ 
                fill: '#8b5cf6', 
                strokeWidth: 2, 
                r: 5,
                fillOpacity: 0.8
              }}
            />
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Score Legend */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        {chartData.map((item, index) => (
          <motion.div 
            key={item.trait} 
            className="text-center glass-card p-3 rounded-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + index * 0.1 }}
          >
            <div className="text-caption font-medium text-slate-700 mb-1">
              {item.trait}
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {item.score}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
