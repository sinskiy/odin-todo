import { createNewProject } from "./handleProjects";
import { getLargestID } from "./helpers";

export const projects = [];

export let currentProjectID;
export const setCurrentProjectID = (newID) => (currentProjectID = newID);

export class Project {
  constructor(title) {
    this.title = title;
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
    createNewProject(this);
  }
}

export function getCurrentProject() {
  return getProjectByID(currentProjectID);
}

export function getProjectByID(id) {
  return projects.find((project) => project.id === id);
}
