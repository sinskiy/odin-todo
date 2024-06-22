import Todo, { todosList } from "./todos";
import Trash from "./trash.svg";
import { getCurrentProject, projects } from "./projects";

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

    const time = document.createElement("time");
    time.textContent = todo.dateTime;

    hgroup.append(title, description, time);
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
    calendar.value = todo.dateTime;
    calendar.classList.add("styled-input");
    // calendar.addEventListener("change", handleCalendarChange);

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
      const dateTime = e.target.value;
      todo.setDateTime(dateTime);
      details.children[2].innerText = new Date(todo.dateTime).toDateString();
    }
  }
}

function handleDeleteTodo(todo) {
  const currentProject = getCurrentProject();
  currentProject.deleteTodo(todo.dataset.id);
  todo.remove();
}

function clearNewTodoInput() {
  const input = document.querySelector("#add-todo-input");
  input.value = "";
}