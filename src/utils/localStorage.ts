export function loadData<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch (error) {
    console.warn(`Failed to load ${key}:`, error)
    return fallback
  }
}

export function saveData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Failed to save ${key}:`, error)
  }
}

export function loadQuestions() {
  return loadData('vibedeck.questions', [])
}

export function saveQuestions(questions: any[]) {
  saveData('vibedeck.questions', questions)
}

export function loadResults() {
  return loadData('vibedeck.results', [])
}

export function saveResults(results: any[]) {
  saveData('vibedeck.results', results)
}

export function loadCards() {
  return loadData('vibedeck.cards', [])
}

export function saveCards(cards: any[]) {
  saveData('vibedeck.cards', cards)
}

export function loadHistory() {
  return loadData('vibedeck.history', [])
}

export function saveHistory(history: any[]) {
  saveData('vibedeck.history', history)
}

export function addToHistory(item: any) {
  const history = loadHistory()
  history.unshift({ ...item, createdAt: new Date().toISOString() })
  const trimmed = history.slice(0, 10)
  saveHistory(trimmed)
}
