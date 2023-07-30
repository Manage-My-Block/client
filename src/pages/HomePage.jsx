import { useQuery } from '@tanstack/react-query'

import { getTodos } from '../api/todos'
import { getMeetings } from '../api/meetings'
import { getNotices } from '../api/notices'
import { getUsers } from '../api/users'

import DashboardList from '../components/DashboardList'
import LoadingIcon from '../components/LoadingIcon'
import { getContacts } from '../api/contacts'
import { startCase } from 'lodash'

import { getBuilding, getBuildings } from '../api/buildings'
import { useAuthUser } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {


    const contactsQuery = useQuery(['contacts'], getContacts)
    const todosQuery = useQuery(['todos'], getTodos)
    const noticesQuery = useQuery(['notices'], getNotices)
    const meetingsQuery = useQuery(['meetings'], getMeetings)
    const usersQuery = useQuery(['users'], getUsers)

    // Get logged in user
    const auth = useAuthUser()
    const user = auth().user

    // Get single building data
    const buildingQuery = useQuery(['building', user.building._id], () => getBuilding(user.building._id))

    const navigate = useNavigate()

    if (usersQuery.isLoading || todosQuery.isLoading || noticesQuery.isLoading || meetingsQuery.isLoading) return <LoadingIcon />

    return (
        <div className='min-h-screen grid md:grid-rows-[30vh_70vh] text-base-content'>

            <div className='grid md:grid-cols-2'>

                <div className='bg-base-300 overflow-hidden cursor-pointer' onClick={() => navigate('/building')}>
                    {buildingQuery.data?.imageUrl && <img src={buildingQuery.data.imageUrl} alt="building image" className='w-full h-full object-cover' />}

                    <div className='p-10'>
                        <h1 className='text-3xl'>{buildingQuery?.data?.name}</h1>
                        <h1 className='text-lg'>{buildingQuery?.data?.address}</h1>
                    </div>
                </div>

                <div className='bg-base-200 cursor-pointer' onClick={() => navigate('/building')}>

                    <h1>Building Contacts</h1>

                    {/* <pre>{JSON.stringify(contactsQuery.data, null, 2)}</pre> */}

                    {contactsQuery && contactsQuery?.data?.map((contact, index) => {
                        if (index > 1) {
                            return
                        }
                        return <div className='px-8 pt-2' key={index}>
                            <div>
                                <p className='font-bold text-primary'>{startCase(contact.occupation) + ": "}</p>
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

            <div className='grid md:grid-cols-2 md:grid-rows-2 p-4 gap-4'>
                <div>
                    <div onClick={() => navigate('/noticeboard')} className='cursor-pointer'>
                        <DashboardList title={"Notices"} data={noticesQuery.data} propertiesToDisplay={['title', 'createdAt']} />
                    </div>
                </div>
                <div className=''>
                    <div onClick={() => navigate('/meetings')} className='cursor-pointer'>
                        <DashboardList title={"Meetings"} data={meetingsQuery.data} propertiesToDisplay={['title', 'meetingDate']} />
                    </div>
                </div>
                <div>
                    <div onClick={() => navigate('/taskboard')} className='cursor-pointer'>
                        <DashboardList title={"Tasks"} data={todosQuery.data} propertiesToDisplay={['title', 'status']} />
                    </div>
                </div>
                <div>
                    <div onClick={() => navigate('/members')} className='cursor-pointer'>
                        <DashboardList title={"Members"} data={usersQuery.data} propertiesToDisplay={['name', 'email']} />
                    </div>
                </div>
            </div>

        </div>
    )
}
