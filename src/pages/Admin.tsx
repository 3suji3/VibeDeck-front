import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { questions } from '../data/questions'
import { results } from '../data/results'
import { cards } from '../data/cards'
import Button from '../components/ui/Button'

type DataType = 'questions' | 'results' | 'cards'

interface ValidationError {
  type: string
  message: string
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<DataType>('questions')
  const [jsonData, setJsonData] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<ValidationError[]>([])

  useEffect(() => {
    loadData(activeTab)
  }, [activeTab])

  const loadData = (type: DataType) => {
    let data
    switch (type) {
      case 'questions':
        data = questions
        break
      case 'results':
        data = results
        break
      case 'cards':
        data = cards
        break
    }
    setJsonData(JSON.stringify(data, null, 2))
    setErrors([])
    setMessage('')
  }

  const validateData = (type: DataType, data: any[]): ValidationError[] => {
    const errors: ValidationError[] = []

    if (!Array.isArray(data)) {
      errors.push({ type: 'format', message: '데이터는 배열 형태여야 합니다.' })
      return errors
    }

    data.forEach((item, index) => {
      switch (type) {
        case 'questions':
          if (!item.id) errors.push({ type: 'required', message: `질문 ${index + 1}: id가 필요합니다.` })
          if (!item.text) errors.push({ type: 'required', message: `질문 ${index + 1}: text가 필요합니다.` })
          if (!item.category) errors.push({ type: 'required', message: `질문 ${index + 1}: category가 필요합니다.` })
          if (!Array.isArray(item.options)) {
            errors.push({ type: 'required', message: `질문 ${index + 1}: options 배열이 필요합니다.` })
          } else {
            item.options.forEach((option: any, optIndex: number) => {
              if (!option.id) errors.push({ type: 'required', message: `질문 ${index + 1}, 옵션 ${optIndex + 1}: id가 필요합니다.` })
              if (!option.text) errors.push({ type: 'required', message: `질문 ${index + 1}, 옵션 ${optIndex + 1}: text가 필요합니다.` })
              if (!option.traits || typeof option.traits !== 'object') {
                errors.push({ type: 'required', message: `질문 ${index + 1}, 옵션 ${optIndex + 1}: traits 객체가 필요합니다.` })
              }
            })
          }
          break

        case 'results':
          if (!item.id) errors.push({ type: 'required', message: `결과 ${index + 1}: id가 필요합니다.` })
          if (!item.name) errors.push({ type: 'required', message: `결과 ${index + 1}: name이 필요합니다.` })
          if (!item.description) errors.push({ type: 'required', message: `결과 ${index + 1}: description이 필요합니다.` })
          if (!Array.isArray(item.traits)) errors.push({ type: 'required', message: `결과 ${index + 1}: traits 배열이 필요합니다.` })
          if (typeof item.minScore !== 'number') errors.push({ type: 'required', message: `결과 ${index + 1}: minScore 숫자가 필요합니다.` })
          if (typeof item.maxScore !== 'number') errors.push({ type: 'required', message: `결과 ${index + 1}: maxScore 숫자가 필요합니다.` })
          if (!item.color) errors.push({ type: 'required', message: `결과 ${index + 1}: color가 필요합니다.` })
          break

        case 'cards':
          if (!item.id) errors.push({ type: 'required', message: `카드 ${index + 1}: id가 필요합니다.` })
          if (!item.title) errors.push({ type: 'required', message: `카드 ${index + 1}: title이 필요합니다.` })
          if (!item.description) errors.push({ type: 'required', message: `카드 ${index + 1}: description이 필요합니다.` })
          if (!item.category) errors.push({ type: 'required', message: `카드 ${index + 1}: category가 필요합니다.` })
          if (!Array.isArray(item.traits)) errors.push({ type: 'required', message: `카드 ${index + 1}: traits 배열이 필요합니다.` })
          break
      }
    })

    return errors
  }

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonData)
      const validationErrors = validateData(activeTab, parsed)
      
      if (validationErrors.length > 0) {
        setErrors(validationErrors)
        setMessage('❌ 데이터 검증에 실패했습니다.')
        return
      }

      const key = `vibedeck.${activeTab}`
      localStorage.setItem(key, JSON.stringify(parsed))
      setErrors([])
      setMessage('✅ 저장되었습니다!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setErrors([{ type: 'json', message: 'JSON 형식이 올바르지 않습니다.' }])
      setMessage('❌ JSON 파싱 오류')
    }
  }

  const handleExport = () => {
    try {
      const parsed = JSON.parse(jsonData)
      const blob = new Blob([JSON.stringify(parsed, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `vibedeck-${activeTab}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setMessage('✅ 파일이 다운로드되었습니다!')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('❌ 내보내기 실패')
    }
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const parsed = JSON.parse(content)
        setJsonData(JSON.stringify(parsed, null, 2))
        setErrors([])
        setMessage('✅ 파일을 불러왔습니다!')
        setTimeout(() => setMessage(''), 3000)
      } catch {
        setMessage('❌ 파일을 읽을 수 없습니다.')
      }
    }
    reader.readAsText(file)
    e.target.value = '' // Reset input
  }

  const handleReset = () => {
    if (confirm('현재 편집 중인 내용이 초기화됩니다. 계속하시겠습니까?')) {
      loadData(activeTab)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <h1 className="text-3xl font-bold">관리자 페이지</h1>
          <p className="text-purple-100 mt-2">질문, 결과, 카드 데이터를 관리합니다</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { key: 'questions', label: '질문 관리', count: questions.length },
              { key: 'results', label: '결과 관리', count: results.length },
              { key: 'cards', label: '카드 관리', count: cards.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as DataType)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Status Messages */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-4 rounded-lg ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message}
            </motion.div>
          )}

          {/* Validation Errors */}
          {errors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <h4 className="font-semibold text-red-800 mb-2">검증 오류:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error.message}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Button onClick={handleSave} variant="primary">
              💾 저장
            </Button>
            <Button onClick={handleExport} variant="secondary">
              📤 내보내기
            </Button>
            <label className="cursor-pointer">
              <Button variant="outline" className="pointer-events-none">
                📥 가져오기
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <Button onClick={handleReset} variant="outline">
              🔄 초기화
            </Button>
          </div>

          {/* JSON Editor */}
          <div className="relative">
            <textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              className="w-full h-96 p-4 font-mono text-sm border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
              placeholder="JSON 데이터를 입력하세요..."
              spellCheck={false}
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-400">
              Lines: {jsonData.split('\n').length} | Characters: {jsonData.length}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">💡 사용 방법:</h4>
            <ul className="space-y-1">
              <li>• JSON 형식을 유지하면서 데이터를 수정하세요</li>
              <li>• 저장하면 로컬스토리지에 저장됩니다</li>
              <li>• 내보내기로 JSON 파일을 다운로드할 수 있습니다</li>
              <li>• 가져오기로 JSON 파일을 업로드할 수 있습니다</li>
              <li>• 필수 필드가 누락되면 검증 오류가 표시됩니다</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}