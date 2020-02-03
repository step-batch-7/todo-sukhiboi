class Todo {
  constructor(id, title, date) {
    this.title = title;
    this.date = date;
    this.isCompleted = false;
    this.ID = id;
  }
  toHTML() {
    return `<div class='todo flex' id="${this.ID}"><span class='content'>${this.title}</span><div class="bin" onclick="deleteTodo()"><img src="./images/bin.png" /></div></div>`;
  }
  toJSON() {
    const todoAsPlainObject = {
      title: this.title,
      date: this.date,
      isCompleted: this.isCompleted,
      id: this.ID
    };
    return JSON.stringify(todoAsPlainObject);
  }
  toggle() {
    this.isCompleted = !this.isCompleted;
  }
  get id() {
    return this.ID;
  }
  static generateTodoId() {
    return Math.floor(Math.random() * 100000 + 1);
  }
}

module.exports = {
  Todo
};
