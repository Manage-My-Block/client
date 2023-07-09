import { create } from 'zustand'

export const useAuthStore = create((set) => ({
	user: null,
	authData: {},
	setAuthData: (data) => set({ authdata: data})
}))