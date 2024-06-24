import { createNewTodo } from "./handleTodos";
import {
  Project,
  currentProjectID,
  getCurrentProject,
  getProjectByID,
  projects,
  setCurrentProjectID,
} from "./projects";
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
  const formInputID = "add-project-title";
  const formColumn = createFormColumn("New project title", formInputID, "Life");

  const actions = document.createElement("div");
  actions.classList.add("dialog-actions");
  const saveButton = createDialogAction("Save", addProject);
  const closeButton = createDialogAction("Close", () => dialog.close());
  actions.append(saveButton, closeButton);

  const dialogBody = createDialogBody(formColumn, actions);
  const dialog = createDialog("Add new project", dialogBody);

  dialog.showModal();

  function addProject() {
    dialog.close();

    const formInput = formColumn.querySelector(`#${formInputID}`);

    const newProject = new Project(formInput.value);
    changeProject(newProject);
  }
}

export function createNewProject(project) {
  const newProject = document.createElement("li");
  newProject.classList.add("hidden-input--parent");

  const newProjectRadio = document.createElement("input");
  newProjectRadio.setAttribute("type", "radio");
  newProjectRadio.id = project.title;
  newProjectRadio.name = "projects";
  newProjectRadio.checked = project.id === currentProjectID;
  newProjectRadio.addEventListener("change", handleProjectChange);

  const newProjectTitle = document.createElement("label");
  newProjectTitle.setAttribute("for", project.title);
  newProjectTitle.innerText = project.title;

  newProject.append(newProjectRadio, newProjectTitle);

  projectsList.append(newProject);

  function handleProjectChange() {
    changeProject(project);
  }
}

export function changeProject(project) {
  setCurrentProjectID(project.id);

  todosList.innerHTML = "";

  for (const todo of project.todos) {
    createNewTodo(todo);
  }
}
