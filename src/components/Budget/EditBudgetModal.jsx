import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { upateBudget, deleteBudget } from '../../api/budget'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toNumber } from 'lodash'

export default function EditBudgetModal({ budgetId }) {
    const queryClient = useQueryClient()

    const [queryErrors, setQueryErrors] = useState()

    const handleUpdateBudget = useMutation({
        mutationFn: upateBudget,
        onSuccess: () => {

            window[`edit_budget_modal_${budgetId}`].close()

            reset()

            setQueryErrors()

            queryClient.invalidateQueries({ queryKey: ['budgets'] })
        },
        onError: (error) => {
            setQueryErrors(error.response.data.errors)
        }
    })

    const handleDeleteBudget = useMutation({
        mutationFn: deleteBudget,
        onSuccess: () => {

            window[`edit_budget_modal_${budgetId}`].close()

            reset()

            setQueryErrors()

            queryClient.invalidateQueries({ queryKey: ['budgets'] })
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
    const onSubmit = async (formData) => {
        const updatedBudgetData = { name: formData.name }

        console.log(updatedBudgetData)

        // Send create contact data
        handleUpdateBudget.mutate({ budgetId, updatedBudgetData })

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
            <h1 className='my-4 font-bold text-2xl'>Edit budget</h1>
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange} className='flex flex-col gap-3'>
                {/* Name field */}
                <div className=''>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        {...register('name', { required: 'Name  required' })}
                        defaultValue=""
                        type='text'
                        className='input input-bordered w-full'
                    />
                </div>
                {errors.name && <div className='alert alert-error rounded-md'>{errors.name.message}</div>}

                {/* Error display */}
                <div className='mt-4'>
                    {/* Display errors */}
                    {queryErrors && queryErrors.map((error, index) => {
                        return <div key={index} className='alert alert-error rounded-md w-fit'>{error}</div>
                    })}
                </div>

                <div className="flex gap-2 pt-4">
                    <button className='btn btn-primary w-full' type='submit' name="createContact">Update budget</button>
                </div>

                <div className="flex gap-2 pt-4">
                    <button className='btn btn-error btn-outline w-full' type='submit' name="createContact" onClick={() => handleDeleteBudget.mutate(budgetId)}>Delete budget</button>
                </div>
            </form>
        </div>
    )
}
