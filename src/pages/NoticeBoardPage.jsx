import { useQuery } from "@tanstack/react-query"
import { getNotices } from "../api/notices"

import NoticeList from "../components/NoticeList"

export default function NoticeBoardPage() {

    const { data: notices, isLoading, isError, error } = useQuery({
        queryKey: ['notices'],
        queryFn: getNotices
    })

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error: {error.message}</h1>
    
    return <div className="m-4">
        <h1 className="text-3xl font-extrabold">Notice Board</h1>

        <div className="mt-8">
            <NoticeList notices={notices}/>
        </div>

        <pre>{JSON.stringify(notices, null, 2)}</pre>
    </div>
}
