/* eslint-disable react/prop-types */
import { voteOnTodo, commentTodo, callVoteTodo, updateTodo } from "../api/todos";
import { convertDateString, convertToNaturalLanguage, convertDateInput } from "../utils/helperFunctions"
import { useAuthUser } from 'react-auth-kit';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Collapsible from 'react-collapsible';



// eslint-disable-next-line react/prop-types
export default function TodoItem({ todo, handleDelete, getItemStyle, index, handleUpdateTodo }) {
    const authUser = useAuthUser()
    const user_ID = authUser()?.user?._id

    const queryClient = useQueryClient()
    const [editing, setEditing] = useState(false)
    const [open, setOpen] = useState(false)

    // Form management
    const {
        register: formRegister,
        handleSubmit,
        reset,
    } = useForm()

    // React query vote mutation
    const handleVoteCast = useMutation({
        mutationFn: voteOnTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log(error)

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    // React query comment mutation
    const handleCommentPost = useMutation({
        mutationFn: commentTodo,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log(error)

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    // React query call vote mutation
    const handleCallVote = useMutation({
        mutationFn: callVoteTodo,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log(error)

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    // Function to handle the vote buttons
    const handleVote = (vote) => {
        const voteData = {
            vote: {
                ballot: vote,
                user: user_ID
            },
            todoId: todo._id
        }

        // Make API call with vote data
        handleVoteCast.mutate(voteData)
    }

    // Submit function for comment text field
    const onSubmit = async (data, event) => {

        // Check if cancel button was clicked
        if (event.nativeEvent.submitter.name === 'cancelButton') {
            // Close edit form and return
            setEditing(!editing)
            return
        }

        if (event.nativeEvent.submitter.name === 'commentSend' && data.comment.length < 1) {
            return
        }

        // If comment field is empty or edited fields are the same don't do anything
        if (data.comment.length > 0) {
            // Clean up the data so it can be sent to the query
            const commentData = {
                comment: {
                    comment: data.comment,
                    user: user_ID
                },
                todoId: todo._id
            }

            // Make API call with comment data
            handleCommentPost.mutate(commentData)

            // After sending data, reset the field
            reset()

            return
        } else if (data.description !== todo.description ||
            data.title !== todo.title || data.dueDate !== "") {


            // Clean up the data so it can be sent to the query
            const updatedTodo = {
                updatedData: {},
                todoId: todo._id
            }

            // Only add new fields to cleaned data
            if (data.dueDate !== "" && convertDateInput(data.dueDate) !== convertDateInput(todo.dueDate || Date.now())) {
                updatedTodo.updatedData.dueDate = new Date(data.dueDate)
            }
            if (data.description !== todo.description) {
                updatedTodo.updatedData.description = data.description
            }
            if (data.title !== todo.title) {
                updatedTodo.updatedData.title = data.title
            }

            handleUpdateTodo.mutate(updatedTodo)

            setEditing(!editing)
        }

        setEditing(!editing)

    }

    const cardHeader = (
        <div className={open ? "text-lg-4 flex bg-base-200 p-4 rounded-t-2xl transition-all ease-in-out duration-[50ms]" : "text-lg-4 flex bg-base-200 p-4 rounded-2xl transition-all ease-in-out delay-[210ms] duration-75"}>
            {/* Chevron animation */}
            <div className="self-center px-4">
                <div className={`transition-all ease-in-out duration-200 ${open ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                    </svg>
                </div>
            </div>

            {/* Task header info */}
            <div className={open ? "flex-grow text-lg-4 columns-4 bg-base-200 p-4 rounded-t-2xl transition-all ease-in-out duration-[50ms]" : "flex-grow text-lg-4 columns-4 bg-base-200 p-4 rounded-2xl transition-all ease-in-out delay-[210ms] duration-75"}>
                <div>
                    <h1 className="font-bold text-lg">Task</h1>
                    <p>{todo.title}</p>
                </div>

                <div>
                    <h1 className="font-bold text-lg">Status</h1>
                    <p className={todo.status === 'pending' ? "text-amber-500" : "text-green-400"}>{todo.status}</p>
                </div>

                <div>
                    <h1 className="font-bold text-lg">Started</h1>
                    <p>{convertDateString(todo.createdAt)}</p>
                </div>

                <div>
                    <h1 className="font-bold text-lg">Due</h1>
                    <p>{todo.dueDate ? convertDateString(todo.dueDate) : "No date"}</p>
                </div>
            </div>

        </div>
    )

    return (
        <Draggable
            key={todo._id}
            draggableId={todo._id}
            index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}>

                    <Collapsible
                        trigger={cardHeader}
                        transitionTime={200}
                        easing='ease'
                        onOpening={() => setOpen(true)}
                        onClosing={() => setOpen(false)}
                    >
                        <div className="flex flex-col gap-2 p-4 bg-base-200 rounded-b-2xl">
                            {/* Task description and edit section*/}
                            <div className="flex gap-4 items-center p-4 bg-base-100 rounded-2xl">
                                {/* Task description */}
                                {!editing &&
                                    <div className="flex flex-col gap-4">
                                        <div className="flex w-full">
                                            <div className="">
                                                <h1 className="font-bold text-lg mb-1">Task description</h1>
                                                <p className="pl-4">{todo.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            {/* Edit button */}
                                            {!todo.needsVote &&
                                                <button
                                                    className='btn btn-outline btn-neutral btn-sm self-center'
                                                    onClick={() => handleCallVote.mutate(todo._id)}>
                                                    Call vote
                                                </button>
                                            }

                                            {/* Edit button */}
                                            <button
                                                className='btn btn-outline btn-neutral btn-sm self-center'
                                                onClick={() => setEditing(!editing)}>
                                                Edit
                                            </button>

                                            {/* Delete button */}
                                            <button
                                                className='btn btn-outline btn-error btn-sm self-center'
                                                onClick={() => handleDelete.mutate(todo._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                }

                                {/* Editing task description */}
                                {editing &&
                                    <div>
                                        <h1 className="pl-4 pt-2 text-xl font-bold">Edit task</h1>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="flex-col gap-2 p-4">
                                                <div>
                                                    <label className="label">
                                                        <span className="label-text">Title</span>
                                                    </label>
                                                    <input
                                                        {...formRegister('title', { required: 'Title is required' })}
                                                        defaultValue={todo.title}
                                                        type='text'
                                                        required
                                                        className='input input-bordered w-full'
                                                        placeholder='Title *'
                                                    />
                                                </div>

                                                <div>
                                                    <label className="label">
                                                        <span className="label-text">Description</span>
                                                    </label>
                                                    <textarea
                                                        {...formRegister('description', { required: 'Description is required' })}
                                                        defaultValue={todo.description}
                                                        rows="10"
                                                        required
                                                        className='textarea textarea-bordered h-24'
                                                        placeholder='Description'
                                                    />
                                                </div>

                                                <div>
                                                    <label className="label">
                                                        <span className="label-text">Due date</span>
                                                    </label>
                                                    <input
                                                        {...formRegister('dueDate', {
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
                                                        type="date"
                                                        className="bg-base-100"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex gap-2 p-4">
                                                <button className='btn btn-primary' type='submit' name="updateButton">update</button>
                                                <button className='btn btn-neutral' type="submit" name="cancelButton">cancel</button>
                                            </div>
                                        </form>

                                    </div>
                                }
                            </div>

                            {/* Comments section */}
                            <div className="collapse bg-base-100">
                                <input type="checkbox" className="w-full" />
                                <div className="collapse-title text-lg flex gap-4">
                                    <div className="indicator">
                                        {todo.comments.length > 0 && <span className="indicator-item badge badge-neutral translate-x-7">{todo.comments.length > 10 ? "10+" : todo.comments.length}</span>}
                                        <h1 className="font-bold text-lg">Comments</h1>
                                    </div>
                                </div>

                                <div className="collapse-content">
                                    <div className="flex flex-col gap-4">
                                        {todo?.comments && todo.comments.map((comment) => {
                                            return (
                                                <div key={comment._id} className="chat chat-start">
                                                    <div className="chat-header pb-1">
                                                        {comment.user.name + " " || comment.user.email + " "}
                                                        <time className="text-xs opacity-50">{convertToNaturalLanguage(comment.createdAt)}</time>
                                                    </div>
                                                    <div className="chat-bubble">{comment.comment}</div>
                                                </div>
                                            )
                                        })}

                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row max-w-md gap-2 mt-2">
                                            <input
                                                {...formRegister('comment')}
                                                defaultValue=''
                                                type='text'
                                                className='input input-bordered input-sm w-full'
                                                placeholder='Have your say...'
                                            />
                                            <button className='btn btn-outline btn-neutral btn-sm' type='submit' name="commentSend">send</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Vote options */}
                            {todo.needsVote && (
                                <div className="collapse bg-base-100">
                                    <input type="checkbox" className="w-full" />

                                    <div className="collapse-title text-lg flex gap-4">
                                        <div>
                                            <h1 className="font-bold text-lg">Vote options</h1>

                                        </div>

                                    </div>

                                    <div className="collapse-content">
                                        {/* Buttons to cast vote */}
                                        <div className="flex gap-4">
                                            <button className='btn btn-outline btn-success btn-sm' onClick={() => handleVote(true)}>Vote yes ({todo.votes.reduce((count, vote) => {
                                                if (vote.ballot === true) {
                                                    count += 1
                                                }
                                                return count
                                            }, 0)})</button>
                                            <button className='btn btn-outline btn-error btn-sm' onClick={() => handleVote(false)}>Vote no ({todo.votes.reduce((count, vote) => {
                                                if (vote.ballot === false) {
                                                    count += 1
                                                }
                                                return count
                                            }, 0)})</button>

                                            <p className="text-lg font-bold self-center">Total votes: {todo.votes.length}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </Collapsible>

                </div>
            )}
        </Draggable>
    )
}