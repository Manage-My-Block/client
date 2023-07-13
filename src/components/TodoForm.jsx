import { useForm } from 'react-hook-form'
import { createTodo } from '../api/todos'
import { useAuthUser } from 'react-auth-kit'
import './TodoForm.css'


export default function TodoForm() {
    const auth = useAuthUser()
    const user = auth().user

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
        data.building = user.building._id
        data.author = user._id

        // Login user
        const responseData = await createTodo(data)

        // Check todo is in response data
        if (responseData.todo) {

            //

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
        <>
            <button className="btn" onClick={() => window.my_modal_2.showModal()}>Create a new task</button>
            <dialog id="my_modal_2" className="modal">

                <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange} method="dialog" className="modal-box space-y-2 max-w-md">
                    <div>
                        <h1 className='my-4 font-bold'>Start a new task!</h1>
                    </div>

                    <div>
                        <input
                            {...formRegister('title', { required: 'Title required' })}
                            defaultValue=''
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Title'
                        />
                    </div>

                    <div>
                        <input
                            {...formRegister('description', { required: 'Description required' })}
                            defaultValue=''
                            type='text'
                            className='input input-bordered w-full'
                            placeholder='Description'
                        />
                    </div>

                    <div>
                        <label className="label cursor-pointer">
                            <span className="label-text">Requires vote</span>
                            <input {...formRegister('needsVote')} type="checkbox" className="toggle toggle-accent" />
                        </label>
                    </div>

                    <div>
                        <label className="label cursor-pointer">
                            <span className="label-text">Due date</span>
                            <input
                                {...formRegister('dueDate')}
                                type="date" id="start" name="trip-start" />
                        </label>

                    </div>

                    {/* <div>
                        <select
                            {...formRegister('status')}
                            defaultValue=''
                            className='input input-bordered w-full'
                        >
                            <option value='' disabled>Select status</option>
                            <option value='pending'>pending</option>
                            <option value='started'>started</option>

                        </select>
                    </div> */}

                    {/* Print useForm validation errors */}
                    {errors.title && <div className='alert alert-error rounded-md'>{errors.title.message}</div>}
                    {errors.description && <div className='alert alert-error rounded-md'>{errors.description.message}</div>}

                    {/* Print any server provided errors */}
                    {errors?.backendErrors && errors.backendErrors.message.map((error, index) => {
                        return <div key={index} className='alert alert-error rounded-md'>{error}</div>
                    })}

                    <div className='pt-2'>
                        <button className='btn btn-primary w-full'>Create task</button>
                    </div>

                </form>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>

            </dialog>
        </>
    )
}

            // <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange} className='space-y-2 max-w-md'>
            //     <div>
            //         <h1 className='my-4 font-bold'>Login</h1>
            //     </div>

            //     <div>
            //         <input
            //             {...formRegister('title', { required: 'Email required' })}
            //             defaultValue=''
            //             type='text'
            //             className='input input-bordered w-full'
            //             placeholder='Title'
            //         />
            //     </div>

            //     <div>
            //         <input
            //             {...formRegister('description', { required: true, minLength: 6 })}
            //             defaultValue=''
            //             type='text'
            //             className='input input-bordered w-full'
            //             placeholder='Description'
            //         />
            //     </div>

            //     <div>
            //         <select
            //             {...formRegister('status', { required: 'Apartment number required' })}
            //             defaultValue=''
            //             className='input input-bordered w-full'
            //         >
            //             <option value='' disabled>Select status</option>
            //             <option value='pending'>pending</option>
            //             <option value='started'>pending</option>

            //         </select>
            //     </div>

            //     <div>
            //         <input
            //             {...formRegister('completed', { required: 'Apartment number required' })}
            //             type="checkbox"
            //             className="toggle"
            //             checked />
            //     </div>

            //     <div>
            //         <input
            //             {...formRegister('completed', { required: 'Apartment number required' })}
            //             type="checkbox"
            //             className="toggle"
            //             checked />
            //     </div>


            //     {/* Print useForm validation errors */}
            //     {errors.email && <div className='alert alert-error rounded-md'>{errors.email.message}</div>}
            //     {errors.password?.type === 'required' && <div className='alert alert-error rounded-md'>Password required</div>}
            //     {errors.password?.type === 'minLength' && <div className='alert alert-error rounded-md'>Password must be at least 6 characters</div>}

            //     {/* Print any server provided errors */}
            //     {errors?.backendErrors && errors.backendErrors.message.map((error, index) => {
            //         return <div key={index} className='alert alert-error rounded-md'>{error}</div>
            //     })}

            //     <div className='pt-2'>
            //         <button className='btn btn-primary w-full'>LOGIN</button>
            //     </div>

            //     <p>{"Don't have an account? "}<Link className="underline" to="/register">Register</Link></p>

            //     <p>{"Or manage a new building "}<Link className="underline" to="/newbuilding">here</Link></p>

            // </form> 