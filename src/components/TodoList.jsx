import TodoItem from "./TodoItem";

export default function TodoList({ todos, handleDelete }) {
  return (
	<div className="p-4 divide-y">
		{todos.map((todo, index) => (
			<TodoItem key={todo._id} todo={todo} handleDelete={handleDelete} />
		))}
	</div>
  )
}