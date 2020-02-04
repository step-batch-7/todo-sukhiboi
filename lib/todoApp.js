class TodoApp {
  constructor() {
    this.lists = [];
  }
  toJSON() {
    const listsAsJSON = this.lists.map(list => list.toJSON());
    return JSON.stringify(listsAsJSON);
  }
  createList(list) {
    this.lists.push(list);
  }
  findList(listName) {
    return this.lists.find(list => list.name == listName);
  }
  deleteList(listName) {
    const foundedList = this.findList(listName);
    const index = this.lists.indexOf(foundedList);
    if (index > -1) this.lists.splice(index, 1);
  }
}

module.exports = {
  TodoApp
};
