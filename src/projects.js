import { createNewProject } from "./handleProjects";
import { getLargestID } from "./helpers";

export const projects = [];

export let currentProjectID;
export const setCurrentProjectID = (newID) => (currentProjectID = newID);

export class Project {
  constructor(title, todos) {
    this.title = title;
    this.todos = todos ?? [];
    this.initializeProject();
  }
  addTodo(todo) {
    todo.id = getLargestID(this.todos) + 1;
    this.todos.push(todo);

    saveProjects();
  }
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);

    saveProjects();
  }
  initializeProject() {
    this.id = getLargestID(projects) + 1;
    currentProjectID = this.id;
    projects.push(this);

    createNewProject(this);

    saveProjects();
  }
}

export function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function getCurrentProject() {
  return getProjectByID(currentProjectID);
}

export function getProjectByID(id) {
  return projects.find((project) => project.id === id);
}
