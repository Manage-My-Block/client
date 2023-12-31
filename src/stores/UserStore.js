import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export const useUserStore = create(
    persist(
        (set) => ({
            _id: '',
            email: '',
            apartment: '',
            name: '',
            role: '',
            setUserData: (userData) => set(userData),
        }),
        {
            name: 'user', // name for localStorage
        }
    )
)
