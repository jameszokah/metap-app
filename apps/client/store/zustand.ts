
import { create } from 'zustand'

type State = {
  count: number
  inc: () => void
  dec: () => void
}

export const useStore = create<State>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}))
