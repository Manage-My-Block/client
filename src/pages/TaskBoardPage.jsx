import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getTodos, deleteTodo, createTodo } from "../api/todos"

import TodoList from "../components/TodoList"
import TodoForm from "../components/TodoForm"
import { useTaskStore } from "../stores/TaskStore"
import { useState } from "react"

export default function TaskBoardPage() {
    const queryClient = useQueryClient()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })

    const handleDelete = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            console.log('on success')
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error: {error.message}</h1>

    return (
        <div className="m-4">
            <h1 className="text-3xl font-extrabold">Task Board</h1>

            <TodoForm />

            <TodoList todos={data} handleDelete={handleDelete} />
        </div>
    )
}
