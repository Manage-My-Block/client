import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/users"

export default function MembersPage() {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error: {error.message}</h1>
    
    return <div>
        <h1>Members page</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
}
