const Todo = require('../models/Todo');

const getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.status(200).json(todos); 
    } catch (err) {
        next(err);
    }
};

const createTodo = async (req, res, next) => {
    try {
        const { title, dueDate } = req.body;
        const newTask = await Todo.create({ title, dueDate });
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
};

// PUT update a todo
const updateTodo = async (req, res, next) => {
    try {
        const { title } = req.body;
        const updatedTask = await Todo.findByIdAndUpdate(
            req.params.id,
            { title },
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        next(err);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const deletedTask = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted', task: deletedTask });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
