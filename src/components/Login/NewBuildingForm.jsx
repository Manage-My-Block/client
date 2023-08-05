import { useForm } from 'react-hook-form'
import { newBuilding } from '../../api/auth'
import { Link, useNavigate } from "react-router-dom"
import { useSignIn } from 'react-auth-kit'
import SubmitButton from '../SubmitButton'

// eslint-disable-next-line react/prop-types
export default function NewBuildingForm() {
    // Navigation hook
    const navigate = useNavigate()

    // Auth kit to manage signIn to cookies
    const signIn = useSignIn()

    // Form management
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset
    } = useForm()

    // Form submission
    const onSubmit = async (data) => {
        // Clean up data before sending
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

        // Make POST request to register user and building
        const responseData = await newBuilding(cleanedData)

        // Check token is in response data
        if (responseData?.token && responseData?.user) {
            // Manage signIn and cookie storage
            signIn({
                token: responseData.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { user: responseData.user }
            })

            // Navigate to home page (Dashboard)
            navigate('/')

        } else if (responseData?.errors || responseData?.error) {

            // Manage errors
            setError("backendErrors", { type: "manual", message: responseData.errors || Array(responseData.error) })

        }
    }

    const handleFormChange = () => {
        // Reset errors when the form changes
        reset({ errors: {} });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange} className='space-y-2 max-w-md'>

            <div>
                <h1 className='my-4 font-bold'>Create A New Building</h1>
            </div>

            <div>
                <input
                    {...register('buildingName', { required: "Apartment number required" })}
                    defaultValue=''
                    type='text'
                    className='input input-bordered w-full'
                    placeholder='Building name'
                />
            </div>

            <div>
                <input
                    {...register('address', { required: "Address required" })}
                    defaultValue=''
                    type='text'
                    className='input input-bordered w-full'
                    placeholder='Address'
                />
            </div>

            <div>
                <input
                    {...register('apartmentCount', { required: "Apartmen count required" })}
                    defaultValue=''
                    type='number'
                    className='input input-bordered w-full'
                    placeholder='Number of apartments'
                />
            </div>

            <div>
                <h1 className='my-4 mt-6 font-bold'>Building Manager</h1>
            </div>

            <div>
                <input
                    {...register('email', { required: 'Email required' })}
                    defaultValue=''
                    type='email'
                    className='input input-bordered w-full'
                    placeholder='Email'
                    autoComplete='email'
                />
            </div>

            <div>
                <input
                    {...register('password', { required: true, minLength: 6 })}
                    defaultValue=''
                    type='password'
                    className='input input-bordered w-full'
                    placeholder='Password'
                    autoComplete='new-password'
                />
            </div>

            {/* Print useForm validation errors */}
            {errors.email && <div className='alert alert-error rounded-md'>{errors.email.message}</div>}
            {errors.password?.type === 'required' && <div className='alert alert-error rounded-md'>Password required</div>}
            {errors.password?.type === 'minLength' && <div className='alert alert-error rounded-md'>Password must be at least 6 characters</div>}

            {/* Print any server provided errors */}
            {errors?.backendErrors && errors.backendErrors.message.map((error, index) => {
                return <div key={index} className='alert alert-error rounded-md'>{error}</div>
            })}

            <div className='pt-2'>
                {/* <button className='btn btn-primary w-full'>MANAGE BUILDING</button> */}
                <SubmitButton onClick={() => handleSubmit(onSubmit)} label={'MANAGE BUILDING'} loadingState={false} classString={'btn btn-primary w-full'} />

            </div>

            <p>{"Already have an account? "}<Link className="underline" to="/login">Login</Link></p>

        </form>
    )
}
