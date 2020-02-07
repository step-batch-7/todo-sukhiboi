const loadApp = function() {
  req('GET', '/todos', null, res => {
    generateTodoList(res);
    setDate();
  });
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

const toggleTodo = function(todoId, listId) {
  req('PATCH', '/toggleTodo', `todoListId=${listId}&id=${todoId}`, res => {});
  loadApp();
};

const deleteTodo = function(todoId, listId) {
  req('DELETE', '/deleteTodo', `todoListId=${listId}&id=${todoId}`, res => {});
  loadApp();
};
