import { useForm } from 'react-hook-form'
// import { upperFirst } from 'lodash'
import { login, register } from '../api/auth'

import { useAuthStore } from '../stores/AuthStore'

export default function AuthForm({ authType }) {
    const { setUserData } = useAuthStore()

    const {
        register: formRegister, // alias register function so I can use "register" and "login" as API function names
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        console.log('Submitting: ', data)

        if (authType === 'register') {


            const responseData = await register(data)
            console.log('register response: ', responseData)

        } else if (authType === 'login') {
            
            const responseData = await login(data)
            console.log('login resonse: ', responseData)

            // Set user store
            const token = responseData.token
            const { username, name, apartment } = responseData.user
            setUserData({ token, username, name, apartment })
        }
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
                    {...formRegister('password', { required: true })}
                    defaultValue='1234'
                    type='password'
                    className='input input-bordered w-full'
                    placeholder='Password'
                />
            </div>

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
