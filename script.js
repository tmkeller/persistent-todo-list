var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");
var todos;

init();

function renderTodos() {
  // Clear todoList element and update todoCountSpan.
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo.
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
    var li = document.createElement("li");
    li.setAttribute( "data-index", i );
    var btn = document.createElement( "button" );
    btn.textContent = "Complete";
    li.textContent = todo;
    todoList.appendChild(li);
    li.appendChild( btn );
    btn.addEventListener( "click", function( e ) {
      todos.splice( e.target.parentElement.getAttribute( "data-index" ), 1 );
      console.log( e.target.parentElement );
      renderTodos();
    });
  }

  storeTodos();
}

function init() {
  // Check if there are todos in localStorage.
  var storedTodos = localStorage.getItem( "todos" );
  // If so, parse the value from localStorage and assign it to the todos variable.
  if ( storedTodos ) {
    storedTodos = JSON.parse( storedTodos );
    todos = storedTodos;
  }

  // Render todos to the DOM.
  renderTodos();
}

function storeTodos() {
  // Add code here to stringify the todos array and save it to the "todos" key in localStorage
  var stringified = JSON.stringify( todos );
  console.log( stringified );
  localStorage.setItem( "todos", stringified);
}

// When form is submitted...
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  // Do nothing if input text is blank
  if ( todoText.trim() !== "" ) {

    // Add new todoText to todos array, clear the input
    todos.push( todoText );
    todoInput.value = "";

    // Re-render the list
    renderTodos();
  }
});