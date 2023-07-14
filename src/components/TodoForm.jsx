import { useForm } from 'react-hook-form'
import { createTodo } from '../api/todos'
import { useAuthUser } from 'react-auth-kit'
import './TodoForm.css'
import { getBudgets } from '../api/budget'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTaskStore } from "../stores/TaskStore"
import { useNavigate } from 'react-router-dom'

import { Button, Modal } from 'flowbite-react';



// eslint-disable-next-line react/prop-types
export default function TodoForm({ isSubmitted, setIsSubmitted }) {
    // Access authorised user data from cookies
    const auth = useAuthUser()
    const user = auth().user

    const navigate = useNavigate()

    // Store new tasks in Query story
    // const addTask = useTaskStore((state) => state.addTask)

    // Manage modal popup
    // const [isSubmitted, setIsSubmitted] = useState(false);

    // Form management
    const {
        register: formRegister,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
    } = useForm()

    // Get budgets list
    const { data } = useQuery({
        queryKey: ['budgets'],
        queryFn: getBudgets
    })

    // Form submission
    const onSubmit = async (data) => {
        data.building = user.building._id
        data.author = user._id

        console.log(data)

        // Login user
        const responseData = await createTodo(data)

        console.log(responseData)

        // Check todo ID is in response data
        if (responseData._id) {

            // Close modal
            setIsSubmitted(true)

            setOpenModal(undefined)

            reset({ errors: {} })

        } else if (responseData?.errors || responseData?.error) {

            // Manage errors
            setError("backendErrors", { type: "manual", message: responseData.errors || Array(responseData.error) })

        }
    }

    const handleFormChange = () => {
        // Reset errors when the form changes
        // reset({ errors: {} });
    };

    const [openModal, setOpenModal] = useState();

    return (
        <>
            <Button
                onClick={() => setOpenModal('form-elements')}
                className="btn bg-green-700">Create task</Button>

            <Modal
                dismissible
                show={openModal === 'form-elements'}
                size="md"
                popup
                className='overflow-hidden bg-transparent'
                onClose={() => {
                    setOpenModal(undefined)
                    reset();
                }}>

                <Modal.Header
                    className='bg-slate-800 absolute right-0'>
                </Modal.Header>

                <Modal.Body
                    className='bg-slate-800 text-white'>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-md">
                        <div>
                            <h1 className='my-4 font-bold text-lg'>Start a new task!</h1>
                        </div>

                        <div>
                            <input
                                {...formRegister('title', { required: 'Title required' })}
                                defaultValue=''
                                type='text'
                                className='input input-bordered w-full'
                                placeholder='Title *'
                            />
                        </div>

                        <div>
                            <input
                                {...formRegister('description', { required: 'Description required' })}
                                defaultValue=''
                                type='text'
                                className='input input-bordered w-full'
                                placeholder='Description *'
                            />
                        </div>

                        <div>
                            <select
                                {...formRegister('status')}
                                defaultValue=''
                                className='input input-bordered w-full text-slate-400'
                                placeholder='test'
                            >
                                <option value='' disabled>Select status *</option>
                                <option value='pending'>pending</option>
                                <option value='started'>started</option>

                            </select>
                        </div>

                        <div>
                            <label className="label cursor-pointer">
                                <span className="label-text">Due date *</span>
                                <input
                                    {...formRegister('dueDate', { required: 'Due date required' })}
                                    type="date"
                                    name="due-date"
                                    value={new Date().toISOString().split('T')[0]} />
                            </label>
                        </div>

                        <div>
                            <label className="label cursor-pointer">
                                <span className="label-text">Requires vote</span>
                                <input
                                    {...formRegister('needsVote')}
                                    type="checkbox"
                                    className="toggle toggle-accent" />
                            </label>
                        </div>

                        <div>
                            {data?.length > 0 ?
                                <input
                                    {...formRegister('cost')}
                                    defaultValue=''
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='Cost'
                                />
                                :
                                <input
                                    {...formRegister('cost')}
                                    defaultValue=''
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='Cost'
                                    disabled
                                />
                            }
                        </div>

                        <div>
                            <select
                                {...formRegister('budget')}
                                defaultValue=''
                                className='input input-bordered w-full'>

                                {/* Update description if no budgets */}
                                {data?.length > 0 ?
                                    <option value='' disabled>Select budget</option>
                                    :
                                    <option value='' disabled>No budgets</option>
                                }

                                {/* List budgets options */}
                                {data && data.map(budget => {
                                    return (<option key={budget._id} value={budget._id}>{budget.name}</option>)
                                })}

                            </select>
                        </div>



                        {/* Print useForm validation errors */}
                        {errors.title && <div className='alert alert-error rounded-md'>{errors.title.message}</div>}
                        {errors.description && <div className='alert alert-error rounded-md'>{errors.description.message}</div>}
                        {errors.dueDate && <div className='alert alert-error rounded-md'>{errors.dueDate.message}</div>}

                        {/* Print any server provided errors */}
                        {errors?.backendErrors && errors.backendErrors.message.map((error, index) => {
                            return <div key={index} className='alert alert-error rounded-md'>{error}</div>
                        })}

                        <div className='pt-2'>
                            <button className='btn btn-primary w-full' type='submit'>Create task</button>
                        </div>

                    </form>

                </Modal.Body>

            </Modal>

        </>
    )
}