import { useForm } from 'react-hook-form'
import { createTodo } from '../../api/todos'
import { useAuthUser } from 'react-auth-kit'
import { getBudgets } from '../../api/budget'
import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { convertDateInput } from '../../utils/helperFunctions'
import SubmitButton from '../SubmitButton'


// eslint-disable-next-line react/prop-types
export default function TaskForm() {
    // Access authorised user data from cookies
    const auth = useAuthUser()
    const user = auth().user

    const queryClient = useQueryClient()

    // Form management
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
        clearErrors
    } = useForm()

    // Get budgets list
    const { data } = useQuery({
        queryKey: ['budgets'],
        queryFn: getBudgets
    })

    // Clears form input when modal is closed when clicking backdrop
    useEffect(() => {
        document.querySelector(".modal-backdrop").addEventListener('click', (event) => {
            reset()
        })
    }, [])

    const handleCreate = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            // Reset form values
            reset()

            window.create_task_modal.close()

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log(error)

            if (error.response.data?.errors || error.response.data?.error) {

                // Extract errors
                if (error.response.data.error) {
                    setError("backendErrors", { type: "manual", message: Array(error.response.data.error) })
                } else if (error.response.data.errors) {
                    setError("backendErrors", { type: "manual", message: error.response.data.errors })

                }
            }

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    // Form submission
    const onSubmit = async (data) => {
        // Add user and building IDs to data
        const cleanedData = {
            building: user.building._id,
            author: user._id
        }

        // Add submitted data to cleaned data object
        Object.keys(data).forEach(key => {
            if (data[key]) {
                cleanedData[key] = data[key]
            }
        })

        handleCreate.mutate(cleanedData)

        reset()
    }

    // Reset errors when the form changes
    const handleFormChange = () => {
        reset({ errors: {} });
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange} className='modal-box rounded-lg space-y-3 max-w-md'>
            <div>
                <h1 className='my-4 font-bold text-lg'>Start a new task!</h1>
            </div>

            <div>
                <input
                    {...register('title', { required: 'Title is required' })}
                    defaultValue=''
                    type='text'
                    className='input input-bordered w-full'
                    placeholder='Title *'
                />
                {errors.title && <div className='mt-2 p-3 alert alert-error rounded-md'>{errors.title.message}</div>}
            </div>

            <div>
                <input
                    {...register('description', { required: 'Description required' })}
                    defaultValue=''
                    type='text'
                    className='input input-bordered w-full'
                    placeholder='Description *'
                />
                {errors.description && <div className='mt-2 p-3 alert alert-error rounded-md'>{errors.description.message}</div>}
            </div>

            <div>
                <select
                    {...register('status')}
                    defaultValue=''
                    className='input input-bordered w-full text-slate-400 cursor-pointer'
                    placeholder=''
                >
                    <option value='' disabled>Select status</option>
                    <option value='pending'>pending</option>
                    <option value='active'>active</option>

                </select>
            </div>

            <div className='flex gap-2 justify-between'>
                <div>
                    <span className="label label-text">Due date</span>
                    <input
                        {...register('dueDate', {
                            validate: value => {
                                if (!value) {
                                    return true
                                }
                                // Check if date is in the past
                                const selectedDate = new Date(value);
                                const today = new Date();
                                return selectedDate >= today || 'Due date must be a future date';
                            }
                        })}
                        min={convertDateInput(new Date())}
                        type="date"
                        className="bg-base-200 px-4 py-3 rounded-md text-label border-none cursor-pointer"
                    />
                </div>
            </div>

            <div className='flex flex-grow items-center py-2'>

                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        {...register('needsVote')}
                        type="checkbox"
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-success"></div>
                    <span className="ml-3 text-sm font-medium label-text">Needs vote</span>
                </label>
            </div>

            {errors.dueDate && <div className='alert alert-error rounded-md'>{errors.dueDate.message}</div>}

            <div>
                {/* If no budgets found, disable cost input */}
                {data?.length > 0 ?
                    <input
                        {...register('cost')}
                        defaultValue=''
                        type='text'
                        className='input input-bordered w-full'
                        placeholder='Cost'
                    />
                    :
                    <input
                        {...register('cost')}
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
                    {...register('budget')}
                    defaultValue=''
                    className='input input-bordered w-full cursor-pointer text-slate-400'>

                    {/* Update description if no budgets */}
                    <option value='' disabled>{data?.length > 0 ? "Select budget" : "No budgets"}</option>


                    {/* List budgets options */}
                    {data && data.map(budget => {
                        return (<option key={budget._id} value={budget._id}>{budget.name}</option>)
                    })}

                </select>
            </div>

            {/* Print any server provided errors */}
            {errors?.backendErrors && errors.backendErrors.message.map((error, index) => {
                return <div key={index} className='alert alert-error rounded-md'>{error}</div>
            })}

            <div className='pt-2'>
                {handleCreate.isLoading ?
                    <button type='submit' className='btn btn-primary w-full'><div className="flex items-center">
                        <span className="loading loading-dots loading-sm m-auto"></span>
                    </div></button>
                    :
                    <button type='submit' className='btn btn-primary w-full'>CREATE TASK</button>
                }
            </div>

        </form>

    )
}