import { handleAddProject } from "./handleProjects";
import { getLargestID } from "./helpers";

export const projects = [];

export let currentProjectID;

export class Project {
  constructor(title) {
    this.title = title;
    this.current = true;
    this.todos = [];
    this.initializeProject();
  }
  addTodo(todo) {
    todo.id = getLargestID(this.todos) + 1;
    this.todos.push(todo);
  }
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
  initializeProject() {
    this.id = getLargestID(projects) + 1;
    currentProjectID = this.id;
    projects.push(this);
    handleAddProject(this);
  }
}

export function getCurrentProject() {
  return projects.find((project) => project.id === currentProjectID);
}
