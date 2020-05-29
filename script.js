// Defining UI constants
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection')
const clearButton = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')

// load all event listeners
loadAllEventListener();

function loadAllEventListener(){
  // Dom Load events
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add Task
  form.addEventListener('submit', addTask);
  // Remove Task
  taskList.addEventListener('click', removeTask);
  // Clear Task
  clearButton.addEventListener('click', clearTasks);
  // Filter task
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}


// Add task function 
function addTask(e) {
  if(taskInput.value === ""){
    alert("Please add a task");
  }

  // Create li element
  const li = document.createElement('li');
  // Add class to li
  li.className = "collection-item";
  // Create text node
  const taskText = document.createTextNode(taskInput.value);
  // Append task
  li.appendChild(taskText);
  // Add link
  const link = document.createElement('a');
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Add link to li
  li.appendChild(link);
  // add li to ul
  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";
  e.preventDefault();
}

// Store tasks

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

// Remove Task function
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure ?')){
      e.target.parentElement.parentElement.remove();
    }
  }
  // remove from localStorage
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Task
function clearTasks(){
  // taskList.innerHTML = "";
  // Or : 
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }


  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}



// Filter Tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}