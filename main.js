const todoForm = document.querySelector(".todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector(".todoList");
document.addEventListener('DOMContentLoaded',loadTask);
function loadTask(){
  const tasks=getTaskTolocalStorage();
  tasks.forEach(task=> {
    addTeskToDom(task)
    
  });
}

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
      completed: false,
    };
    addTeskToDom(task);
    saveTaskTolocalStorage(task)
  }
}

function addTeskToDom(task) {
  const li = document.createElement("li");
  li.className = `todoItem ${task.completed ? "completed" : ''}`
  li.dataset.id = task.id;
  li.innerHTML = `
        <input type="checkbox" class="complete-checkbox" ${task.completed? 'checked' : ''}>
        <span class="task">${task.text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
  
    `;
    todoList.appendChild(li)
    attachEventListener(li,task)
    // console.log(li)
}
function attachEventListener(li,task){

  const delenBtn=li.querySelector('.delete-btn');
  const editBtn=li.querySelector('.edit-btn')
  const checkbox=li.querySelector('.complete-checkbox')
  delenBtn.addEventListener('click',function(){
    handleDelete(task.id,li)
  })
  editBtn.addEventListener('click',function(){
    handleEdit(task.id,li)

  })
  checkbox.addEventListener('change',function(){
    toggleTaskCompletion(task.id,li,checkbox.checked)
    console.log(task.text,checkbox.checked)
  })
}
function toggleTaskCompletion(taskid,li,isCompleted){
  const tasks=getTaskTolocalStorage();
  const task=tasks.find(task=>task.id==taskid);
  if(task){
    task.completed=isCompleted;
    localStorage.setItem('tasks',JSON.stringify(tasks))
    li.classList.toggle('completed',isCompleted)
  }


}

function handleEdit(taskid , li){
  const taskSpan=li.querySelector('.task')
  // console.log(taskSpan.textContent)
  const newTaskText=prompt("EDIT TASK",taskSpan.textContent)
  if(newTaskText !== null && newTaskText.trim() !=="" ){
     updateTask(taskid,newTaskText)
    taskSpan.textContent=newTaskText
  }
  
  }
  function updateTask(id,newTaskText){
    const tasks=getTaskTolocalStorage()
    const  task=tasks.find(task=>task.id ==  id)
    if(task){
      task.text=newTaskText
      localStorage.setItem('tasks',JSON.stringify(tasks))
    }

  }

function handleDelete(id,li){
  let tasks=getTaskTolocalStorage();
  tasks=tasks.filter(task=>task.id!=id);
  localStorage.setItem('tasks',JSON.stringify(tasks))
  li.remove()

}
function saveTaskTolocalStorage(task){
  const oldTask=getTaskTolocalStorage()
  oldTask.push(task);
  localStorage.setItem('tasks',JSON.stringify(oldTask))
}
function getTaskTolocalStorage(){
  const oldTask= JSON.parse(localStorage.getItem('tasks'))||[];
  return oldTask
}