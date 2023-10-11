  // Load tasks from local storage when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        addTaskToDOM(task, index);
    });
});

// Function to add a task to the list
function addTaskToDOM(task, index) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `
        <span id="task-${index}">${task}</span>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task');
    const task = taskInput.value;

    if (task.trim() !== '') {
        const taskList = document.getElementById('taskList');
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        addTaskToDOM(task, tasks.length - 1);
        taskInput.value = '';
    }
}

// Function to open the edit modal
function editTask(index) {
    const editModal = document.getElementById('editModal');
    const editedTaskInput = document.getElementById('editedTask');
    const submitEditButton = document.getElementById('submitEdit');
    const cancelEditButton = document.getElementById('cancelEdit');
    const taskText = document.getElementById(`task-${index}`);
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    editedTaskInput.value = taskText.innerText;

    submitEditButton.onclick = function() {
        const newTaskText = editedTaskInput.value;
        if (newTaskText.trim() !== '') {
            tasks[index] = newTaskText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskText.innerText = newTaskText;
            closeEditModal();
        }
    };

    cancelEditButton.onclick = function() {
        closeEditModal();
    };

    editModal.style.display = 'block';
}

// Function to close the edit modal
function closeEditModal() {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
}

// Function to delete a task
function deleteTask(index) {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskList.innerHTML = '';
    tasks.forEach((task, newIndex) => {
        addTaskToDOM(task, newIndex);
    });
}

const addButton = document.getElementById('add');
addButton.addEventListener('click', addTask);

const taskInput = document.getElementById('task');
taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});