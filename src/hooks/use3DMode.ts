import { create } from 'zustand'

interface Mode3DState {
  is3DMode: boolean
  toggle3DMode: () => void
  enable3DMode: () => void
  disable3DMode: () => void
}

export const use3DMode = create<Mode3DState>((set) => ({
  is3DMode: false,
  toggle3DMode: () => set((state) => ({ is3DMode: !state.is3DMode })),
  enable3DMode: () => set({ is3DMode: true }),
  disable3DMode: () => set({ is3DMode: false }),
}))
