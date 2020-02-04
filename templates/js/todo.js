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

const showAddNewTodoBox = function(listId) {
  const addNewTodoBox = document.getElementById(`addNewTodoBox-${listId}`);
  const newTodoInput = document.getElementById(`newTodoInput-${listId}`);
  addNewTodoBox.classList.remove('hidden');
  newTodoInput.focus();
  addNewTodoBox.addEventListener('keydown', () => {
    if (event.key == 'Enter') {
      addTodo(listId);
    }
  });
};

const hideAddNewTodoBox = function(listId) {
  const addNewTodoBox = document.getElementById(`addNewTodoBox-${listId}`);
  addNewTodoBox.classList.add('hidden');
};

const loadApp = function() {
  req('GET', '/todos', null, res => {
    generateTodoList(res);
    setDate();
    const filter = document.getElementById('fIlTeR');
    filter.addEventListener('keydown', () => {
      if (event.key == 'Enter') {
        createList();
      }
    });
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
  hideAddNewTodoBox(listId);
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
  const newListInput = document.getElementById('newListInput');
  req('POST', '/createList', `listName=${newListInput.value}`, res => {});
  loadApp();
};

const deleteList = function(listId) {
  req('DELETE', '/deleteList', `listName=${listId}`, res => {});
  loadApp();
};

document.onload = loadApp();
