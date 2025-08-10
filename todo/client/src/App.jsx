import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { useEffect } from "react";
function App() {
	const [inputText, setInputText] = useState("");
	const [editText, setEditText] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/api/todos")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTodos(data);
			});
	}, []);
	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (inputText.trim() === "") return;

		try {
			const res = await fetch("http://localhost:3000/api/add-todo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: inputText }),
			});

			const data = await res.json();
			if (!res.ok) {
				console.error("Error adding todo:", data.message);
				return;
			}
			setInputText("");
			setTodos((prev) => [data.todo, ...prev]);
		} catch (error) {
			console.log(error);
		}
	};
	const handleEdit = (todo, message) => {
		setEditText(message);
		setTodos((prev) =>
			prev.map((p) => (p._id === todo._id ? { ...p, isEditable: true } : p))
		);
	};
	const handleSave = async (todoId) => {
		try {
			const res = await fetch("http://localhost:3000/api/update-todo", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: todoId, message: editText }),
			});
			const data = await res.json();
			if (!res.ok) {
				console.error("Error updating todo:", data.message);
				return;
			}
			setTodos((prev) =>
				prev.map((p) =>
					p._id === todoId
						? { ...p, message: editText, isEditable: !p.isEditable }
						: p
				)
			);
		} catch (error) {
			console.log(error);
		}
	};
	const handleDelete = async (todo) => {
		const confirmed = confirm(
			`Are you sure you want to delete "${todo.message}"`
		);
		if (!confirmed) return;
		const res = await fetch(
			`http://localhost:3000/api/delete-todo/${todo._id}`,
			{
				method: "DELETE",
			}
		);
		const data = await res.json();
		if (!res.ok) {
			console.error("Error deleting todo:", data.message);
			return;
		}
		setTodos((prev) => prev.filter((p) => p._id !== todo._id));
	};
	return (
		<div className="max-w-2xl w-full mx-auto mt-10 px-4">
			<h1 className="my-6 text-3xl font-bold text-center text-gray-800">
				Manage Your Todos
			</h1>

			<form
				onSubmit={handleFormSubmit}
				className="flex items-center bg-white shadow-md rounded-lg overflow-hidden mb-6"
			>
				<input
					type="text"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					className="px-4 py-3 flex-1 outline-none text-gray-700"
					placeholder="Write your todo..."
				/>
				<button
					type="submit"
					className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium duration-300"
				>
					Add
				</button>
			</form>

			{todos.length > 0 ? (
				<div className="space-y-4">
					{todos.map((todo) => (
						<div
							key={todo._id}
							className={`flex items-center justify-between p-4 rounded-lg shadow-sm border transition duration-300 ${
								todo.completed
									? "bg-green-50 border-green-300"
									: "bg-white border-gray-200"
							}`}
						>
							<div className="flex items-center gap-3 flex-1">
								<input
									type="checkbox"
									checked={todo.completed}
									onChange={() =>
										setTodos((prevTodo) =>
											prevTodo.map((t) =>
												t._id === todo._id
													? { ...t, completed: !t.completed }
													: t
											)
										)
									}
									className="h-5 w-5 cursor-pointer"
								/>
								{todo.isEditable ? (
									<input
										type="text"
										value={editText}
										onChange={(e) => setEditText(e.target.value)}
										className="flex-1 px-3 py-2 rounded border border-gray-300 outline-none"
									/>
								) : (
									<span
										className={`text-lg ${
											todo.completed
												? "line-through text-gray-500"
												: "text-gray-800"
										}`}
									>
										{todo.message}
									</span>
								)}
							</div>

							<div className="flex items-center gap-3 ml-4">
								{todo.isEditable ? (
									<button
										onClick={() => handleSave(todo._id)}
										className="text-green-500 cursor-pointer hover:text-green-600 duration-300"
										title="Save"
									>
										<FiSave size={22} />
									</button>
								) : (
									!todo.completed && (
										<button
											onClick={() => handleEdit(todo, todo.message)}
											className="text-blue-500 cursor-pointer hover:text-blue-600 duration-300"
											title="Edit"
										>
											<FaEdit size={22} />
										</button>
									)
								)}

								{todo.completed && (
									<button
										onClick={() => handleDelete(todo)}
										className="text-red-500 hover:text-red-600 cursor-pointer duration-300"
										title="Delete"
									>
										<MdDelete size={22} />
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center mt-16">
					<p className="text-3xl font-semibold text-green-500">
						No todos for today, Enjoy your day!
					</p>
				</div>
			)}
		</div>
	);
}

export default App;
