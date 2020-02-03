const addNewTodoBox = document.getElementById('addNewTodoBox');
const newTodoInput = document.getElementById('newTodoInput');
const addNewTodoBtn = document.getElementById('addNewTodoBtn');
const closebtn = document.getElementById('closebtn');

const generateTodoId = function() {
  return Math.floor(Math.random() * 100000 + 1);
};

const req = function(method, url, content, cb) {
  const request = new XMLHttpRequest();
  request.onload = function() {
    cb(this.responseText);
  };
  request.open(method, url);
  request.send(content);
};

const fetchTodos = function() {
  const todos = document.getElementById('todos');
  req('GET', '/todos', null, res => {
    todos.innerHTML = res;
  });
};

document.onload = fetchTodos();

const showAddNewTodoBox = function() {
  addNewTodoBox.classList.remove('hidden');
};

const hideAddNewTodoBox = function() {
  addNewTodoBox.classList.add('hidden');
};

const addTodo = function() {
  const todoContent = newTodoInput.value;
  req(
    'POST',
    '/addTodo',
    `id=${generateTodoId}&&title=${todoContent}`,
    res => {}
  );
  fetchTodos();
  newTodoInput.value = '';
  hideAddNewTodoBox();
};
