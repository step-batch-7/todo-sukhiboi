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

const closeOptionBox = function(id) {
  const optioBox = document.getElementById(id);
  optioBox.classList.add('hidden');
};

const showOptionBox = function(id) {
  const optioBox = document.getElementById(id);
  optioBox.classList.remove('hidden');
};

const loadApp = function() {
  req('GET', '/todos', null, res => {
    generateTodoList(res);
    setDate();
  });
};

const addTodo = function(listId) {
  const newTodoInput = document.getElementById(`newTodoInput-${listId}`);
  const todoContent = newTodoInput.value;
  req(
    'POST',
    '/addTodo',
    `todoListId=${listId}&id=${generateTodoId()}&&title=${todoContent}`,
    res => {}
  );
  loadApp();
  newTodoInput.value = '';
};

const deleteTodo = function(todoId, listId) {
  req('DELETE', '/deleteTodo', `todoListId=${listId}&id=${todoId}`, res => {});
  loadApp();
};

const toggleTodo = function(todoId, listId) {
  req('PATCH', '/toggleTodo', `todoListId=${listId}&id=${todoId}`, res => {});
  loadApp();
};

const createList = function() {
  if (event.key !== 'Enter') return;
  const newListInput = document.getElementById('newListInput');
  req('POST', '/createList', `listName=${newListInput.value}`, res => {});
  newListInput.value = '';
  loadApp();
};

const deleteList = function(listId) {
  req('DELETE', '/deleteList', `listName=${listId}`, res => {});
  loadApp();
};

document.onload = loadApp();
