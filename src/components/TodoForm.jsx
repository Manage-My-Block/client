import { useForm } from 'react-hook-form'
import { createTodo } from '../api/todos'
import { useAuthUser } from 'react-auth-kit'
import './TodoForm.css'
import { getBudgets } from '../api/budget'
import { useState } from 'react'
import { useTaskStore } from "../stores/TaskStore"
import { useNavigate } from 'react-router-dom'

import { Modal, Button } from 'flowbite-react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"


// eslint-disable-next-line react/prop-types
export default function TodoForm() {
    // Access authorised user data from cookies
    const auth = useAuthUser()
    const user = auth().user

    const queryClient = useQueryClient()

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

    const handleCreate = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            console.log('on success')

            // Close modal
            setOpenModal(undefined)

            // Reset form values
            reset()

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log('on error')
            console.log(error)

            if (error?.errors || error?.error) {

                // Manage errors
                setError("backendErrors", { type: "manual", message: error.errors || Array(error.error) })
            }

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    // Form submission
    const onSubmit = async (data) => {
        // Add user and building IDs to data
        data.building = user.building._id
        data.author = user._id

        // Create new Todo
        // const responseData = await createTodo(data)

        handleCreate.mutate(data)

        // // Check todo ID is in response data
        // if (responseData._id) {

        //     // Close modal
        //     setOpenModal(undefined)

        //     // Reset form values
        //     reset()

        //     setIsSubmitted(true)

        // } else if (responseData?.errors || responseData?.error) {

        //     // Manage errors
        //     setError("backendErrors", { type: "manual", message: responseData.errors || Array(responseData.error) })

        // }
    }

    const [openModal, setOpenModal] = useState();

    return (
        <>
            <button
                onClick={() => setOpenModal('form-elements')}
                className='btn btn-primary' type='submit'>
                Create task
            </button>

            <Modal
                show={openModal === 'form-elements'}
                size="md"
                dismissible
                popup
                onClose={() => setOpenModal(undefined)}>

                <Modal.Header
                    className='bg-gray-800 absolute right-0'>
                </Modal.Header>

                <Modal.Body
                    className='bg-gray-800 text-white'>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-md">
                        <div>
                            <h1 className='my-4 font-bold text-lg'>Start a new task!</h1>
                        </div>

                        <div>
                            <input
                                {...formRegister('title', { required: 'Title is required' })}
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
                                {...formRegister('status', { required: 'Status is required' })}
                                defaultValue=''
                                className='input input-bordered w-full text-slate-400'
                                placeholder='test'
                            >
                                <option value='' disabled>Select status *</option>
                                <option value='pending'>pending</option>
                                <option value='started'>started</option>

                            </select>
                        </div>

                        <div className='flex gap-2 justify-between'>
                            <div>
                                <span className="label label-text">Due date *</span>
                                <input
                                    {...formRegister('dueDate', { required: 'Due date required' })}
                                    type="date"
                                    className="bg-base-100"
                                />
                            </div>

                            <div className='flex flex-grow items-center justify-center'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        {...formRegister('needsVote')}
                                        type="checkbox"
                                        value=""
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                                    <span className="ml-3 text-sm font-medium label-text">Needs vote</span>
                                </label>
                            </div>
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