import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getTodos, deleteTodo, updateTodo } from "../api/todos"
import TaskForm from "../components/Task/TaskForm"
import TaskDragAndDrop from "../components/Task/TaskDragAndDrop"
import LoadingIcon from "../components/LoadingIcon"
import { useEffect, useState } from "react"
import { shortenText } from "../utils/helperFunctions"
import ModalDaisy from "../components/ModalDaisy"
import SubmitButton from "../components/SubmitButton"
import { removeTransaction } from "../api/budget"
import { useAuthUser } from "react-auth-kit"

export default function TaskBoardPage() {
    // Get logged in user
    const auth = useAuthUser()
    const user = auth().user
    const [open, setOpen] = useState()
    const queryClient = useQueryClient()
    const [completedItems, setCompletedItems] = useState([]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['todos'],
        queryFn: () => getTodos(user.building._id)
    })

    // Sort completed items each time there is a fetch request with new data
    useEffect(() => {
        if (data) {
            setCompletedItems(data.filter(todo => todo.isComplete === true))
        }
    }, [data])

    const handleDelete = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    // React query comment mutation
    const handleUpdateTodo = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log(error)

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    const handleRemoveTransaction = useMutation({
        mutationFn: removeTransaction,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['budget'] })
        },
    })

    if (isLoading) return <LoadingIcon />

    if (isError) return <div className='w-full h-screen flex justify-center'><h1>Error: {error.message}</h1></div>

    return (
        <div className="mx-4 mt-6">
            <div className='flex items-center'>
                <h1 className='text-3xl font-extrabold'>Task Board</h1>

                <button
                    // Open modal
                    onClick={() => window.create_task_modal.showModal()}
                    className='btn btn-primary normal-case md:ml-auto ml-4'
                >
                    Create New Task
                </button>

                <ModalDaisy modalId={'create_task_modal'}>
                    <TaskForm />
                </ModalDaisy>
            </div>

            <TaskDragAndDrop todos={data} handleDelete={handleDelete} handleUpdateTodo={handleUpdateTodo} />


            {/* Completed tasks dropdown */}
            <div className="w-full flex justify-center">
                <div className="w-full max-w-lg p-5 mt-5">
                    <div className="collapse bg-neutral ">
                        <input type="checkbox" className="w-full" onClick={() => setOpen(!open)} />
                        <div className="collapse-title text-lg flex gap-4">
                            <div className="indicator">
                                {/* Chevron animation */}
                                <div className="px-4 pt-1">
                                    <div className={`transition-all ease-in-out duration-200 ${open ? 'rotate-180' : ''}`}>
                                        <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                                        </svg>
                                    </div>
                                </div>
                                <h1 className="font-bold text-2xl text-neutral-content">Completed Tasks</h1>
                            </div>
                        </div>

                        <div className="collapse-content bg-neutral">
                            <div className="flex flex-col gap-4">
                                {completedItems && completedItems.map(task => {
                                    {/* console.log(task) */ }
                                    return <div key={task._id} className="flex w-full max-w-lg items-center gap-4">
                                        <div className="w-4 h-4 bg-info rounded-full"></div>

                                        <p className="text-lg font-extrabold">{shortenText(task.title)}</p>

                                        <div className="w-1/2 flex ml-auto items-center">
                                            {task.needsVote && <div className="flex gap-3 justify-self-start">
                                                <p className="text-success">Yes: {task.votes.reduce((prev, vote) => {
                                                    vote.ballot === true ? prev += 1 : prev + 0
                                                    return prev
                                                }, 0)}</p>
                                                <p className="text-error">No: {task.votes.reduce((prev, vote) => {
                                                    vote.ballot === true ? prev + 0 : prev += 1
                                                    return prev
                                                }, 0)}</p>
                                            </div>}

                                            <div className="ml-auto">
                                                <SubmitButton
                                                    onClick={() => {
                                                        // Update todo to active
                                                        handleUpdateTodo.mutate({ todoId: task._id, updatedData: { isComplete: false, status: "active" } })

                                                        if (task.cost > 0) {
                                                            // Remove the transaction from the budget
                                                            handleRemoveTransaction.mutate({ budgetId: task.budget, todoId: task._id })
                                                        }

                                                    }
                                                    }
                                                    label={'reopen'}
                                                    loadingState={handleUpdateTodo.isLoading}
                                                    classString={'btn btn-outline btn-neutral btn-sm w-20'} />
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
