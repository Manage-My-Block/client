import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUser, updateUser } from '../api/users'
import { useAuthUser } from 'react-auth-kit'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import LoadingIcon from '../components/LoadingIcon'

export default function ProfilePage() {
    const queryClient = useQueryClient()
    const auth = useAuthUser()
    const userId = auth()?.user._id
    const [queryErrors, setQueryErrors] = useState()
    const [isSucceed, setIsSucceed] = useState(false)

    // const { data, isLoading, isError, error } = useQuery(['user', userId], () => getUser(userId));
    const userQuery = useQuery(['user', userId], () => getUser(userId));

    useEffect(() => {
        // Clear success indicator after a set time.
        const timeout = setTimeout(() => {
            setIsSucceed(false);
        }, 1200);

        // Clean up the timer when the component unmounts or the dependency changes.
        return () => clearTimeout(timeout);

    }, [isSucceed])

    const handleUpdateUser = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            setIsSucceed(true)
            setQueryErrors()
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        onError: (error) => {
            setQueryErrors(error.response.data.errors)
        }
    })

    // Form management
    const {
        register: formRegister,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    // Submit function for comment text field
    const onSubmit = async (data) => {
        // Remove empty properties from data
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (data[key] === null || data[key] === undefined || data[key] === '') {
                    delete data[key];
                }
            }
        }

        // If user email is unchanged, don't send it
        if (data.email === userQuery.data.email) {
            delete data.email
        }


        // If apartment is unchanged
        if (userQuery.data.apartment && data.apartment.toString() === userQuery.data?.apartment.toString()) {
            delete data.apartment
        }

        // Clean up the data so it can be sent to the query
        const updatedUser = {
            userId: userId,
            user: data
        }

        console.log(updatedUser)

        // Send updated user data
        handleUpdateUser.mutate(updatedUser)

        reset();

    }

    const handleFormChange = () => {
        // Reset errors when the form changes
        reset({ errors: {} });
        setQueryErrors()
    };

    if (userQuery.isLoading) return <LoadingIcon />

    if (userQuery.isError) return <div className='w-full h-screen flex justify-center'><h1>Error: {userQuery.error.message}</h1></div>

    return (
        <div className='w-full h-screen flex justify-center'>
            <div className='w-fit m-auto'>
                <h1 className='my-4 font-bold text-2xl'>Update Profile</h1>
                <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
                    <div>
                        {/* Email field */}
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...formRegister('email', { required: 'Email is required' })}
                                defaultValue={userQuery.data.email}
                                type='email'
                                required
                                className='input input-bordered'
                                placeholder={userQuery.data.email}
                            />
                        </div>

                        {/* Password field */}
                        <div>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...formRegister('password', { required: false, minLength: 6 })}
                                defaultValue=""
                                type='text'
                                className='input input-bordered'
                                placeholder='6 or more characters'
                            />
                        </div>

                        {/* Name field */}
                        <div>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                {...formRegister('name')}
                                defaultValue={userQuery.data.name}
                                type='text'
                                className='input input-bordered'
                                placeholder={userQuery.data.name}
                            />
                        </div>

                        {/* Apartment field */}
                        <div>
                            <label className="label">
                                <span className="label-text">Apartment number</span>
                            </label>
                            <input
                                {...formRegister('apartment')}
                                defaultValue={userQuery.data.apartment}
                                type='number'
                                className='input input-bordered'
                                placeholder={userQuery.data.apartment}
                            />
                        </div>

                        {/* Error display */}
                        <div className='mt-4'>
                            {/* Display errors */}
                            {queryErrors && queryErrors.map((error, index) => {
                                return <div key={index} className='alert alert-error rounded-md w-fit'>{error}</div>
                            })}

                            {errors.email && <div className='alert alert-error rounded-md'>{errors.email.message}</div>}
                            {errors.password?.type === 'required' && <div className='alert alert-error rounded-md'>Password required</div>}
                            {errors.password?.type === 'minLength' && <div className='alert alert-error rounded-md'>Password must be at least 6 characters</div>}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button className='btn btn-primary' type='submit'>update</button>
                    </div>

                    {isSucceed && <div className="alert alert-success mt-4 absolute w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Account updated!</span>
                    </div>}
                </form>
            </div>
        </div>
    )
}
