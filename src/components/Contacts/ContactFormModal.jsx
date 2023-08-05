import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthUser } from 'react-auth-kit'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createContact } from '../../api/contacts'


export default function ContactFormModal() {
    const queryClient = useQueryClient()
    const auth = useAuthUser()
    const buildingId = auth().user.building._id
    const [queryErrors, setQueryErrors] = useState()

    const handleCreateContact = useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            window.create_contact_modal.close()
            setQueryErrors()
            queryClient.invalidateQueries({ queryKey: ['contacts'] })
        },
        onError: (error) => {
            setQueryErrors(error.response.data.errors)
        }
    })

    // Form management
    const {
        register: formRegister,
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
        const newContact = {
            name: formData.contactName,
            phoneNumber: formData.contactPhone,
            occupation: formData.contactOccupation,
            building: buildingId
        }

        // Send create contact data
        handleCreateContact.mutate(newContact)

        // Reset form values
        reset();

    }

    const handleFormChange = () => {
        // Reset errors when the form changes
        reset({ errors: {} });
        setQueryErrors()
    };
    return (
        <div className='modal-box rounded-lg space-y-3 max-w-md'> {/* Add building contact */}
            <h1 className='my-4 font-bold text-2xl'>Add building contact</h1>
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange} className='flex flex-col gap-3'>
                {/* Name field */}
                <div>
                    <label className="label">
                        <span className="label-text">Contact name</span>
                    </label>
                    <input
                        {...formRegister('contactName', { required: 'Contact name required' })}
                        defaultValue=""
                        type='text'
                        className='input input-bordered w-full'
                    />
                </div>

                {errors.contactName && <div className='alert alert-error rounded-md'>{errors.contactName.message}</div>}

                {/* Phone field */}
                <div>
                    <label className="label">
                        <span className="label-text">Contact phone</span>
                    </label>
                    <input
                        {...formRegister('contactPhone', {
                            required: 'Contact phone required', pattern: /^\d+$/
                        })}
                        defaultValue=""
                        type='number'
                        className='input input-bordered  w-full'
                    />
                </div>
                {errors.contactPhone && <div className='alert alert-error rounded-md'>{errors.contactPhone.message}</div>}

                {/* Occupation field */}
                <div>
                    <label className="label">
                        <span className="label-text">Occupation</span>
                    </label>
                    <select
                        {...formRegister('contactOccupation', { required: 'Occupation required' })}
                        defaultValue=''
                        className='input input-bordered w-full'
                    >
                        <option value='' disabled>Select Occupation</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Cleaning">Cleaning</option>
                    </select>
                </div>

                {errors.contactOccupation && <div className='alert alert-error rounded-md'>{errors.contactOccupation.message}</div>}

                {/* Error display */}
                <div className='mt-4'>
                    {/* Display errors */}
                    {queryErrors && queryErrors.map((error, index) => {
                        return <div key={index} className='alert alert-error rounded-md w-fit'>{error}</div>
                    })}
                </div>

                <div className="flex gap-2 pt-4">
                    <button className='btn btn-primary w-full' type='submit' name="createContact">Create contact</button>
                </div>
            </form>
        </div>
    )
}
