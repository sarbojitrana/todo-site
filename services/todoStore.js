// services/todoStore.js
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '../todos.json');

function readTodos() {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading todos:', err);
        return [];
    }
}

function writeTodos(todos) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error writing todos:', err);
    }
}

module.exports = {
    readTodos,
    writeTodos,
};
