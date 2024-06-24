import { saveProjects } from "./projects";

export default class Todo {
  constructor(title) {
    this.title = title;
    this.completed = false;
  }
  toggleTodoCompleteness() {
    this.completed = !this.completed;

    saveProjects();
  }
  setDate(date) {
    this.date = date;

    saveProjects();
  }
}
