// --- DOM Element Selection ---
// Select all the necessary elements from the HTML to manipulate with JavaScript.
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');

// --- Functions ---

/**
 * Checks if the task list is empty and shows/hides the empty message.
 */
function updateEmptyMessage() {
    if (taskList.children.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
    }
}

/**
 * Creates and adds a new task to the list.
 * @param {string} taskText - The text content for the new task.
 */
function addTask(taskText) {
    // 1. Create the list item element
    const li = document.createElement('li');
    li.className = 'task-item flex items-center justify-between bg-white/20 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/30';
    
    // 2. Create the task text span
    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = 'flex-grow';
    
    // 3. Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/50 hover:text-red-400 transition-colors">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
    `;
    deleteBtn.className = 'delete-btn ml-4 flex-shrink-0';
    
    // 4. Assemble the list item
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    // 5. Add the new task to the top of the list
    taskList.prepend(li);
    
    // 6. Update the UI
    updateEmptyMessage();
}

// --- Event Listeners ---

// Listen for form submission to add a new task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)
    
    const taskText = taskInput.value.trim(); // Get and clean the input value
    
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = ''; // Clear the input field
        taskInput.focus(); // Keep the input field focused for easy adding
    }
});

// Use event delegation to handle clicks on tasks and delete buttons.
// This is more efficient than adding an event listener to every single task.
taskList.addEventListener('click', (e) => {
    const clickedElement = e.target;

    // Check if the delete button or its SVG was clicked
    if (clickedElement.closest('.delete-btn')) {
        const taskItem = clickedElement.closest('.task-item');
        
        // Add the 'removing' class to trigger the fade-out animation
        taskItem.classList.add('removing');
        
        // Wait for the animation to finish before removing the element
        taskItem.addEventListener('animationend', () => {
            taskItem.remove();
            updateEmptyMessage(); // Check if the list is now empty
        });

    } 
    // Otherwise, check if the task item itself was clicked to mark as complete
    else if (clickedElement.closest('.task-item')) {
        const taskItem = clickedElement.closest('.task-item');
        taskItem.classList.toggle('completed'); // Toggle the 'completed' class
    }
});

// --- Initial Setup ---
// Initially check if the list is empty when the page loads.
document.addEventListener('DOMContentLoaded', () => {
    // Add a few example tasks to demonstrate functionality
    addTask("Learn react JS");
    addTask("Build some JS projects");
    addTask("Build a beautiful to-do app");
    updateEmptyMessage();
});
