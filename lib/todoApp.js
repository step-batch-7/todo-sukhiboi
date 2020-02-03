class TodoApp {
  constructor() {
    this.lists = [];
  }
  toJSON() {
    const lists = this.lists.map(list => list.toJSON()).join(',');
    return `[${lists}]`;
  }
  toHTML() {
    return this.lists.map(list => list.toHTML()).join(' ');
  }
  createList(list) {
    this.lists.push(list);
  }
  findList(listName) {
    const result = this.lists.filter(list => list.name == listName);
    return result[0];
  }
}

module.exports = {
  TodoApp
};
