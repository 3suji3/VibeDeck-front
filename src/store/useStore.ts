import { create } from 'zustand'

interface StoreState {
  step: number
  answers: Record<string, string> // questionId -> optionId
  
  setAnswer: (questionId: string, optionId: string) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

export const useStore = create<StoreState>((set) => ({
  step: 0,
  answers: {},
  
  setAnswer: (questionId: string, optionId: string) => {
    set(state => ({
      answers: { ...state.answers, [questionId]: optionId }
    }))
  },
  
  nextStep: () => {
    set(state => ({ step: state.step + 1 }))
  },
  
  prevStep: () => {
    set(state => ({ step: Math.max(0, state.step - 1) }))
  },
  
  reset: () => {
    set({ step: 0, answers: {} })
  }
}))