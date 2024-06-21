export default class Todo {
  constructor(title, project) {
    this.title = title;
    this.project = project;
    this.priority = 3;
    this.completed = false;
    this.description = "";
    this.dateTime = null;
  }
  toggleTodoCompleteness() {
    this.completed = !this.completed;
  }
}
