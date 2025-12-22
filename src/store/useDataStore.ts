import { create } from 'zustand'
import { loadData } from '../utils/localStorage'
import questionsData from '../data/questions.json'
import resultsData from '../data/results.json'
import cardsData from '../data/cards.json'

interface DataStore {
  questions: any[]
  results: any[]
  cards: any[]
  isLoaded: boolean
  
  loadAllData: () => void
  setQuestions: (questions: any[]) => void
  setResults: (results: any[]) => void
  setCards: (cards: any[]) => void
}

export const useDataStore = create<DataStore>((set) => ({
  questions: [],
  results: [],
  cards: [],
  isLoaded: false,
  
  loadAllData: () => {
    const questions = loadData('vibedeck.questions', questionsData)
    const results = loadData('vibedeck.results', resultsData)
    const cards = loadData('vibedeck.cards', cardsData)
    
    set({
      questions,
      results,
      cards,
      isLoaded: true
    })
  },
  
  setQuestions: (questions) => set({ questions }),
  setResults: (results) => set({ results }),
  setCards: (cards) => set({ cards })
}))
