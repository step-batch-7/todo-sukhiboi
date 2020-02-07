const generateTodosAsHTML = function(todos, listId) {
  const todosAsHTML = todos.map(todo => {
    return `<div class='todo flex ${todo.isCompleted ? 'completed' : ''}' id="${
      todo.id
    }-${listId}">
    <div class="checkBox"><div class="box" onclick="toggleTodo('${
      todo.id
    }', '${listId}')"></div>
    <div class="check center ${
      todo.isCompleted ? '' : 'hidden'
    }" onclick="toggleTodo('${todo.id}', '${listId}')"></div>
    </div><span class='content'>${
      todo.title
    }</span><div class="bin" onclick="deleteTodo('${todo.id}', '${listId}')">
    <img src="./images/delete.png" /></div></div>`;
  });
  return todosAsHTML.join('\n');
};

const generateTodoListTemplate = function(todoList) {
  const todos = todoList.todos;
  return `<div class='todoList'>
      <div class='header flex'>
      <div class="option-box hidden" id="option-box-${todoList.name}">
      <span class="closeBtn closeOptionBoxBtn" onclick="closeOptionBox('option-box-${
        todoList.name
      }')">x</span>
      <div class="option danger" onClick="deleteList('${
        todoList.name
      }')">Delete List</div>
    </div>
    <div class="option-bullets" id="option-bullets-${
      todoList.name
    }" onclick="showOptionBox('option-box-${
    todoList.name
  }')"><div class="bullet"></div class="bullet"><div class="bullet"></div><div class="bullet"></div></div>
        <div>
          <span class='title'>${todoList.name}</span>
          <span class='month'>
            Febraray, <span class='bold'>Sunday</span>, 02
          </span>
        </div>
        <div>
          <span class="label">${todos.length} Tasks</span>
        </div>
      </div>
      <div class='todos' id='todos-${todoList.name}'>
      ${generateTodosAsHTML(todos, todoList.name)}
      <div class='inputBar flex' id="addNewTodoBox-${todoList.name}">
      <input
       class='textbox'
       id='newTodoInput-${todoList.name}'
       placeholder='Title...'
       autofocus
       required
       />
       <div class="addTodo" onclick="addTodo('${todoList.name}')">
        <div class="sign center">+</div>
      </div>
    </div>
      </div>
    </div>`;
};

const generateTodoList = function(res) {
  const todoLists = JSON.parse(res);
  const todoListsAsHTML = todoLists
    .map(list => generateTodoListTemplate(list))
    .join('\n');
  document.getElementById('window').innerHTML = todoListsAsHTML;
};

// Creares only one of its kind

const todoenerator = function(todo, listId, cb) {
  const todoClass = todo.isCompleted ? 'completed' : '';
  const checkHiddenOrNot = todo.isCompleted ? '' : 'hidden';
  req('GET', '/components/todo.html', null, res => {
    let rawHTML = res;
    rawHTML = rawHTML.replace(/TODO_ID/g, todo.id);
    rawHTML = rawHTML.replace(/TODOLIST_ID/g, listId);
    rawHTML = rawHTML.replace(/HIDDEN_OR_NOT/g, checkHiddenOrNot);
    rawHTML = rawHTML.replace(/TODO_TITLE/g, todo.title);
    const finalHtml = rawHTML.replace(/COMPLETED_OR_NOT/g, todoClass);
    cb(finalHtml);
  });
};

const todoListGenerator = function(todoList, cb) {
  req('GET', '/components/todoList.html', null, res => {
    let rawHTML = res;
    const finalHtml = rawHTML.replace(/TODOLIST_ID/g, todoList.name);
    cb(finalHtml);
  });
};
