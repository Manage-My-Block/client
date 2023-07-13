import { useForm } from 'react-hook-form'
// import { upperFirst } from 'lodash'
import { login, register, newBuilding } from '../api/auth'

import { useAuthStore } from '../stores/AuthStore'
import { useUserStore } from '../stores/UserStore'

import { Link, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBuildings } from '../api/buildings'
import { useEffect, useState } from 'react'
import { useSignIn } from 'react-auth-kit'


// eslint-disable-next-line react/prop-types
export default function AuthForm({ authType }) {

    const [buildingData, setBuildingData] = useState()
    const { setUserData } = useUserStore()
    const { setToken } = useAuthStore()
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    // Auth kit to manage signIn to cookies
    const signIn = useSignIn()

    // I don't know how to get this working...
    // const { buildingData, isLoading, isError, error } = useQuery({
    //     queryKey: ['buildings'],
    //     queryFn: getBuildings
    // })

    useEffect(() => {
        getBuildings().then((data) => setBuildingData(data))
    }, [])

    const handleRegisterSubmit = useMutation({
        mutationFn: register,
        onSuccess: () => {
            console.log('on success')
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const {
        register: formRegister, // alias "register" hook-form function so it doesn't overwrite "register" API function
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        let responseData

        if (authType === 'register') {
            data.building = data.buildingId

            delete data.buildingId

            responseData = await register(data)
            console.log('Register response: ', responseData)


        } else if (authType === 'login') {

            responseData = await login(data)
            console.log('Login response: ', responseData)

        } else if (authType === 'create building') {

            const cleanedData = {
                buildingData: {
                    name: data.buildingName,
                    address: data.address,
                    apartmentCount: data.apartmentCount
                },
                userData: {
                    name: data.name,
                    password: data.password,
                    apartment: data.apartment,
                    email: data.email
                }
            }

            responseData = await newBuilding(cleanedData)
            console.log('New building response: ', responseData)

        }

        // Extract response data if it got defined
        if (responseData?.token) {

            const token = responseData.token

            // Manage signIn and cookie storage
            signIn({
                token: token,
                expiresIn: 1,
                tokenType: "Bearer",
                authState: { email: responseData.user.email, user_id: responseData.user._id }
            })

            const { _id, email, name, apartment, role: { role } } = responseData.user || responseData.newUser // response property is different for login/register

            // Set user store
            console.log('Setting user store')
            setUserData({ email, name, apartment, role, _id })

            // Set auth store
            console.log('Setting auth store')
            setToken(token)

            // Navigate to home page (Dashboard)
            navigate('/')
        } else {
            console.log(responseData)
        }
    }

    // if (isLoading) return <h1>Loading...</h1>
    // if (isError) return <h1>Error: {error.message}</h1>

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 max-w-md'>
            {/* Add extra inputs for "building name", "address" and "apartment count" if props.authType is "create building" */}
            {authType === 'create building' && (
                <>
                    <div>
                        <h1 className='my-4 font-bold'>Create A New Building</h1>
                    </div>
                    <div>
                        <input
                            {...formRegister('buildingName', { required: "Apartment number required" })}
                            defaultValue=''
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Building name'
                        />
                    </div>

                    <div>
                        <input
                            {...formRegister('address', { required: "Address required" })}
                            defaultValue=''
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Address'
                        />
                    </div>
                    <div>
                        <input
                            {...formRegister('apartmentCount', { required: "Apartmen count required" })}
                            defaultValue=''
                            type='number'
                            className='input input-bordered w-full'
                            placeholder='Number of apartments'
                        />
                    </div>
                    <div>
                        <h1 className='my-4 mt-6 font-bold'>Building Manager</h1>
                    </div>

                </>)}

            <div>
                <h1 className='my-4 font-bold'>{authType === 'login' ? "Login" : authType === 'register' && "Register"}</h1>
            </div>

            <div>
                <input
                    {...formRegister('email', { required: 'Email required' })}
                    defaultValue=''
                    type='email'
                    className='input input-bordered w-full'
                    placeholder='Email'
                />
            </div>

            <div>
                <input
                    {...formRegister('password', { required: true, minLength: 6 })}
                    defaultValue=''
                    type='password'
                    className='input input-bordered w-full'
                    placeholder='Password'
                />
            </div>


            {/* Add extra building drop-down if props.authType is "Register" */}
            {authType === 'register' && (
                <div>
                    <select
                        {...formRegister('buildingId', { required: 'Apartment number required' })}
                        defaultValue=''
                        className='input input-bordered w-full'
                    >
                        <option value='' disabled>Select Building</option>
                        {buildingData && buildingData.map(building => {
                            return (<option key={building._id} value={building._id}>{building.name}</option>)
                        })}

                    </select>
                </div>
            )}

            {errors.email && <div className='alert alert-error rounded-md'>{errors.email.message}</div>}
            {(errors.password?.type === 'required') && (<div className='alert alert-error rounded-md'>Password required</div>)}
            {(errors.password?.type === 'minLength') && (<div className='alert alert-error rounded-md'>Password must be at least 6 characters</div>)}
            {errors.apartment && <div className='alert alert-error rounded-md'>{errors.apartment.message}</div>}
            {errors.name && <div className='alert alert-error rounded-md'>{errors.name.message}</div>}

            <div className='pt-2'>
                <button className='btn btn-primary w-full'>{authType}</button>
            </div>


            {authType === 'login' ?
                (<p>{"Don't have an account? "}<Link className="underline" to="/register">Register</Link></p>)
                :
                (authType === 'register' || authType === 'create building') && <p>{"Already have an account? "}<Link className="underline" to="/login">Login</Link></p>}

            {authType === 'register' && <p>{"Or try manage a new building "}<Link className="underline" to="/newbuilding">here</Link></p>}

        </form>
    )
}
