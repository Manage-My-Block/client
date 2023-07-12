import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set) => ({
            email: '',
            apartment: '',
            name: '',
            role: null,
            token: null,
            setUserData: (userData) => set(userData),
        }),
        {
            name: 'user-storage', // name for localStorage
        }
    )
)
