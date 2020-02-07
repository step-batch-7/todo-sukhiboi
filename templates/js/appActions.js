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
  });
  newListInput.value = '';
};

const deleteList = function(listId) {
  req('DELETE', '/deleteList', `listName=${listId}`, res => {
    const list = document.getElementById(listId);
    list.remove();
  });
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
      todoGenerator(JSON.parse(res), listId, html => {
        const todos = document.getElementById(`todos-${listId}`);
        todos.insertAdjacentHTML('beforebegin', html);
      });
    }
  );
  newTodoInput.value = '';
};

const toggleTodo = function(todoId, listId) {
  req('PATCH', '/toggleTodo', `todoListId=${listId}&id=${todoId}`, res => {
    const todo = document.getElementById(`${listId}-${todoId}`);
    const isCompleted = todo.className.includes('completed');
    const check = document.querySelector(`#${listId}-${todoId} .check`);
    console.log(check);
    if (isCompleted) {
      todo.classList.remove('completed');
      check.classList.add('hidden');
    } else {
      todo.classList.add('completed');
      check.classList.remove('hidden');
    }
  });
};

const deleteTodo = function(todoId, listId) {
  req('DELETE', '/deleteTodo', `todoListId=${listId}&id=${todoId}`, res => {});
  loadApp();
};
