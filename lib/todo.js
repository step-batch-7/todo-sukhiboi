class Todo {
  constructor(id, title, isCompleted=false) {
    this.title = title;
    this.isCompleted = isCompleted;
    this.ID = id;
  }
  toJSON() {
    return {
      title: this.title,
      isCompleted: this.isCompleted,
      id: this.ID
    };
  }
  toggle() {
    this.isCompleted = !this.isCompleted;
  }
  get id() {
    return this.ID;
  }
  updateTitle(newTitle) {
    this.title = newTitle;
  }
  static generateTodoId() {
    return Math.floor(Math.random() * 100000 + 1);
  }
}

module.exports = {
  Todo
};
