import { createNewTodo } from "./handleTodos";
import { currentProjectID } from "./projects";
import { todosList } from "./handleTodos";
import {
  createDialog,
  createDialogAction,
  createDialogBody,
  createFormColumn,
} from "./dialogs";

const projectsList = document.querySelector(".projects-list");
const addProjectDialogTrigger = document.querySelector(".add-project");
addProjectDialogTrigger.addEventListener("click", handleCreateDialog);

export function handleCreateDialog() {
  const formColumn = createFormColumn("New project title", "add-project-title");
  const actions = document.createElement("div");
  const saveButton = createDialogAction("Save");
  const closeButton = createDialogAction("Close");
  actions.append(saveButton, closeButton);
  const dialogBody = createDialogBody(formColumn, actions);
  const dialog = createDialog("Add new project", dialogBody);

  dialog.showModal();
}

export function createNewProject(project) {
  const newProject = document.createElement("li");
  newProject.classList.add("hidden-input--parent");

  const newProjectRadio = document.createElement("input");
  newProjectRadio.setAttribute("type", "radio");
  newProjectRadio.id = project.title;
  newProjectRadio.name = "projects";
  newProjectRadio.checked = project.id === currentProjectID;

  const newProjectTitle = document.createElement("label");
  newProjectTitle.setAttribute("for", project.title);
  newProjectTitle.innerText = project.title;

  newProject.append(newProjectRadio, newProjectTitle);

  projectsList.append(newProject);
}

function changeProject(project) {
  currentProjectID = project.id;

  todosList.innerHTML = "";
  project.todos.map((todo) => createNewTodo(todo));
}
