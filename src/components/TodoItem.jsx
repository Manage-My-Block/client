/* eslint-disable react/prop-types */
import { voteOnTodo, commentTodo, callVoteTodo } from "../api/todos";
import { convertDateString } from "../utils/helperFunctions"
import { useAuthUser } from 'react-auth-kit';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { formatDistanceToNow } from 'date-fns'


// eslint-disable-next-line react/prop-types
export default function TodoItem({ todo, handleDelete }) {
    const authUser = useAuthUser()
    const user_ID = authUser()?.user?._id
    const queryClient = useQueryClient()

    // Form management
    const {
        register: formRegister,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
    } = useForm()

    const cleanEmail = (email) => {
        return email.split("@")[0]
    }

    function truncate(str, n, useWordBoundary) {
        if (str.length <= n) {
            return str
        }

        const subString = str.slice(0, n - 1)

        return (
            useWordBoundary ? subString.slice(0, subString.lastIndexOf(" ")) : subString) + "..."
    }

    function convertToNaturalLanguage(dateString) {
        const date = new Date(dateString);
        const distance = formatDistanceToNow(date, { includeSeconds: true, addSuffix: true });
        return distance;
    }



    const handleVoteCast = useMutation({
        mutationFn: voteOnTodo,
        onSuccess: () => {
            console.log('on success')

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log('on error')
            console.log(error)

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const handleCommentPost = useMutation({
        mutationFn: commentTodo,
        onSuccess: () => {
            console.log('on success')

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log('on error')
            console.log(error)

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const handleCallVote = useMutation({
        mutationFn: callVoteTodo,
        onSuccess: () => {
            console.log('on success')

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log('on error')
            console.log(error)

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const handleVote = (vote) => {
        const voteData = {
            vote: {
                ballot: vote,
                user: user_ID
            },
            todoId: todo._id
        }
        console.log(voteData)

        // Make API call with vote data
        handleVoteCast.mutate(voteData)
    }

    const onSubmit = async (data) => {
        if (data.comment.length < 1) {
            reset()
            return
        }

        reset()

        const commentData = {
            comment: {
                comment: data.comment,
                user: user_ID
            },
            todoId: todo._id
        }

        console.log(commentData)

        // Make API call with comment data
        handleCommentPost.mutate(commentData)
    }

    return (
        <div className='flex items-center justify-between py-4'>
            <div key={todo._id} className="collapse bg-base-200">
                <input type="checkbox" className="w-full" />

                <div className="collapse-title text-lg font-mono flex gap-4">
                    <div>
                        <h1 className="font-bold text-lg">Task</h1>
                        <p>{todo.title}</p>
                    </div>

                    <div>
                        <h1 className="font-bold text-lg">Due date</h1>
                        <p>{convertDateString(todo.dueDate)}</p>
                    </div>

                    <div>
                        <h1 className="font-bold text-lg">Status</h1>
                        <p>{todo.status}</p>
                    </div>

                </div>

                <div className="collapse-content">
                    <div className="flex flex-col gap-4">

                        {/* Task description */}
                        <div>
                            <h1 className="font-bold text-lg">Description</h1>
                            <p>{todo.description}</p>
                        </div>

                        {/* Button to call a vote */}
                        {!todo.needsVote && <button
                            className='btn btn-outline btn-sm'
                            onClick={() => handleCallVote.mutate(todo._id)}>
                            Call vote
                        </button>}

                        {/* Display of votes */}
                        {todo.needsVote && (
                            <div className="flex justify-center items-center gap-4 p-4">
                                <h1 className="text-2xl">Vote count</h1>
                                <p className="text-lg">Yes - {todo.votes.reduce((count, vote) => {
                                    if (vote.ballot === true) {
                                        count += 1
                                    }
                                    return count
                                }, 0)}</p>
                                <p className="text-lg">No - {todo.votes.reduce((count, vote) => {
                                    if (vote.ballot === false) {
                                        count += 1
                                    }
                                    return count
                                }, 0)}</p>

                                {/* Buttons to cast vote */}
                                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleVote(true)}>Vote yes</button>
                                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleVote(false)}>Vote no</button>
                            </div>
                        )}

                        {/* Comments section */}
                        <div className="flex flex-col gap-4 p-4">
                            <h1 className="text-2xl">Comments</h1>

                            {todo?.comments && todo.comments.map((comment) => {
                                return (
                                    <div key={comment._id} className="chat chat-start">
                                        <div className="chat-header">
                                            {comment.user.email + " "}
                                            <time className="text-xs opacity-50">{convertToNaturalLanguage(comment.createdAt)}</time>
                                        </div>
                                        <div className="chat-bubble">{comment.comment}</div>

                                    </div>
                                )
                            })}



                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row max-w-md gap-2">
                                <input
                                    {...formRegister('comment')}
                                    defaultValue=''
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='Comment here'
                                />


                                <button className='btn btn-primary' type='submit'>send</button>


                            </form>
                        </div>

                        {/* Delete button */}
                        <button
                            className='btn btn-outline btn-error btn-sm'
                            onClick={() => handleDelete.mutate(todo._id)}>
                            Delete
                        </button>
                    </div>


                </div>
            </div>


        </div>
    )
}
