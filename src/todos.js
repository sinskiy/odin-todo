import { saveProjects } from "./projects";

export default class Todo {
  constructor(title) {
    this.title = title;
    this.completed = false;
    this.priority = 3;
  }
  setTitle(title) {
    this.title = title;

    saveProjects();
  }
  toggleTodoCompleteness() {
    this.completed = !this.completed;

    saveProjects();
  }
  setDescription(description) {
    this.description = description;

    saveProjects();
  }
  setDate(date) {
    this.date = date;

    saveProjects();
  }
  setPriority(priority) {
    this.priority = priority;

    saveProjects();
  }
}
