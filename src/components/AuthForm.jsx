import { useForm } from 'react-hook-form'
// import { upperFirst } from 'lodash'
import { login, register } from '../api/auth'

import { useAuthStore } from '../stores/AuthStore'

export default function AuthForm({ authType }) {

    const { setUserData } = useAuthStore()

    const {
        register: formRegister, // alias "register" hook-form function so it doesn't overwrite "register" API function
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        console.log('Submitting: ', data)

        let responseData = {}

        if (authType === 'register') {

            responseData = await register(data)
            console.log('Register response: ', responseData)

        } else if (authType === 'login') {

            responseData = await login(data)
            console.log('Login response: ', responseData)

        }
        
        // Extract response data
        const token = responseData.token
        const { email, name, apartment } = responseData.user || responseData.newUser // response property is different for login/register

        // Set user store
        setUserData({ token, email, name, apartment })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 max-w-md'>
            <div>
                <input
                    {...formRegister('email', { required: true })}
                    defaultValue='admin@admin.com'
                    type='email'
                    className='input input-bordered w-full'
                    placeholder='Email'
                />
            </div>

            <div>
                <input
                    {...formRegister('password', { required: true, minLength: 6 })}
                    defaultValue='1234'
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
                            {...formRegister('apartment', { required: true })}
                            defaultValue='0'
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Apartment #'
                        />
                    </div>

                    <div>
                        <input
                            {...formRegister('name', { required: true })}
                            defaultValue='Admin'
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Name'
                        />
                    </div>
                </>
            )}

            {errors.email && <span>This field is required</span>}

            <button className='btn btn-primary w-full'>{authType}</button>
        </form>
    )
}
