import { useForm } from 'react-hook-form'
import { login } from '../api/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'

export default function LoginForm() {
    // Navigation hook
    const navigate = useNavigate()

    // Auth kit to manage signIn to cookies
    const signIn = useSignIn()

    // Form management
    const {
        register: formRegister,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
    } = useForm()

    // Form submission
    const onSubmit = async (data) => {
        // Login user
        const responseData = await login(data)

        // Check token is in response data
        if (responseData?.token && responseData?.user) {
            // Manage signIn and cookie storage
            signIn({
                token: responseData.token,
                expiresIn: 3600,
                tokenType: 'Bearer',
                authState: { user: responseData.user },
            })

            // Navigate to home page (Dashboard)
            navigate('/')
        } else if (responseData?.errors || responseData?.error) {
            // Manage errors
            setError('backendErrors', {
                type: 'manual',
                message: responseData.errors || Array(responseData.error),
            })
        }
    }

    const handleFormChange = () => {
        // Reset errors when the form changes
        reset({ errors: {} })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={handleFormChange}
            className='space-y-2'
        >
            <div>
                <h1 className='my-4 font-bold'>Login</h1>
            </div>

            <div>
                <input
                    {...formRegister('email', { required: 'Email required' })}
                    defaultValue=''
                    type='email'
                    className='input input-bordered w-full'
                    placeholder='Email'
                    autoComplete='email'
                />
            </div>

            <div>
                <input
                    {...formRegister('password', {
                        required: true,
                        minLength: 6,
                    })}
                    defaultValue=''
                    type='password'
                    className='input input-bordered w-full'
                    placeholder='Password'
                />
            </div>

            {/* Print useForm validation errors */}
            {errors.email && (
                <div className='alert alert-error rounded-md'>
                    {errors.email.message}
                </div>
            )}
            {errors.password?.type === 'required' && (
                <div className='alert alert-error rounded-md'>
                    Password required
                </div>
            )}
            {errors.password?.type === 'minLength' && (
                <div className='alert alert-error rounded-md'>
                    Password must be at least 6 characters
                </div>
            )}

            {/* Print any server provided errors */}
            {errors?.backendErrors &&
                errors.backendErrors.message.map((error, index) => {
                    return (
                        <div
                            key={index}
                            className='alert alert-error rounded-md'
                        >
                            {error}
                        </div>
                    )
                })}

            <div className='pt-2'>
                <button className='btn btn-primary w-full'>LOGIN</button>
            </div>

            <p>
                {"Don't have an account? "}
                <Link className='underline' to='/register'>
                    Register
                </Link>
            </p>

            <p>
                {'Or manage a new building '}
                <Link className='underline' to='/newbuilding'>
                    here
                </Link>
            </p>
        </form>
    )
}
