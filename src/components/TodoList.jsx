import TodoItem from "./TodoItem";

// eslint-disable-next-line react/prop-types
export default function TodoList({ todos, handleDelete }) {

	return (
		<div className="p-4 mt-8 divide-y border border-neutral rounded">
			{todos && todos.map((todo) => (
				<TodoItem
					key={todo._id}
					todo={todo}
					handleDelete={handleDelete} />
			))}
		</div>
	)
}