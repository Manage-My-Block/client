import { convertDateString } from "../utils/helperFunctions"



export default function TodoItem({ todo, handleDelete }) {
    return (
        <div className='flex items-center justify-between py-4'>
            <span>Name: {todo.title}</span>
            <span>Description: {todo.description}</span>
            <span>Due date: {convertDateString(todo.dueDate)}</span>
            <span>Status: {todo.status}</span>
            <button
                className='btn btn-outline btn-error btn-sm'
                onClick={() => handleDelete.mutate(todo._id)}
            >
                Delete
            </button>
        </div>
    )
}
