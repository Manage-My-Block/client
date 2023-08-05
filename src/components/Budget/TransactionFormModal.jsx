import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { upateBudget } from '../../api/budget'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toNumber } from 'lodash'

export default function TransactionFormModal({ budgetId }) {
    const queryClient = useQueryClient()

    const [queryErrors, setQueryErrors] = useState()

    const handleUpdateBudget = useMutation({
        mutationFn: upateBudget,
        onSuccess: () => {

            window[`create_transaction_modal_${budgetId}`].close()

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
        const updatedBudgetData = { transaction: {} }
        try {
            // Clean up contact data
            updatedBudgetData.transaction.description = formData.description
            updatedBudgetData.transaction.amount = toNumber(formData.amount)
        } catch (error) {
            setQueryErrors(["Amount must be a number."])
            return
        }

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
            <h1 className='my-4 font-bold text-2xl'>Create a transaction</h1>
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange} className='flex flex-col gap-3'>
                {/* Description field */}
                <div>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input
                        {...register('description', { required: 'Description required' })}
                        defaultValue=""
                        type='text'
                        className='input input-bordered w-full'
                    />
                </div>

                {errors.description && <div className='alert alert-error rounded-md'>{errors.description.message}</div>}

                {/* Amount field */}
                <div className='relative'>
                    <label className="label">
                        <span className="label-text">Amount</span>
                    </label>
                    <span className='absolute text-lg top-[46px] left-4'>$</span>
                    <input
                        {...register('amount', {
                            required: 'Amount  required',
                            pattern: {
                                value: /^\d+(\.\d{1,2})?$/,
                                message: 'Amount must be a positive integer or a number with at most two decimals'
                            }
                        })}
                        defaultValue=""
                        type='text'
                        className='input input-bordered pl-8 w-full'
                    />
                </div>
                {errors.amount && <div className='alert alert-error rounded-md'>{errors.amount.message}</div>}

                {/* Error display */}
                <div className='mt-4'>
                    {/* Display errors */}
                    {queryErrors && queryErrors.map((error, index) => {
                        return <div key={index} className='alert alert-error rounded-md w-fit'>{error}</div>
                    })}
                </div>

                <div className="flex gap-2 pt-4">
                    <button className='btn btn-primary w-full' type='submit' name="createContact">Create transaction</button>
                </div>
            </form>
        </div>
    )
}
