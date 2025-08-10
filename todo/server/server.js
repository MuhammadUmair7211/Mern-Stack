const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const Todo = require("./models/Todo.js");
const connectDB = require("./config/db.js");
app.use(express.json());
app.use(cors());
connectDB();

app.post("/api/add-todo", async (req, res) => {
	try {
		const { message } = req.body;
		if (!message || message.trim() === "") {
			return res.status(400).json({ message: "Message is required" });
		}
		const newTodo = await Todo.create({
			message,
			completed: false,
		});
		res.status(201).json({
			message: "Todo created successfully",
			todo: newTodo,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/api/todos", async (req, res) => {
	try {
		const todos = await Todo.find().sort({ createdAt: -1 });
		if (!todos) return res.json({ message: "error fetching data" });
		res.status(200).json(todos);
	} catch (error) {
		console.log(error);
	}
});

app.patch("/api/update-todo", async (req, res) => {
	try {
		const { id, message } = req.body;
		if (!id || !message) {
			return res.status(400).json({ message: "ID and message are required" });
		}
		const updatedTodo = await Todo.findByIdAndUpdate(
			id,
			{
				message,
			},
			{ new: true }
		);
		if (!updatedTodo) {
			return res.status(404).json({ message: "Todo not found" });
		}
		res
			.status(200)
			.json({ message: "Todo updated successfully", todo: updatedTodo });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.delete("/api/delete-todo/:id", async (req, res) => {
	try {
		const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
		if (!deletedTodo) {
			return res.status(404).json({ message: "todo not found" });
		}
		res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
	} catch (error) {}
});

app.get("/", (req, res) => {
	res.send(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
	console.log(`server connected on port, ${PORT}`);
});
