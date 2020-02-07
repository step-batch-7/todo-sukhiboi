const todoWindow = document.getElementById('window');
const newListInput = document.getElementById('newListInput');

const loadApp = function() {
  req('GET', '/todos', null, res => {
    generateTodoList(res);
  });
};

const createList = function() {
  if (event.key !== 'Enter') return;
  let newListname = newListInput.value;
  req('POST', '/createList', `listName=${newListname}`, res => {
    todoListGenerator(newListname, html => {
      todoWindow.insertAdjacentHTML('beforeend', html);
    });
    newListname = '';
  });
};

const deleteList = function(listId) {
  req('DELETE', '/deleteList', `listName=${listId}`, res => {});
  loadApp();
};

let TODOID = 0;

const addTodo = function(listId) {
  const newTodoInput = document.getElementById(`newTodoInput-${listId}`);
  const todoContent = newTodoInput.value;
  req(
    'POST',
    '/addTodo',
    `todoListId=${listId}&id=${TODOID}&&title=${todoContent}`,
    res => {
      TODOID++;
    }
  );
  loadApp();
  newTodoInput.value = '';
};

const toggleTodo = function(todoId, listId) {
  req('PATCH', '/toggleTodo', `todoListId=${listId}&id=${todoId}`, res => {});
  loadApp();
};

const deleteTodo = function(todoId, listId) {
  req('DELETE', '/deleteTodo', `todoListId=${listId}&id=${todoId}`, res => {});
  loadApp();
};
