import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create((set) => ({
	username: '',
	apartment: '',
	name: '',
	role: null,
	token: null,
	setUserData: (userData) => set(userData),
}))