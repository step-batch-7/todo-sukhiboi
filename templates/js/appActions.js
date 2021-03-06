
const createList = function() {
  if (event.key !== 'Enter') return;
  const newListInput = document.getElementById('newListInput');
  let newListname = newListInput.value;
  req('POST', '/createList', `listname=${newListname}`, res => {
    todoListGenerator(newListname, html => {
      todoWindow.insertAdjacentHTML('beforeend', html);
    });
  });
  newListInput.value = '';
};

const deleteList = function(listId) {
  req('DELETE', '/deleteList', `listname=${listId}`, res => {
    const list = document.getElementById(listId);
    list.remove();
  });
};

const updateTodoListname = function(listId, newName) {
  req(
    'PATCH',
    '/updateTodoListname',
    `todoListId=${listId}&newName=${newName}`,
    res => {
      const list = document.getElementById(listId);
      list.id = newName;
      list.innerHTML = list.innerHTML.replace(new RegExp(listId, 'g'), newName);
    }
  );
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
        todos.insertAdjacentHTML('beforeend', html);
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
  req('DELETE', '/deleteTodo', `todoListId=${listId}&id=${todoId}`, res => {
    const todo = document.getElementById(`${listId}-${todoId}`);
    todo.remove();
  });
};

const updateTodoTitle = function(todoId, listId, newTitle) {
  req(
    'PATCH',
    '/updateTodoTitle',
    `todoListId=${listId}&id=${todoId}&newTitle=${newTitle}`,
    res => {
      const todo = document.getElementById(`${listId}-${todoId}`);
      const todoTitle = todo.querySelector('input');
      todoTitle.value = newTitle;
    }
  );
};
