import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthUser } from 'react-auth-kit'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createBudget } from '../../api/budget'


export default function BudgetFormModal() {
    const queryClient = useQueryClient()
    const auth = useAuthUser()
    const buildingId = auth().user.building._id
    const [queryErrors, setQueryErrors] = useState()

    const handleCreateBudget = useMutation({
        mutationFn: createBudget,
        onSuccess: () => {

            window.create_budget_modal.close()

            reset()

            setQueryErrors()

            queryClient.invalidateQueries({ queryKey: ['budget'] })
        },
        onError: (error) => {
            setQueryErrors(error.response.data.errors)
        }
    })

    // Form management
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    // Clears form input when modal is closed when clicking backdrop
    useEffect(() => {
        document.querySelector(".modal-backdrop").addEventListener('click', (event) => {
            reset()
        })
    }, [])

    // Submit function for comment text field
    const onSubmit = async (formData,) => {
        // Clean up contact data
        const newBudget = {
            name: formData.name,
            balance: formData.balance,
            building: buildingId
        }

        // Send create contact data
        handleCreateBudget.mutate(newBudget)

        // Reset form values
        reset();

    }

    const handleFormChange = () => {
        // Reset errors when the form changes
        reset({ errors: {} });
        setQueryErrors()
    };


    return (
        <div className='modal-box rounded-lg space-y-3 max-w-md'>
            <h1 className='my-4 font-bold text-2xl'>Start a new budget</h1>
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange} className='flex flex-col gap-3'>
                {/* Name field */}
                <div>
                    <label className="label">
                        <span className="label-text">Budget name</span>
                    </label>
                    <input
                        {...register('name', { required: 'Budget name required' })}
                        defaultValue=""
                        type='text'
                        className='input input-bordered w-full'
                    />
                </div>

                {errors.name && <div className='alert alert-error rounded-md'>{errors.name.message}</div>}

                {/* Balance field */}
                <div>
                    <label className="label">
                        <span className="label-text">Starting balance</span>
                    </label>
                    <input
                        {...register('balance', {
                            required: 'Contact phone required', pattern: /^\d+$/
                        })}
                        defaultValue=""
                        type='number'
                        className='input input-bordered  w-full'
                    />
                </div>
                {errors.balance && <div className='alert alert-error rounded-md'>{errors.balance.message}</div>}

                {/* Error display */}
                <div className='mt-4'>
                    {/* Display errors */}
                    {queryErrors && queryErrors.map((error, index) => {
                        return <div key={index} className='alert alert-error rounded-md w-fit'>{error}</div>
                    })}
                </div>

                <div className="flex gap-2 pt-4">
                    <button className='btn btn-primary w-full' type='submit' name="createContact">Create budget</button>
                </div>
            </form>
        </div>
    )
}
