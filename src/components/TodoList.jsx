import TodoItem from "./TodoItem";

export default function TodoList({ todos, handleDelete }) {
  return (
	<div className="p-4 mt-8 divide-y border border-neutral rounded">
		{todos.map((todo, index) => (
			<TodoItem key={todo._id} todo={todo} handleDelete={handleDelete} />
		))}
	</div>
  )
}