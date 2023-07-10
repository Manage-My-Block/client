import { useQuery } from "@tanstack/react-query"
import { getTodos } from "../api/todos"

export default function TaskBoardPage() {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error: {error.message}</h1>
    
    return <div>
        <h1>TaskBoardPage</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
}
