export const todosList = document.querySelector(".todos-list");

export default class Todo {
  constructor(title) {
    this.title = title;
    this.completed = false;
  }
  toggleTodoCompleteness() {
    this.completed = !this.completed;
  }
}
