import MeetingList from '../components/Meetings/MeetingList'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { deleteMeeting, getMeetings } from '../api/meetings'
import MeetingModalCreate from '../components/Meetings/MeetingModalCreate'
import LoadingIcon from '../components/LoadingIcon'

export default function MeetingsPage() {

    const queryClient = useQueryClient()

    const meetingsQuery = useQuery({
        queryKey: ['meetings'],
        queryFn: getMeetings,
        placeholderData: [],
    })

    const handleDelete = useMutation({
        mutationFn: deleteMeeting,
        onSuccess: () => {
            queryClient.invalidateQueries(['meetings'])
        },
        onError: (err) => {
            console.log(`Meeting delete error: ${err}`)
        }
    })


    if (meetingsQuery.isLoading) return <LoadingIcon />
    if (meetingsQuery.isError) return <h1>Error: {meetingsQuery.error.message}</h1>

    return (
        <div className='mx-4 mt-6'>
            <div className='flex items-center'>
                <h1 className='text-3xl font-extrabold'>Meetings</h1>

                <button
                    // Open modal
                    onClick={() => window.meeting_modal_create.showModal()}
                    className='btn btn-primary normal-case md:ml-auto ml-4'
                >
                    Create Meeting
                </button>
            </div>

            <MeetingModalCreate />

            <div className='mt-8'>
                <MeetingList meetings={meetingsQuery.data} handleDelete={handleDelete}/>
            </div>

            {/* <pre>{JSON.stringify(meetingsQuery.data, null, 2)}</pre> */}
        </div>
    )
}
