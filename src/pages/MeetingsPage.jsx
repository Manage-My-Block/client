import MeetingList from '../components/Meetings/MeetingList'

import { useQuery } from '@tanstack/react-query'

import { getMeetings } from '../api/meetings'
import MeetingModalCreate from '../components/Meetings/MeetingModalCreate'
import { useState } from 'react'

export default function MeetingsPage() {
    const meetingsQuery = useQuery({
        queryKey: ['meetings'],
        queryFn: getMeetings,
        placeholderData: [],
    })

    if (meetingsQuery.isLoading) return <h1>Loading...</h1>
    if (meetingsQuery.isError) return <h1>Error: {error.message}</h1>

    return (
        <div className='m-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-extrabold'>Meetings</h1>

                <button
                    // Open modal
                    onClick={()=>window.meeting_modal_create.showModal()}
                    className='btn btn-primary normal-case'
                >
                    Create Meeting
                </button>
            </div>

            <MeetingModalCreate />

            <div className='mt-8'>
                <MeetingList meetings={meetingsQuery.data} />
            </div>

            {/* <pre>{JSON.stringify(meetingsQuery.data, null, 2)}</pre> */}
        </div>
    )
}
