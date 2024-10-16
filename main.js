const todoForm = document.querySelector(".todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector(".todoList");

todoForm.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();
  const taskText = todoInput.value.trim();
  //getHour,getDay,getMonth,getFullYear
  // console.log(new Date(Date.now()).getFullYear() )

  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: true,
    };
    addTeskToDom(task);
  }
}

function addTeskToDom(task) {
  const li = document.createElement("li");
  li.className = `todoItem ${task.completed ? "completed" : ''}`
  li.dataset.id = task.id;
  li.innerHTML = `
        <input type="checkbox" class="complete-checkbox">
        <span class="task">${task.text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
  
    `;
    todoList.appendChild(li)
    console.log(li)
}
