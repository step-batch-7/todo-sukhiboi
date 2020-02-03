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
    document.body.innerHTML = res;
    addNewTodoBox = document.getElementById('addNewTodoBox');
    newTodoInput = document.getElementById('newTodoInput');
    addNewTodoBtn = document.getElementById('addNewTodoBtn');
    closebtn = document.getElementById('closebtn');
    bin = document.getElementById('deleteBtn');
    setDate();
  });
};

const showAddNewTodoBox = function() {
  addNewTodoBox.classList.remove('hidden');
  newTodoInput.focus();
  addNewTodoBox.addEventListener('keydown', () => {
    if (event.key == 'Enter') {
      addTodo();
    }
  });
};

const hideAddNewTodoBox = function() {
  addNewTodoBox.classList.add('hidden');
};

const addTodo = function() {
  const todoContent = newTodoInput.value;
  req(
    'POST',
    '/addTodo',
    `id=${generateTodoId()}&&title=${todoContent}`,
    res => {}
  );
  loadApp();
  newTodoInput.value = '';
  hideAddNewTodoBox();
};

const deleteTodo = function() {
  const todoId = event.target.parentElement.parentElement.id;
  req('DELETE', '/deleteTodo', `id=${todoId}`, res => {});
  loadApp();
  newTodoInput.value = '';
  hideAddNewTodoBox();
};

const toggleTodo = function() {
  const todoId = event.target.parentElement.parentElement.id;
  req('PATCH', '/toggleTodo', `id=${todoId}`, res => {});
  loadApp();
  newTodoInput.value = '';
  hideAddNewTodoBox();
};

document.onload = loadApp();
