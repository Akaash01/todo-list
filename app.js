const todoinput = document.querySelector(".input-item");
const todobutton = document.querySelector(".todo-button");
const todolist = document.querySelector(".list");
const filter = document.querySelector(".filter");
//event listeners
document.addEventListener("DOMContentLoaded", gettodos);
todobutton.addEventListener("click", addtodo);
todolist.addEventListener("click", delcheck);
filter.addEventListener("click", filtertodo);
//funtions
function addtodo(e) {
  if (todoinput.value !== "") {
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    const newtodo = document.createElement("li");
    newtodo.innerText = todoinput.value;
    newtodo.classList.add("item");
    tododiv.appendChild(newtodo);
    saveinlocal(todoinput.value);
    const cmpbutton = document.createElement("button");
    cmpbutton.innerHTML = '<i class="fas fa-check"></i>';
    cmpbutton.classList.add("cmp-btn");
    tododiv.appendChild(cmpbutton);
    const delbutton = document.createElement("button");
    delbutton.innerHTML = '<i class="fas fa-trash"></i>';
    delbutton.classList.add("del-btn");
    tododiv.appendChild(delbutton);
    todolist.appendChild(tododiv);
    todoinput.value = "";
  }
}
function delcheck(e) {
  const item = e.target;
  if (item.classList[0] === "del-btn") {
    const todo = item.parentElement;
    todo.classList.add("del-trans");
    removelocaltodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "cmp-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed-item");
  }
}
function filtertodo(e) {
  const items = todolist.childNodes;
  items.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed-item")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed-item")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveinlocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function gettodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    const newtodo = document.createElement("li");
    newtodo.innerText = todo;
    newtodo.classList.add("item");
    tododiv.appendChild(newtodo);
    const cmpbutton = document.createElement("button");
    cmpbutton.innerHTML = '<i class="fas fa-check"></i>';
    cmpbutton.classList.add("cmp-btn");
    tododiv.appendChild(cmpbutton);
    const delbutton = document.createElement("button");
    delbutton.innerHTML = '<i class="fas fa-trash"></i>';
    delbutton.classList.add("del-btn");
    tododiv.appendChild(delbutton);
    todolist.appendChild(tododiv);
  });
}

function removelocaltodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoindex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoindex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
