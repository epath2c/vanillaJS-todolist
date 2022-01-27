// ****** SELECT ITEMS **********
const form = document.querySelector(".grocery-form");
const input = document.querySelector("#grocery");
const alert = document.querySelector(".alert");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let ifEdit = false;
let editElement;
let editID = "";
// ****** EVENT LISTENERS **********
window.addEventListener("DOMContentLoaded", setupOnloadPage);
form.addEventListener("submit", onSubmit);
clearBtn.addEventListener("click", clearAll);
// ****** FUNCTIONS **********

// ******************submit function*****************************

function onSubmit(e) {
  e.preventDefault();
  const value = input.value;
  const id = new Date().getTime().toString();
  if (value && !ifEdit) {
    createTodoList(id, value);
    showAlert("Added An Item Successfully!", "success");
    container.classList.add("show-container");
    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value !== "" && ifEdit) {
    editElement.innerHTML = value;
    showAlert("item changed", "success");
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    showAlert("Empty Values!", "danger");
  }
}
// ******************************show alert function********************************
function showAlert(text, type) {
  alert.textContent = text;
  alert.classList.add(`alert-${type}`);
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${type}`);
  }, 1000);
}
// **********************set back to default*****************************************
function setBackToDefault() {
  input.value = "";
  ifEdit = false;
  editID = "";
  submitBtn.textContent = "submit";
}
// **********************clear all *******************************
function clearAll() {
  list.innerHTML = "";
  //   Why use the complicated ones?
  showAlert("You Removed Everything!", "danger");
  container.classList.remove("show-container");
  setBackToDefault();
  localStorage.removeItem("todos");
}
// *****************delete single item*************************************

function deleteItem(e) {
  const item = e.currentTarget.parentElement.parentElement;
  const id = item.dataset.id;

  list.removeChild(item);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  showAlert("Deleted An Item Successfully", "success");
  setBackToDefault();
  removeFromLocalStorage(id);
}

// *****************edit single item******************************************

function editItem(e) {
  const item = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;

  console.log(editElement);
  input.value = editElement.innerHTML;
  ifEdit = true;
  editID = item.dataset.id;

  submitBtn.textContent = "edit";
}
// ******************************************************************

// ****** LOCAL STORAGE **********

// ************ get items function****************
function getLocalStorage() {
  return localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
}
// *****************add item******************************
function addToLocalStorage(id, value) {
  const oneTodo = { id, value };
  let todos = getLocalStorage();
  todos.push(oneTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// *******************edit item**********************************
function editLocalStorage(id, value) {
  let todos = getLocalStorage();
  console.log(todos);
  todos = todos.map(function (todo) {
    if (todo.id === id) {
      todo.value = value;
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
// ****************delete item***************************
function removeFromLocalStorage(id) {
  let todos = getLocalStorage();

  todos = todos.filter(function (todo) {
    if (todo.id !== id) {
      return todo;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
// ****** SETUP ITEMS **********
function setupOnloadPage() {
  let todos = getLocalStorage();

  if (todos.length > 0) {
    todos.forEach(function (todo) {
      createTodoList(todo.id, todo.value);
    });
    container.classList.add("show-container");
  }
}

function createTodoList(id, value) {
  const item = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  item.setAttributeNode(attr);
  item.classList.add("grocery-item");
  item.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <!-- edit btn -->
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <!-- delete btn -->
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;

  const deleteBtn = item.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);

  const editBtn = item.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);
  list.appendChild(item);
}
