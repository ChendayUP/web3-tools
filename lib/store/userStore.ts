import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type State = {
  firstName: string
  lastName: string
  count: number
}

type Action = {
  updateFirstName: (firstName: State["firstName"]) => void
  updateCount: () => void
}

// Create your store, which includes both state and (optionally) actions
const usePersonStore = create<State & Action>()(
  persist(
    (set, get) => ({
      firstName: "",
      lastName: "",
      count: 0,
      updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
      updateCount: () => set(() => ({ count: get().count + 1 })),
    }),
    {
      name: "user-person-storage", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

export default usePersonStore
