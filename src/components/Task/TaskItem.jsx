/* eslint-disable react/prop-types */
import { voteOnTodo, commentTodo, callVoteTodo, updateTodo } from "../../api/todos";
import { convertToNaturalLanguage, convertDateInput, shortenText, cleanDateString } from "../../utils/helperFunctions"
import { useAuthUser } from 'react-auth-kit';
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import Collapsible from 'react-collapsible';
import SubmitButton from "../SubmitButton";
import { upateBudget, getBudgetByBuildingId, getBudgets } from '../../api/budget'

// eslint-disable-next-line react/prop-types
export default function TaskItem({ todo, handleDelete, getItemStyle, index, handleUpdateTodo }) {
    // Get authorised user info
    const authUser = useAuthUser()
    const user_ID = authUser()?.user?._id

    const buildingId = authUser()?.user?.building._id

    // Access React Query client
    const queryClient = useQueryClient()

    // Get Budget info
    const budgetQuery = useQuery(['budgets', buildingId], () => getBudgetByBuildingId(buildingId));

    // Manage edit button
    const [editing, setEditing] = useState(false)

    // Manage collapsable
    const [open, setOpen] = useState(false)

    // Form management
    const {
        register,
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

    const handleUpdateBudget = useMutation({
        mutationFn: upateBudget,
        onSuccess: () => {

            reset()

            queryClient.invalidateQueries({ queryKey: ['budgets'] })
        },
    })

    // Function to handle the vote buttons
    const handleVote = (vote) => {
        // Prevent user clicking multiple times while data is being sent
        if (handleVoteCast.isLoading) {
            return
        }

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
        // Prevent user clicking multiple times while data is being sent
        if (handleCommentPost.isLoading) {
            return
        }

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
            data.title !== todo.title || data.dueDate !== "" || data.cost !== "" || data.budget !== "") {


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
            if (data.cost !== todo.cost) {
                updatedTodo.updatedData.cost = data.cost
            }
            if (data.budget !== todo.budget) {
                updatedTodo.updatedData.budget = data.budget
            }

            handleUpdateTodo.mutate(updatedTodo)

            setEditing(!editing)
        }

        setEditing(!editing)

    }

    const cardHeader = (
        <div className={open ? "max-w-md flex bg-base-200 p-4 rounded-t-2xl transition-all ease-in-out duration-[50ms]" : "max-w-md flex bg-base-200 p-4 rounded-2xl transition-all ease-in-out delay-[210ms] duration-75"}>
            {/* Chevron animation */}
            <div className="self-center px-4">
                <div className={`transition-all ease-in-out duration-200 ${open ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                    </svg>
                </div>
            </div>

            {/* Task header info */}
            <div className="flex justify-between items-center w-full">
                <p className="text-xl">{shortenText(todo.title)}</p>
                <div className={todo.status === 'pending' ? "w-4 h-4 rounded-full bg-amber-500" : "w-4 h-4 rounded-full bg-green-500"}></div>
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
                        <div className="max-w-md flex flex-col gap-2 px-4 pb-4 bg-base-200 rounded-b-2xl">
                            {/* Task description and edit section*/}
                            <div className="flex gap-4 items-center p-4 bg-base-100 rounded-2xl">
                                {/* Task description */}
                                {!editing &&
                                    <div className="flex flex-col gap-4 w-full">
                                        <div className="flex">
                                            <div className="">
                                                <h1 className="font-bold text-lg mb-1">Task description</h1>
                                                <p className="pl-4">{todo.description}</p>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="">
                                                <h1 className="font-bold text-lg mb-1">Cost</h1>
                                                <p className="pl-4">$ {todo.cost / 100}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h1 className="font-bold text-lg">Due</h1>
                                            <p className="pl-4">{todo.dueDate ? convertToNaturalLanguage(todo.dueDate) : "No date"}</p>
                                        </div>

                                        <div>
                                            <h1 className="font-bold text-lg">Created</h1>
                                            <p className="pl-4">{convertToNaturalLanguage(todo.createdAt)}</p>
                                        </div>

                                        <div className="flex min-w-max justify-center gap-3">
                                            {/* Call vote button */}
                                            {!todo.needsVote &&
                                                <SubmitButton onClick={() => handleCallVote.mutate(todo._id)} label={'Call Vote'} loadingState={handleCallVote.isLoading} classString={'btn btn-outline btn-neutral btn-sm self-center w-24'} />
                                            }

                                            {/* Edit button */}
                                            <button
                                                className='btn btn-outline btn-neutral btn-sm self-center'
                                                onClick={() => setEditing(!editing)}>
                                                Edit
                                            </button>

                                            {/* Complete button */}
                                            <SubmitButton
                                                onClick={() => {
                                                    handleUpdateTodo.mutate({
                                                        todoId: todo._id,
                                                        updatedData: { isComplete: !todo.isComplete }
                                                    })
                                                    if (todo.cost > 0) {
                                                        handleUpdateBudget.mutate({
                                                            budgetId: todo.budget,
                                                            updatedBudgetData: { transaction: { amount: todo.cost / 100, description: todo.description, todo: todo._id } }
                                                        })
                                                    }
                                                }}
                                                label={'Complete'}
                                                loadingState={handleUpdateTodo.isLoading}
                                                classString={'btn btn-outline btn-accent btn-sm self-center w-24'} />

                                            {/* Delete button */}
                                            <SubmitButton onClick={() => handleDelete.mutate(todo._id)} label={'Delete'} loadingState={handleDelete.isLoading} classString={'btn btn-outline btn-error btn-sm self-center w-20'} />
                                        </div>
                                    </div>
                                }

                                {/* Editing task description */}
                                {editing &&
                                    <div className="w-full">
                                        <h1 className="pl-4 pt-2 text-xl font-bold">Edit task</h1>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="flex-col gap-2 p-4">
                                                <div>
                                                    <label className="label">
                                                        <span className="label-text">Title</span>
                                                    </label>
                                                    <input
                                                        {...register('title', { required: 'Title is required' })}
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
                                                        {...register('description', { required: 'Description is required' })}
                                                        defaultValue={todo.description}
                                                        rows="10"
                                                        required
                                                        className='textarea textarea-bordered text-base h-24 w-full'
                                                        placeholder='Description'
                                                    />
                                                </div>

                                                <div>
                                                    <label className="label">
                                                        <span className="label-text">Cost</span>
                                                    </label>
                                                    {/* If no budgets found, disable cost input */}
                                                    {budgetQuery.data.length > 0 ?
                                                        <input
                                                            {...register('cost')}
                                                            defaultValue={todo.cost / 100}
                                                            type='text'
                                                            className='input input-bordered w-full'
                                                            placeholder='Cost'
                                                        />
                                                        :
                                                        <input
                                                            {...register('cost')}
                                                            defaultValue=''
                                                            type='text'
                                                            className='input input-bordered w-full'
                                                            placeholder='Cost'
                                                            disabled
                                                        />
                                                    }
                                                </div>

                                                <div>
                                                    <label className="label">
                                                        <span className="label-text">Budget</span>
                                                    </label>
                                                    <select
                                                        {...register('budget')}
                                                        defaultValue={todo.budget}
                                                        className='input input-bordered w-full cursor-pointer text-slate-400'>

                                                        {/* Update description if no budgets */}
                                                        <option value='' disabled>{budgetQuery.data?.length > 0 ? "Select budget" : "No budgets"}</option>


                                                        {/* List budgets options */}
                                                        {budgetQuery.data && budgetQuery.data.map(budget => {
                                                            return (<option key={budget._id} value={budget._id}>{budget.name}</option>)
                                                        })}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="label">
                                                        <span className="label-text">Due date</span>
                                                    </label>
                                                    <input
                                                        {...register('dueDate', {
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
                                            </div>

                                            <div className="flex gap-2 p-4">
                                                <SubmitButton onClick={() => handleSubmit(onSubmit)} label={'update'} loadingState={handleUpdateTodo.isLoading} classString={'btn btn-primary'} />
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
                                                {...register('comment')}
                                                defaultValue=''
                                                type='text'
                                                className='input input-bordered input-sm w-full'
                                                placeholder='Have your say...'
                                            />

                                            <SubmitButton onClick={() => handleSubmit(onSubmit)} label={'send'} loadingState={handleCommentPost.isLoading} classString={'btn btn-outline btn-neutral btn-sm w-14'} />
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
                                            <SubmitButton onClick={() => handleVote(true)} label={'Vote yes (' +
                                                todo.votes.reduce((count, vote) => {
                                                    if (vote.ballot === true) {
                                                        count += 1
                                                    }
                                                    return count
                                                }, 0) + ')'} loadingState={handleVoteCast.isLoading} classString={'btn btn-outline btn-success btn-sm w-[100px]'} />

                                            <SubmitButton onClick={() => handleVote(false)} label={'Vote no (' +
                                                todo.votes.reduce((count, vote) => {
                                                    if (vote.ballot === false) {
                                                        count += 1
                                                    }
                                                    return count
                                                }, 0) + ')'} loadingState={handleVoteCast.isLoading} classString={'btn btn-outline btn-error btn-sm w-[100px]'} />

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