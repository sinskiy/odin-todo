import { changeProject } from "./handleProjects";
import { Project } from "./projects";
import Todo from "./todos";

export default function handleFirstLoad() {
  const savedProjects = localStorage.getItem("projects");
  const parsedProjects = savedProjects && JSON.parse(savedProjects);
  if (parsedProjects) {
    for (const project of parsedProjects) {
      const newProject = new Project(project.title);
      project.todos.forEach((todo) => {
        const newTodo = new Todo(todo.title);
        newTodo.completed = todo.completed;
        newProject.addTodo(newTodo);
      });
      changeProject(newProject);
    }
  } else {
    const defaultProject = new Project("Default");
  }
}
