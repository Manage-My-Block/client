import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createMeeting } from '../../api/meetings'
import { convertDateInput } from '../../utils/helperFunctions'

export default function MeetingModalCreate() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
    } = useForm()

    const queryClient = useQueryClient()

    const createMeetingMutation = useMutation({
        mutationFn: createMeeting,
        onSuccess: () => {
            queryClient.invalidateQueries(['meetings'])
        },
        onError: (error) => {
            // Manage errors
            if (error?.errors || error?.error) {
                setError("backendErrors", { type: "manual", message: error.errors || Array(error.error) })
            }

        }
    })

    async function onSubmit(data) {
        console.log('Meeting data submitted: ', data)

        createMeetingMutation.mutate(data)

        // Rest form inputs
        reset()

        // Close modal
        window.meeting_modal_create.close()
    }

    return (
        <dialog id='meeting_modal_create' className='modal'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                method='dialog'
                className='modal-box rounded-lg'
            >
                <div className='space-y-4'>
                    <input
                        {...register('title', {
                            required: 'Title required',
                        })}
                        defaultValue=''
                        type='text'
                        className='input input-bordered w-full'
                        placeholder='Title'
                    />
                    <input
                        {...register('description', {
                            required: 'Description required',
                        })}
                        defaultValue=''
                        type='text'
                        className='input input-bordered w-full'
                        placeholder='Description'
                    />
                    <input
                        {...register('zoomLink', {
                            required: 'Zoom Link required',
                        })}
                        defaultValue=''
                        type='text'
                        className='input input-bordered w-full'
                        placeholder='Zoom Link'
                    />
                    <div>
                        <span className='label label-text'>Meeting Date</span>
                        <input
                            {...register('meetingDate', {
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

                    {/* Print useForm validation errors */}
                    {errors.title && (
                        <div className='alert alert-error rounded-md'>
                            {errors.title.message}
                        </div>
                    )}
                    {errors.description && (
                        <div className='alert alert-error rounded-md'>
                            {errors.description.message}
                        </div>
                    )}
                    {errors.zoomLink && (
                        <div className='alert alert-error rounded-md'>
                            {errors.zoomLink.message}
                        </div>
                    )}
                    {errors.meetingDate && (
                        <div className='alert alert-error rounded-md'>
                            {errors.meetingDate.message}
                        </div>
                    )}

                    {errors?.backendErrors && errors.backendErrors.message.map((error, index) => {
                        return <div key={index} className='alert alert-error rounded-md'>{error}</div>
                    })}
                </div>

                <div className='modal-action'>
                    {/* if there is a button in form, it will close the modal */}
                    <button className='btn btn-primary w-full normal-case'>
                        Create Meeting
                    </button>
                </div>
            </form>

            {/* second form with 'modal-backdrop' class covers the screen so we can close the modal when clicked outside */}
            <form method='dialog' className='modal-backdrop'>
                <button>close</button>
            </form>
        </dialog>
    )
}
