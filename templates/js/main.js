const todoWindow = document.getElementById('window');

const req = function(method, url, content, cb) {
  const request = new XMLHttpRequest();
  request.onload = function() {
    cb(this.responseText);
  };
  request.open(method, url);
  request.send(content);
};

const todoGenerator = function(todo, listId, cb) {
  const todoStatus = todo.isCompleted ? 'completed' : '';
  const checkHiddenOrNot = todo.isCompleted ? '' : 'hidden';
  req('GET', '/components/todo.html', null, res => {
    let rawHTML = res;
    rawHTML = rawHTML.replace(/TODO_ID/g, todo.id);
    rawHTML = rawHTML.replace(/TODOLIST_ID/g, listId);
    rawHTML = rawHTML.replace(/HIDDEN_OR_NOT/g, checkHiddenOrNot);
    rawHTML = rawHTML.replace(/TODO_TITLE/g, todo.title);
    const finalHtml = rawHTML.replace(/TODO_STATUS/g, todoStatus);
    cb(finalHtml);
  });
};

const todoListGenerator = function(todoListId, cb) {
  req('GET', '/components/todoList.html', null, res => {
    let rawHTML = res;
    const finalHtml = rawHTML.replace(/TODOLIST_ID/g, todoListId);
    cb(finalHtml);
  });
};

const loadApp = function() {
  req('GET', '/todos', null, res => {
    const todoApp = JSON.parse(res);
    todoApp.forEach(todoList => {
      todoListGenerator(todoList.name, html => {
        todoWindow.insertAdjacentHTML('beforeend', html);
      });
      todoList.todos.forEach(todo => {
        todoGenerator(todo, todoList.name, html => {
          const todos = document.getElementById(`todos-${todoList.name}`);
          todos.insertAdjacentHTML('beforeend', html);
        });
      });
    });
  });
};

document.onload = loadApp();
