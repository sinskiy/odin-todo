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
  closeDialog,
  createDialog,
  createDialogAction,
  createDialogBody,
  createFormColumn,
} from "./dialogs";

const projectsList = document.querySelector(".projects-list");

const formInputID = "add-project-title";
const formColumn = createFormColumn("New project title", formInputID, "Life");

const addProjectDialog = createAddProjectDialog();

const addProjectDialogTrigger = document.querySelector(".add-project");
addProjectDialogTrigger.addEventListener("click", () =>
  addProjectDialog.showModal()
);

function createAddProjectDialog() {
  const actions = document.createElement("div");
  actions.classList.add("dialog-actions");
  const saveButton = createDialogAction("Save", addProject);
  const closeButton = createDialogAction("Close", () =>
    actions.parentElement.parentElement.close()
  );
  closeButton.type = "button";
  actions.append(saveButton, closeButton);

  const dialogBody = createDialogBody(formColumn, actions);
  const dialog = createDialog("Add new project", dialogBody);
  return dialog;
}

function addProject() {
  const formInput = formColumn.querySelector(`#${formInputID}`);
  if (!formInput.value) return;

  const newProject = new Project(formInput.value);
  changeProject(newProject);

  addProjectDialog.close();
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
