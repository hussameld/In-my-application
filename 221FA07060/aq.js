document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const taskInput = document.getElementById('task-input');
    const taskTable = document.getElementById('task-table');
    const addTaskBtn = document.getElementById('add-task');
    const showPendingBtn = document.getElementById('show-pending');
    const showCompletedBtn = document.getElementById('show-completed');
    const progressFill = document.getElementById('progress-fill');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const userNameDisplay = document.getElementById('user-name');
    
    // Variables
    let tasks = [];
    let isDarkMode = false;

    // Get user name
    const userName = prompt("Please enter your name");
    userNameDisplay.innerText = userName;

    // Add Task
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        renderTasks();
    });

    // Render Tasks
    function renderTasks(filter = 'pending') {
        taskTable.innerHTML = '';
        const filteredTasks = tasks.filter(task => filter === 'pending' ? !task.completed : task.completed);
        filteredTasks.forEach((task, index) => {
            const row = taskTable.insertRow();
            const cellText = row.insertCell(0);
            const cellActions = row.insertCell(1);

            cellText.innerText = task.text;

            const completeBtn = document.createElement('button');
            completeBtn.innerText = task.completed ? 'Undo' : 'Complete';
            completeBtn.addEventListener('click', function() {
                tasks[index].completed = !tasks[index].completed;
                renderTasks(filter);
                updateProgress();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', function() {
                tasks.splice(index, 1);
                renderTasks(filter);
                updateProgress();
            });

            cellActions.appendChild(completeBtn);
            cellActions.appendChild(deleteBtn);
        });
    }

    // Toggle between pending and completed tasks
    showPendingBtn.addEventListener('click', function() {
        renderTasks('pending');
    });

    showCompletedBtn.addEventListener('click', function() {
        renderTasks('completed');
    });

    // Update progress bar
    function updateProgress() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        progressFill.style.width = `${percentage}%`;
    }

    // Dark mode toggle
    darkModeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
    });
});
