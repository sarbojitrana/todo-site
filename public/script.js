const form = document.getElementById('todo-form');
const titleInput = document.getElementById('title');
const dueDateInput = document.getElementById('dueDate');
const list = document.getElementById('todo-list');

window.addEventListener('DOMContentLoaded', loadTodos);

function loadTodos() {
    fetch('/todos')
        .then(res => res.json())
        .then(data => {
            list.innerHTML = '';
            data.forEach(addTodoToUI);  // ✅ data is an array
        })
        .catch(err => console.error('Failed to load todos', err));
}

function addTodoToUI(todo) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.innerText = `${todo.title}` + (todo.dueDate ? ` (Due: ${new Date(todo.dueDate).toLocaleString()})` : '');

    const delBtn = document.createElement('button');
    delBtn.innerText = '❌';
    delBtn.onclick = () => deleteTodo(todo._id);  // ✅ Use _id from MongoDB

    const editBtn = document.createElement('button');
    editBtn.innerText = '✏️';
    editBtn.onclick = () => startEdit(todo, li);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const dueDate = dueDateInput.value;

    if (!title) return;

    const newTodo = {
        title,
        dueDate: dueDate || null
    };

    fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
    })
        .then(res => res.json())
        .then(data => {
            addTodoToUI(data);
            form.reset();
        })
        .catch(err => console.error('Failed to add task', err));
});

function deleteTodo(id) {
    fetch(`/todos/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => {
            loadTodos(); // Refresh the list
        })
        .catch(err => console.error('Failed to delete task', err));
}

function startEdit(todo, li) {
    li.innerHTML = '';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.title;

    const saveBtn = document.createElement('button');
    saveBtn.innerText = '💾';
    saveBtn.onclick = () => {
        const newTitle = input.value.trim();
        if (!newTitle) return;

        fetch(`/todos/${todo._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        })
            .then(res => res.json())
            .then(() => loadTodos());
    };

    li.appendChild(input);
    li.appendChild(saveBtn);
}
