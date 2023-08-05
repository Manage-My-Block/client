import { useQuery } from '@tanstack/react-query'

import { getTodos } from '../api/todos'
import { getMeetings } from '../api/meetings'
import { getNotices } from '../api/notices'
import { getUsers } from '../api/users'
import { getBudgetByBuildingId } from '../api/budget'

import DashboardList from '../components/DashboardList'
import LoadingIcon from '../components/LoadingIcon'
import { getContacts } from '../api/contacts'
import { startCase } from 'lodash'

import { getBuilding, getBuildings } from '../api/buildings'
import { useAuthUser } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    // Get logged in user
    const auth = useAuthUser()
    const user = auth().user

    // Get all data
    const buildingQuery = useQuery(['building', user.building._id], () => getBuilding(user.building._id))
    const contactsQuery = useQuery(['contacts'], () => getContacts(user.building._id))
    const todosQuery = useQuery(['todos'], () => getTodos(user.building._id))
    const noticesQuery = useQuery(['notices'], () => getNotices(user.building._id))
    const meetingsQuery = useQuery(['meetings'], () => getMeetings(user.building._id))
    const usersQuery = useQuery(['users'], () => getUsers(user.building._id))
    const budgetQuery = useQuery(['budgets', user.building._id], () => getBudgetByBuildingId(user.building._id))

    const navigate = useNavigate()

    if (usersQuery.isLoading || todosQuery.isLoading || noticesQuery.isLoading || meetingsQuery.isLoading) return <LoadingIcon />

    return (
        <div className='min-h-screen grid md:grid-rows-[30vh_70vh] gap-5 text-base-content'>

            <div className='h-full'>
                <div className='relative h-full bg-base-200 overflow-hidden cursor-pointer hover:bg-info hover:text-black' onClick={() => navigate('/building')}>

                    <div className='px-8 py-5 text-base-content absolute top-0 left-0 rounded-none rounded-br bg-base-300/50 backdrop-blur md:top-16 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md'>
                        <h1 className='text-xl md:text-3xl'>{buildingQuery?.data?.name}</h1>
                        <h1 className='text-base md:text-lg'>{buildingQuery?.data?.address}</h1>
                    </div>

                    {buildingQuery.data?.imageUrl && <img src={buildingQuery.data.imageUrl} alt="building image" className='w-full h-full object-cover' />}

                </div>
            </div>

            <div className='flex flex-wrap p-4 gap-5 justify-center'>
                <div className='w-[350px]'>
                    <div onClick={() => navigate('/taskboard')} className='cursor-pointer'>
                        <DashboardList title={"Tasks"} data={todosQuery.data.filter(task => task.isComplete === false)} propertiesToDisplay={['title', 'description']} />
                    </div>
                </div>
                <div className='w-[350px]'>
                    <div onClick={() => navigate('/noticeboard')} className='cursor-pointer'>
                        <DashboardList title={"Notices"} data={noticesQuery.data} propertiesToDisplay={['title', 'createdAt']} />
                    </div>
                </div>
                <div className='w-[350px]'>
                    <div onClick={() => navigate('/meetings')} className='cursor-pointer'>
                        <DashboardList title={"Meetings"} data={meetingsQuery.data} propertiesToDisplay={['title', 'meetingDate']} />
                    </div>
                </div>
                <div className='w-[350px]'>
                    <div onClick={() => navigate('/members')} className='cursor-pointer'>
                        <DashboardList title={"Members"} data={usersQuery.data} propertiesToDisplay={['name', 'email']} />
                    </div>
                </div>
                <div className='w-[350px]'>
                    <div onClick={() => navigate('/contacts')} className='cursor-pointer'>
                        <DashboardList title={"Contacts"} data={contactsQuery.data} propertiesToDisplay={['occupation', 'name', 'phoneNumber']} />
                    </div>
                </div>
                <div className='w-[350px]'>
                    <div onClick={() => navigate('/budget')} className='cursor-pointer'>
                        <DashboardList title={"Budget"} data={budgetQuery.data} propertiesToDisplay={['name', 'balance']} />
                    </div>
                </div>
            </div>

        </div>
    )
}
