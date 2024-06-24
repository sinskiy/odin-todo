import Todo from "./todos";
import Trash from "./trash.svg";
import Edit from "./edit.svg";
import { getCurrentProject } from "./projects";
import {
  closeDialog,
  createDialog,
  createDialogAction,
  createDialogBody,
  createFormColumn,
} from "./dialogs";

export const todosList = document.querySelector(".todos-list");

export function handleAddTodo(e) {
  e.preventDefault();

  const newTodoTitle = new FormData(e.target).get("add-todo-input");
  const currentProject = getCurrentProject();
  const newTodo = new Todo(newTodoTitle);
  currentProject.addTodo(newTodo);
  createNewTodo(newTodo);

  clearNewTodoInput();
}
export function createNewTodo(todo) {
  const todoItem = document.createElement("li");
  todoItem.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => todo.toggleTodoCompleteness());

  const title = document.createElement("h2");
  const date = document.createElement("time");
  const details = createDetails();

  const actions = createActions();

  todoItem.append(checkbox, details, actions);
  todosList.append(todoItem);

  function createDetails() {
    const hgroup = document.createElement("hgroup");

    title.textContent = todo.title;

    date.textContent = todo.date ? new Date(todo.date).toDateString() : "";

    hgroup.append(title, date);
    return hgroup;
  }

  function createActions() {
    const actions = document.createElement("div");
    actions.classList.add("actions");

    const deleteButton = createAction(Trash, "trash icon", () =>
      handleDeleteTodo(todoItem)
    );
    const editDialog = createEditDialog();
    const editButton = createAction(Edit, "edit icon", handleOpenEditDialog);
    const calendar = document.createElement("input");
    calendar.setAttribute("type", "date");
    calendar.value = todo.date;
    calendar.classList.add("styled-input");
    calendar.addEventListener("change", handleCalendarChange);

    actions.append(deleteButton, editButton, calendar);
    return actions;

    function createAction(src, alt, clickEventHandler) {
      const button = document.createElement("button");
      button.classList.add("icon-button");
      button.addEventListener("click", clickEventHandler);

      const img = new Image();
      img.src = src;
      img.alt = alt;

      button.appendChild(img);
      return button;
    }

    function createEditDialog() {
      const inputs = document.createElement("div");
      inputs.classList.add("form-inputs");
      const titleFormColumn = createFormColumn(
        "Title",
        "edit-title",
        "Buy groceries"
      );
      const descriptionFormColumn = createFormColumn(
        "Description",
        "edit-description",
        "This is a hard task",
        false
      );
      inputs.append(titleFormColumn, descriptionFormColumn);

      const actions = document.createElement("div");
      actions.classList.add("dialog-actions");
      const saveButton = createDialogAction("Save");
      const closeButton = createDialogAction("Close", () =>
        closeDialog(editDialog)
      );
      closeButton.type = "button";
      actions.append(saveButton, closeButton);

      const dialogBody = createDialogBody(
        inputs,
        actions,
        handleSubmitEditDialog
      );

      const dialog = createDialog("Edit todo and view details", dialogBody);

      return dialog;

      function handleSubmitEditDialog() {
        const formData = new FormData(dialogBody);
        const [newTitle, newDescription] = formData.values();
        todo.setTitle(newTitle);
        todo.setDescription(newDescription);
        title.textContent = newTitle;
      }
    }

    function handleOpenEditDialog() {
      editDialog.showModal();

      const title = editDialog.querySelector("#edit-title");
      title.value = todo.title;

      const description = editDialog.querySelector("#edit-description");
      description.value = todo.description ?? "";
    }

    function handleCalendarChange(e) {
      const newDate = e.target.value;
      todo.setDate(newDate);
      date.innerText = todo.date ? new Date(todo.date).toDateString() : "";
    }
  }
}

function handleDeleteTodo(todo) {
  const currentProject = getCurrentProject();
  const todoID = Number(todo.dataset.id);
  currentProject.deleteTodo(todoID);
  todo.remove();
}

function clearNewTodoInput() {
  const input = document.querySelector("#add-todo-input");
  input.value = "";
}
