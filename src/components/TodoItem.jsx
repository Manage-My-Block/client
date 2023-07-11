export default function TodoItem({ todo, handleDelete }) {
    return (
        <div className='flex items-center justify-between p-2'>
            <span>{todo.title}</span>
            <button
                className='btn btn-outline btn-error btn-sm'
                onClick={() => handleDelete.mutate(todo._id)}
            >
                Delete
            </button>
        </div>
    )
}
