import { useQuery } from '@tanstack/react-query'

import { getTodos } from '../api/todos'
import { getMeetings } from '../api/meetings'
import { getNotices } from '../api/notices'
import { getUsers } from '../api/users'

import DashboardList from '../components/DashboardList'
import LoadingIcon from '../components/LoadingIcon'
import { getContacts } from '../api/contacts'
import { startCase } from 'lodash'

export default function HomePage() {
    const contactsQuery = useQuery(['contacts'], getContacts)
    const todosQuery = useQuery(['todos'], getTodos)
    const noticesQuery = useQuery(['notices'], getNotices)
    const meetingsQuery = useQuery(['meetings'], getMeetings)
    const usersQuery = useQuery(['users'], getUsers)

    if (usersQuery.isLoading || todosQuery.isLoading || noticesQuery.isLoading || meetingsQuery.isLoading) return <LoadingIcon />

    return (
        <div className='h-screen grid grid-rows-[30vh_70vh]'>
            <div className='grid grid-cols-[2fr_3fr]'>
                <div className='bg-gray-800'>Building Picture</div>
                <div className='bg-gray-700'>
                    <h1>Building Conctacts</h1>
                    {contactsQuery && contactsQuery?.data.map((contact, index) => {
                        if (index > 1) {
                            return
                        }
                        return <div className='px-8 pt-2' key={index}>
                            <div>
                                <p className='font-bold text-rose-600'>{startCase(contact.occupation) + ": "}</p>
                            </div>
                            <div className='pl-4'>
                                <div className='flex gap-2'>
                                    <p className='font-bold'>Name:</p>
                                    <p className=''>{contact.name}</p>
                                </div>
                                <div className='flex gap-2'>
                                    <p className='font-bold'>Phone:</p>
                                    <p className=''>{contact.phoneNumber}</p>
                                </div>
                                {contact.email && <div className='flex gap-2'>
                                    <p className='font-bold'>Email:</p>
                                    <p className=''>{contact.email}</p>
                                </div>}
                            </div>
                        </div>
                    })}
                </div>
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
