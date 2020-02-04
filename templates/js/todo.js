const generateTodoId = function() {
  return Math.floor(Math.random() * 100000 + 1);
};

const setDate = function() {
  const d = new Date();
  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const currentMonth = months[d.getMonth()];
  const currentDay = weekDays[d.getDay()];
  const dateBox = document.getElementsByClassName('month')[0];
  dateBox.innerText = `${currentMonth}, ${currentDay}, ${d.getDate()}`;
};

const req = function(method, url, content, cb) {
  const request = new XMLHttpRequest();
  request.onload = function() {
    cb(this.responseText);
  };
  request.open(method, url);
  request.send(content);
};

const loadApp = function() {
  req('GET', '/todos', null, res => {
    generateTodoList(res);
    setDate();
  });
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

document.onload = loadApp();
