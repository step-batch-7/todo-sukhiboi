class Todo {
  constructor(title, date) {
    this.title = title;
    this.date = date;
    this.isCompleted = false;
    this.ID = Todo.generateTodoId();
  }
  toHTML() {
    return `<div>${this.title}\n${this.date.toJSON()}${this.isCompleted}\n${
      this.id
    }</div>`;
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
