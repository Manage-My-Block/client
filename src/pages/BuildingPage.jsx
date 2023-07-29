import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthUser } from 'react-auth-kit'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getBuilding, updateBuilding } from '../api/buildings'
import LoadingIcon from '../components/LoadingIcon'

export default function BuildingPage() {
    const queryClient = useQueryClient()
    const auth = useAuthUser()
    const buildingId = auth().user.building._id
    const [queryErrors, setQueryErrors] = useState()
    const [isSucceed, setIsSucceed] = useState(false)

    // Get Building info
    const buildingQuery = useQuery(['building', buildingId], () => getBuilding(buildingId));

    // Show success indicator
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

    // Form management
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    // Submit function for comment text field
    const onSubmit = async (formData, event) => {
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
            <div className='w-2/5 max-w-md m-auto'>
                {/* Update building */}
                <div>
                    <h1 className='my-4 font-bold text-2xl'>Update building info</h1>
                    <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
                        <div>
                            {/* Name field */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Building name</span>
                                </label>
                                <input
                                    {...register('name', "Building must have a name.")}
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
                                    {...register('address', "Building must have an address.")}
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
                                    {...register('apartmentCount', {
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
                </div>

                <div className="flex gap-2 pt-4">
                    {isSucceed && <div className="alert alert-success relative mt-4 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Building updated!</span>
                    </div>}
                </div>
            </div>
        </div>
    )
}
