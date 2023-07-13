import { useForm } from 'react-hook-form'
// import { upperFirst } from 'lodash'
import { login, register, newBuilding } from '../api/auth'

import { useAuthStore } from '../stores/AuthStore'
import { useUserStore } from '../stores/UserStore'

import { Link, useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export default function AuthForm({ authType }) {

    const { setUserData } = useUserStore()
    const { setToken } = useAuthStore()

    const navigate = useNavigate()

    const {
        register: formRegister, // alias "register" hook-form function so it doesn't overwrite "register" API function
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        let responseData

        if (authType === 'register') {

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
        if (responseData) {

            const token = responseData.token

            const { email, name, apartment, role: { role } } = responseData.user || responseData.newUser // response property is different for login/register

            // Set user store
            console.log('Setting user store')
            setUserData({ email, name, apartment, role })

            // Set auth store
            console.log('Setting auth store')
            setToken(token)
        }

        // Navigate to home page (Dashboard)
        navigate('/')
    }

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

            {/* Add extra inputs for "apartment" and "name" if props.authType is "Register" */}
            {(authType === 'register' || authType === 'create building') && (
                <>
                    <div>
                        <input
                            {...formRegister('name', { required: "Name required" })}
                            defaultValue=''
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Name'
                        />
                    </div>

                    <div>
                        <input
                            {...formRegister('apartment', { required: "Apartment number required" })}
                            defaultValue=''
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Apartment number'
                        />
                    </div>

                    <div>
                        <input
                            {...formRegister('buildingId', { required: "Apartment number required" })}
                            defaultValue=''
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Building number'
                        />
                    </div>

                </>
            )}

            {errors.email && <div className='alert alert-error rounded-md'>{errors.email.message}</div>}
            {(errors.password?.type === 'required') && (<div className='alert alert-error rounded-md'>Password required</div>)}
            {(errors.password?.type === 'minLength') && (<div className='alert alert-error rounded-md'>Password must be at least 6 characters</div>)}
            {errors.apartment && <div className='alert alert-error rounded-md'>{errors.apartment.message}</div>}
            {errors.name && <div className='alert alert-error rounded-md'>{errors.name.message}</div>}

            <button className='btn btn-primary w-full'>{authType}</button>


            {authType === 'login' ?
                (<p>{"Don't have an account? "}<Link className="underline" to="/register">Register</Link></p>)
                :
                (authType === 'register' || authType === 'create building') && <p>{"Already have an account? "}<Link className="underline" to="/login">Login</Link></p>}
            {authType === 'register' && <p>{"Or try manage a new building "}<Link className="underline" to="/newbuilding">here</Link></p>}

        </form>
    )
}
