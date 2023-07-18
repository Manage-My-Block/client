import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getTodos, deleteTodo } from "../api/todos"
import TodoForm from "../components/TodoForm"
import TodoDragAndDrop from "../components/TodoDragAndDrop"
import LoadingIcon from "../components/LoadingIcon"

export default function TaskBoardPage() {
    const queryClient = useQueryClient()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })

    const handleDelete = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            // console.log('on success')
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    if (isLoading) return <LoadingIcon />

    if (isError) return <div className='w-full h-screen flex justify-center'><h1>Error: {error.message}</h1></div>

    return (
        <div className="m-4">
            <h1 className="text-3xl font-extrabold">Task Board</h1>
            <div className="p-4">
                <TodoForm />
            </div>

            <TodoDragAndDrop todos={data} handleDelete={handleDelete} />
        </div>
    )
}
