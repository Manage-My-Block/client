import { useForm } from 'react-hook-form'
// import { upperFirst } from 'lodash'
import { login, register } from '../api/auth'

import { useAuthStore } from '../stores/AuthStore'
import { useUserStore } from '../stores/UserStore'

import { useNavigate } from "react-router-dom"

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

        console.log('Submitting: ', data)

        let responseData

        if (authType === 'register') {

            responseData = await register(data)
            console.log('Register response: ', responseData)
          

        } else if (authType === 'login') {

            responseData = await login(data)
            console.log('Login response: ', responseData)

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
            <div>
                <input
                    {...formRegister('email', { required: 'Email required' })}
                    defaultValue='admin@admin.com'
                    type='email'
                    className='input input-bordered w-full'
                    placeholder='Email'
                />
            </div>

            <div>
                <input
                    {...formRegister('password', { required: true, minLength: 6 })}
                    defaultValue='123456'
                    type='password'
                    className='input input-bordered w-full'
                    placeholder='Password'
                />
            </div>

            {/* Add extra inputs for "apartment" and "name" if props.authType is "Register" */}
            {authType === 'register' && (
                <>
                    <div>
                        <input
                            {...formRegister('apartment', { required: "Apartment number required" })}
                            defaultValue='0'
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Apartment number'
                        />
                    </div>

                    <div>
                        <input
                            {...formRegister('name', { required: "Name required" })}
                            defaultValue='Admin'
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Name'
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
        </form>
    )
}
