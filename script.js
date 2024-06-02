const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
let id = 100;

window.onload = () => {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  if (storedTodos.length > 0) {
    todos = storedTodos;
    id = Math.max(...todos.map(todo => todo.id)) + 1;
  }
  render();
}

function newTodo() {
  let text = prompt("Enter TODO")
  if (text) {
    let todo = { id: id++, text: text, checked: false }
    todos.push(todo)
    console.log(todos)
    saveTodos();
    render();
  }
}

function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join("");
  updateCounter();
}

function renderTodo(todo) {
  return ` <li class="list-group-item">
  <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? "checked" : ""} onChange = "checkTodo(${todo.id})"/>
  <label for="${todo.id}"><span class="${todo.checked ? "text-success text-decoration-line-through" : ""}">${todo.text}</span></label>
  <button class="btn btn-danger btn-sm float-end" OnClick = "deleteTodo(${todo.id})">delete</button>
</li>`
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
}

function checkTodo(id) {
  console.log("from onchange", id)
  todos = todos.map(todo => (todo.id === id ? { ...todo, checked: !todo.checked } : todo));
  saveTodos();
  render();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
