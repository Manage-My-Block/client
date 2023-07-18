import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthUser } from 'react-auth-kit'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getBuilding, updateBuilding } from '../api/buildings'
import LoadingIcon from '../components/LoadingIcon'
import { createContact } from '../api/contacts'

export default function BuildingPage() {
    const queryClient = useQueryClient()
    const auth = useAuthUser()
    const buildingId = auth().user.building._id
    const [queryErrors, setQueryErrors] = useState()
    const [isSucceed, setIsSucceed] = useState(false)
    const [isAddContact, setIsAddContact] = useState(false)

    // const { data, isLoading, isError, error } = useQuery(['user', userId], () => getUser(userId));
    const buildingQuery = useQuery(['building', buildingId], () => getBuilding(buildingId));

    useEffect(() => {
        // Clear success indicator after a set time.
        const timeout = setTimeout(() => {
            setIsSucceed(false);
        }, 1200);

        // Clean up the timer when the component unmounts or the dependency changes.
        return () => clearTimeout(timeout);

    }, [isSucceed])

    const handleUpdateBuilding = useMutation({
        mutationFn: updateBuilding,
        onSuccess: () => {
            setIsSucceed(true)
            setQueryErrors()
            queryClient.invalidateQueries({ queryKey: ['building'] })
        },
        onError: (error) => {
            setQueryErrors(error.response.data.errors)
        }
    })

    const handleCreateContact = useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            setIsSucceed(true)
            setQueryErrors()
            queryClient.invalidateQueries({ queryKey: ['contact'] })
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

    // Submit function for comment text field
    const onSubmit = async (formData, event) => {

        if (event.nativeEvent.submitter.name === "updateBuilding") {
            // If user email is unchanged, don't send it
            if (formData.name === buildingQuery.data.name) {
                delete formData.name
            }

            // If address is unchanged
            if (formData.address.toString() === buildingQuery.data.address.toString()) {
                delete formData.address
            }

            // If apartment is unchanged
            if (formData.apartmentCount.toString() === buildingQuery.data.apartmentCount.toString()) {
                delete formData.apartmentCount
            }

            // Remove empty properties from data
            for (const key in formData) {
                if (Object.prototype.hasOwnProperty.call(formData, key)) {
                    if (formData[key] === null || formData[key] === undefined || formData[key] === '') {
                        delete formData[key];
                    }
                }
            }

            // If the formData is empty, don't submit
            if (Object.keys(formData).length < 1) {
                // Reset form values
                reset()
                return
            }

            // Clean up the data so it can be sent to the query
            const updatedBuilding = {
                buildingId: buildingId,
                buildingData: formData
            }

            // Send updated building data
            handleUpdateBuilding.mutate(updatedBuilding)

        } else if (event.nativeEvent.submitter.name === "createContact") {
            // Clean up contact data
            const newContact = {
                name: formData.contactName,
                phoneNumber: formData.contactPhone,
                occupation: formData.contactOccupation,
                building: buildingId
            }

            // Send create contact data
            handleCreateContact.mutate(newContact)
        }

        // Reset form values
        reset();

    }

    const handleFormChange = () => {
        // Reset errors when the form changes
        reset({ errors: {} });
        setQueryErrors()
    };

    if (buildingQuery.isLoading) return <LoadingIcon />
    if (buildingQuery.isError) return <div className='w-full h-screen flex justify-center'><h1>Error: {buildingQuery.error.message}</h1></div>

    return (
        <div className='w-full h-screen flex flex-col justify-center'>
            <div className='w-fit m-auto'>
                {/* Update building */}
                {!isAddContact && <div>
                    <h1 className='my-4 font-bold text-2xl'>Update building info</h1>
                    <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
                        <div>
                            {/* Name field */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Building name</span>
                                </label>
                                <input
                                    {...formRegister('name', "Building must have a name.")}
                                    defaultValue={buildingQuery.data.name}
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder={buildingQuery.data.name}
                                />
                            </div>

                            {/* Address field */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    {...formRegister('address', "Building must have an address.")}
                                    defaultValue={buildingQuery.data.address}
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='6 or more characters'
                                />
                            </div>

                            {/* Address field */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Number of apartments</span>
                                </label>
                                <input
                                    {...formRegister('apartmentCount', {
                                        required: false, pattern: /^\d+$/
                                    })}
                                    defaultValue={buildingQuery.data.apartmentCount}
                                    type='number'
                                    className='input input-bordered w-full'
                                    placeholder='Apartment count'
                                />
                            </div>

                            {/* Error display */}
                            <div className='mt-4'>
                                {/* Display errors */}
                                {queryErrors && queryErrors.map((error, index) => {
                                    return <div key={index} className='alert alert-error rounded-md w-fit'>{error}</div>
                                })}

                                {errors.name && <div className='alert alert-error rounded-md'>{errors.name.message}</div>}
                                {errors.address && <div className='alert alert-error rounded-md'>{errors.name.message}</div>}
                                {errors.apartmentCount && <div className='alert alert-error rounded-md'>{errors.name.apartmentCount}</div>}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <button className='btn btn-primary w-full' type='submit' name="updateBuilding">Update building</button>
                        </div>
                    </form>
                </div>}

                {/* Add building contact */}
                {isAddContact && <div>
                    <h1 className='my-4 font-bold text-2xl'>Add building contact</h1>
                    <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
                        <div>
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

                            {/* Phone field */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Contact phone</span>
                                </label>
                                <input
                                    {...formRegister('contactPhone', {
                                        required: false, pattern: /^\d+$/
                                    })}
                                    defaultValue=""
                                    type='number'
                                    className='input input-bordered  w-full'
                                />
                            </div>

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
                                    <option value="plumber">Plumber</option>
                                    <option value="electrician">Electrician</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="cleaning">Cleaning</option>
                                </select>

                            </div>

                            {/* Email field */}
                            {/* <div>
                                <label className="label">
                                    <span className="label-text">Contact email</span>
                                </label>
                                <input
                                    {...formRegister('contactEmail', { required: 'Email required' })}
                                    defaultValue=""
                                    type='email'
                                    className='input input-bordered'
                                />
                            </div> */}


                            {/* Error display */}
                            <div className='mt-4'>
                                {/* Display errors */}
                                {queryErrors && queryErrors.map((error, index) => {
                                    return <div key={index} className='alert alert-error rounded-md w-fit'>{error}</div>
                                })}

                                {errors.name && <div className='alert alert-error rounded-md'>{errors.name.message}</div>}
                                {errors.address && <div className='alert alert-error rounded-md'>{errors.name.message}</div>}
                                {errors.apartmentCount && <div className='alert alert-error rounded-md'>{errors.name.apartmentCount}</div>}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <button className='btn btn-primary w-full' type='submit' name="createContact">Create contact</button>
                        </div>
                    </form>
                </div>}

                <div className="flex gap-2 pt-4">
                    <button className='btn btn-neutral w-full' onClick={() => { setIsAddContact(!isAddContact); reset() }}>{isAddContact ? "Cancel" : "Add building contact"}</button>
                </div>

                <div className="flex gap-2 pt-4">

                    {isSucceed && <div className="alert alert-success relative mt-4 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{isAddContact ? "Contact created!" : "Building updated!"}</span>
                    </div>}
                </div>
            </div>
        </div>
    )
}
