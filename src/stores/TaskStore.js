import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export const useTaskStore = create(
    persist(
        (set) => ({
            tasks: [],
            setTasks: (tasksList) => set(() => ({ tasks: tasksList })),
            addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
            removeTask: (task) => set((state) => ({ tasks: state.tasks.filter((item) => item._id !== task._id) }))
        }),
        {
            name: 'tasks', // name for localStorage
        }
    )
)

