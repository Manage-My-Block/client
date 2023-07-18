import { useQuery } from '@tanstack/react-query'

import { getTodos } from '../api/todos'
import { getMeetings } from '../api/meetings'
import { getNotices } from '../api/notices'
import { getUsers } from '../api/users'

import DashboardList from '../components/DashboardList'

export default function HomePage() {
    const todosQuery = useQuery(['todos'], getTodos)
    const noticesQuery = useQuery(['notices'], getNotices)
    const meetingsQuery = useQuery(['meetings'], getMeetings)
    const usersQuery = useQuery(['users'], getUsers)

    if (usersQuery.isLoading || todosQuery.isLoading || noticesQuery.isLoading || meetingsQuery.isLoading) return <div className='w-full h-screen flex justify-center'><span className="loading loading-dots loading-lg m-auto"></span></div>

    return (
        <div className='h-screen grid grid-rows-[30vh_70vh]'>
            <div className='grid grid-cols-[2fr_3fr]'>
                <div className='bg-gray-800'>Building Picture</div>
                <div className='bg-gray-700'>Building Contacts</div>
            </div>
            <div className='bg-gray-600 grid grid-cols-2 grid-rows-2 p-4 gap-4'>
                <div>
                    <DashboardList title={"Notices"} data={noticesQuery.data} propertiesToDisplay={['title', 'createdAt']} />
                </div>
                <div className=''>
                    <DashboardList title={"Meetings"} data={meetingsQuery.data} propertiesToDisplay={['title', 'meetingDate']} />
                </div>
                <div>
                    <DashboardList title={"Tasks"} data={todosQuery.data} propertiesToDisplay={['title', 'status']} />
                </div>
                <div>
                    <DashboardList title={"Members"} data={usersQuery.data} propertiesToDisplay={['name', 'email']} />
                </div>
            </div>
        </div>
    )
}
