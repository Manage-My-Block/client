import CommentList from '../CommentList'

import { convertDateString, convertToNaturalLanguage } from '../../utils/helperFunctions'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCommentNotice } from '../../api/notices'
import { useAuthUser } from 'react-auth-kit'
import SubmitButton from '../SubmitButton'

export default function NoticeItem({ notice, handleDelete }) {
    const authUser = useAuthUser()
    const user_ID = authUser()?.user?._id

    // Access React Query client
    const queryClient = useQueryClient()

    // Form management
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()


    // React query comment mutation
    const handleCommentNotice = useMutation({
        mutationFn: addCommentNotice,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['notices'] })
        },
        onError: (error) => {
            console.log(error)

            queryClient.invalidateQueries({ queryKey: ['notices'] })
        },
    })

    // Submit function for comment text field
    const onSubmit = async (data, event) => {
        // If data is empty don't do anything
        if (data.comment.length < 1) {
            return
        }

        // Clean up the data so it can be sent to the query
        const cleanedData = {
            comment: {
                comment: data.comment,
                user: user_ID
            },
            noticeId: notice._id
        }

        // Make API call with comment data
        handleCommentNotice.mutate(cleanedData)

        // After sending data, reset the field
        reset()
    }






    return (
        <div className='border border-neutral p-4 rounded mb-4'>
            <div className='flex gap-3'>
                {/* Image */}
                {notice.image && (
                    <div>
                        <img src={notice.image} alt='' className='w-48 mt-2' />
                    </div>
                )}
                {/* Title + Author  */}
                <div className='flex-1'>
                    <div className='flex justify-between'>
                        <div>
                            <div className='text-2xl font-bold'>
                                {notice.title}
                            </div>
                            <div className=''>{notice.author.name}</div>
                        </div>

                        <div>
                            {/* Date */}
                            <div>
                                posted {convertDateString(notice.createdAt)}
                            </div>

                            {/* Delete Button */}
                            {handleDelete.isLoading ?
                                <button type='submit' className='mt-2 btn btn-outline btn-error btn-sm self-center normal-case w-28'>
                                    <div className="flex items-center">
                                        <span className="loading loading-dots loading-sm m-auto"></span>
                                    </div>
                                </button>
                                :
                                <button onClick={() => handleDelete.mutate(notice._id)} className='mt-2 btn btn-outline btn-error btn-sm self-center normal-case w-28'>Delete Notice</button>
                            }
                        </div>
                    </div>
                    {/* Message */}
                    <div className='mt-2 border-t border-neutral rounded p-2'>
                        {notice.description}
                    </div>
                </div>
            </div>

            <div className='indicator mt-4 w-[99%]'>
                {notice.comments.length > 0 &&
                    <span className='indicator-item badge badge-secondary'>
                        {notice.comments.length}
                    </span>}

                <details className='collapse bg-base-200 rounded-md'>
                    <summary className='collapse-title font-medium'>
                        Show Comments
                    </summary>
                    <div className='collapse-content'>
                        <div className="flex flex-col gap-4">
                            {notice?.comments && notice.comments.map((comment) => {
                                return (
                                    <div key={comment._id} className="chat chat-start">
                                        <div className="chat-header pb-1">
                                            {(comment.user.name || comment.user.email) + " "}
                                            <time className="text-xs opacity-50">{convertToNaturalLanguage(comment.createdAt)}</time>
                                        </div>
                                        <div className="chat-bubble">{comment.comment}</div>
                                    </div>
                                )
                            })}

                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row max-w-md gap-2 mt-2">
                                <input
                                    {...register('comment')}
                                    defaultValue=''
                                    type='text'
                                    className='input input-bordered input-sm w-full'
                                    placeholder='Have your say...'
                                />
                                <SubmitButton onClick={() => handleSubmit(onSubmit)} label={'send'} loadingState={handleCommentNotice.isLoading} classString={'btn btn-outline btn-neutral btn-sm w-14'} />
                            </form>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    )
}
