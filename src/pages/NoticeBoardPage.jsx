import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotices, deleteNotice } from "../api/notices"

import NoticeList from "../components/Notices/NoticeList"
import LoadingIcon from "../components/LoadingIcon"

import ModalDaisy from "../components/ModalDaisy"
import CreateNoticeForm from "../components/Notices/CreateNoticeForm"

export default function NoticeBoardPage() {
    const queryClient = useQueryClient()

    const { data: notices, isLoading, isError, error } = useQuery({
        queryKey: ['notices'],
        queryFn: getNotices
    })

    const handleDelete = useMutation({
        mutationFn: deleteNotice,
        onSuccess: () => {
            queryClient.invalidateQueries(['notices'])
        }
    })

    if (isLoading) return <LoadingIcon />
    if (isError) return <h1>Error: {error.message}</h1>

    return <div className="m-4">
        <div className='flex justify-between'>
            <h1 className='text-3xl font-extrabold'>Notice Board</h1>

            <button
                // Open modal
                onClick={() => window.create_notice_modal.showModal()}
                className='btn btn-primary normal-case'
            >
                Create New Notice
            </button>
        </div>
            
        <ModalDaisy modalId={'create_notice_modal'}>
            <CreateNoticeForm />
        </ModalDaisy>

        <div className="mt-8">
            <NoticeList notices={notices} handleDelete={handleDelete} />
        </div>

        {/* <pre>{JSON.stringify(notices, null, 2)}</pre> */}

        
    </div>
}
