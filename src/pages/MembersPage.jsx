import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api/users'
import { useAuthUser } from 'react-auth-kit'
import MemberList from '../components/Members/MemberList'
import LoadingIcon from '../components/LoadingIcon'

export default function MembersPage() {
    const auth = useAuthUser()
    const user = auth().user

    const {
        data: members,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(user.building._id),
    })

    if (isLoading) return <LoadingIcon />
    if (isError) return <h1>Error: {error.message}</h1>

    return (
        <div className='mx-4 mt-8'>
            <h1 className='text-3xl font-extrabold'>Members</h1>

            <div className='mt-8 border border-neutral rounded'>
                <MemberList members={members} />
            </div>

            {/* <pre>{JSON.stringify(members, null, 2)}</pre> */}
        </div>
    )
}
