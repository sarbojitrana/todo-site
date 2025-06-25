const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../todos.json');

// 🔹 Read todos from file
async function loadTodos() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading todos:", err);
        return [];
    }
}

// 🔹 Save todos to file
async function saveTodos(todos) {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(todos, null, 2), 'utf-8');
    } catch (err) {
        console.error("Error saving todos:", err);
    }
}

module.exports = {
    loadTodos,
    saveTodos
};
