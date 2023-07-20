import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNotice } from '../../api/notices'
import { useState } from 'react'
import { useAuthUser } from 'react-auth-kit'

export default function CreateNoticeForm() {
    // Access authorised user data from cookies
    const auth = useAuthUser()
    const user = auth().user

    const [isLoading, setIsLoading] = useState(false)

    const [selectedImage, setSelectedImage] = useState('') // actual blob image data

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
    } = useForm()

    const queryClient = useQueryClient()

    // Utility function to convert File object to base64 string
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () => {
                const base64String = reader.result.split(',')[1]
                resolve(base64String)
            }

            reader.onerror = (error) => {
                reject(error)
            }

            reader.readAsDataURL(file)
        })
    }

    const createNoticeMutation = useMutation({
        mutationFn: createNotice,
        onSuccess: () => {
            queryClient.invalidateQueries(['notices'])
            console.log('success')
        },
        onError: (error) => {
            // Manage errors
            if (error?.errors || error?.error) {
                setError('backendErrors', {
                    type: 'manual',
                    message: error.errors || Array(error.error),
                })
            }
        },
    })

    async function mySubmit(data) {
        // Use FormData API to create multipart form data
        // Needed because react-hook-form can't handle file inputs
        // const formData = new FormData()

        // // Add all properties from react-hook-form's data to the formData
        // for (const key in data) {
        //     formData.append(key, data[key])
        // }

        // // Add image File object to formData
        // formData.append('image', selectedImage)

        // // Print out formData
        // for (const value of formData.values()) {
        //     console.log(value)
        // }

        // console.log(selectedImage)

        let b64_image

        try {
            b64_image = await fileToBase64(selectedImage)
        } catch (err) {
            console.log('error converting image')
        }

        // Add image as base64 string
        data = {
            ...data, // form data
            image: `data:image/jpeg;base64,${b64_image}`,
            building: user.building._id,
            author: user._id,
        }

        // Send post request
        createNoticeMutation.mutate(data)

        // Reset form inputs
        reset()

        // Close modal
        window.create_notice_modal.close()
    }

    const handleImageSelect = (event) => {
        // Extract File object
        const images = event.target.files // FileList
        const image = images[0] // File

        // const imageUrl = URL.createObjectURL(image)

        // console.log(image)
        // console.log(imageUrl)

        setSelectedImage(image)
    }

    return (
        <form
            onSubmit={handleSubmit(mySubmit)}
            method='dialog'
            className='modal-box rounded-lg'
        >
            <div className='space-y-4'>
                <input
                    {...register('title', {
                        required: 'Title required',
                    })}
                    defaultValue='Test title'
                    type='text'
                    className='input input-bordered w-full'
                    placeholder='Title'
                />
                <input
                    {...register('message', {
                        required: 'Message required',
                    })}
                    defaultValue='Test message'
                    type='text'
                    className='input input-bordered w-full'
                    placeholder='Message'
                />

                <div>
                    <label
                        htmlFor='image-select'
                        className='grid place-items-center input input-bordered border-dashed border-2 h-16'
                    >
                        <span>Click to select image</span>
                        <input
                            // {...register('image')} // doesn't seem to work with react-hook-form
                            accept='image/*'
                            type='file'
                            id='image-select'
                            className='hidden'
                            onChange={handleImageSelect}
                        />
                    </label>
                </div>

                {selectedImage && (
                    <div>
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt=''
                            className=''
                        />
                    </div>
                )}

                {/* Print useForm validation errors */}
                {errors.title && (
                    <div className='alert alert-error rounded-md'>
                        {errors.title.message}
                    </div>
                )}
                {errors.message && (
                    <div className='alert alert-error rounded-md'>
                        {errors.message.message}
                    </div>
                )}

                {errors?.backendErrors &&
                    errors.backendErrors.message.map((error, index) => {
                        return (
                            <div
                                key={index}
                                className='alert alert-error rounded-md'
                            >
                                {error}
                            </div>
                        )
                    })}
            </div>

            <div className='modal-action'>
                {/* if there is a button in form, it will close the modal */}
                <button className='btn btn-primary w-full normal-case'>
                    Create Notice
                </button>
            </div>
        </form>
    )
}
