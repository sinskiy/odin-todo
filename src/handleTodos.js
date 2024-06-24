import Todo from "./todos";
import Trash from "./trash.svg";
import { getCurrentProject } from "./projects";

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

  const date = document.createElement("time");
  const details = createDetails();

  const actions = createActions();

  todoItem.append(checkbox, details, actions);
  todosList.append(todoItem);

  function createDetails() {
    const hgroup = document.createElement("hgroup");

    const title = document.createElement("h2");
    title.textContent = todo.title;

    const description = document.createElement("p");
    description.textContent = todo.description;

    date.textContent = new Date(todo.date).toDateString();

    hgroup.append(title, description, date);
    return hgroup;
  }

  function createActions() {
    const actions = document.createElement("div");
    actions.classList.add("actions");

    const deleteButton = createAction(Trash, "trash icon", () =>
      handleDeleteTodo(todoItem)
    );
    const calendar = document.createElement("input");
    calendar.setAttribute("type", "date");
    calendar.value = todo.date;
    calendar.classList.add("styled-input");
    calendar.addEventListener("change", handleCalendarChange);

    actions.append(deleteButton, calendar);
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

    function handleCalendarChange(e) {
      const newDate = e.target.value;
      todo.setDate(newDate);
      date.innerText = new Date(todo.date).toDateString();
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
