
const { readTodos, writeTodos } = require('../services/todoStore');
const todos = readTodos();
writeTodos(todos); 


const getTodos = (req, res, next) => {
    const todos = readTodos();
    res.status(200).json({ tasks: todos });
};

const createTodo = (req, res, next) => {
    const todos = readTodos();
    let newtask = req.body;

    if (!newtask || !newtask.title) {
        return res.status(400).json({ message: 'Task must have a title' });
    }

    newtask.id = todos.length + 1;
    todos.push(newtask);
    writeTodos(todos);
    
    res.status(201).json({ message: 'Task added', task: newtask });
};

const updateTodo = (req, res, next) => {

    const todos = readTodos();

    let taskid = parseInt(req.params.id);
    let updatedtask = req.body;

    let index = todos.findIndex(t => t.id === taskid);
    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    todos[index] = { ...todos[index], ...updatedtask };

    writeTodos(todos) ;
    res.status(200).json({ message: 'Task updated', task: todos[index] });
};

const deleteTodo = (req, res, next) => {
    const todos = readTodos();

    let taskid = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === taskid);

    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const deleted = todos.splice(index, 1);
    writeTodos(todos);

    res.status(200).json({ message: 'Task deleted', task: deleted[0] });
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
