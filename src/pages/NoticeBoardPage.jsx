import { useQuery } from "@tanstack/react-query"
import { getNotices } from "../api/notices"

export default function NoticeBoardPage() {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['notices'],
        queryFn: getNotices
    })

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error: {error.message}</h1>
    
    return <div>
        <h1>NoticeBoardPage</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
}
