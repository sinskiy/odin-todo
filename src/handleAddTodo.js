import { getCurrentProject } from "./projectsDOMHelpers";
import Todo from "./todos";
import Trash from "./trash.svg";
import Calendar from "./calendar.svg";
import handleDeleteTodo from "./handleDeleteTodo";

const todos = document.querySelector(".todos");

export default function handleAddTodo(e) {
  e.preventDefault();

  const newTodoTitle = new FormData(e.target).get("add-todo-input");
  const currentProject = getCurrentProject();
  const newTodo = new Todo(newTodoTitle, currentProject.innerText);
  const newTodoElement = createNewTodo(newTodo);
  todos.append(newTodoElement);

  const input = document.querySelector("#add-todo-input");
  input.value = "";

  function createNewTodo(todo) {
    const todoItem = document.createElement("li");
    todoItem.classList.add(`priority-${todo.priority}`);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    const details = createDetails();

    const actions = createActions();

    todoItem.append(checkbox, details, actions);
    return todoItem;

    function createDetails() {
      const hgroup = document.createElement("hgroup");

      const title = document.createElement("h2");
      title.contentEditable = "true";
      title.textContent = todo.title;

      const description = document.createElement("p");
      description.contentEditable = "true";
      description.textContent = todo.description;

      const time = document.createElement("time");
      time.textContent = todo.dateTime;

      hgroup.append(title, description, time);
      return hgroup;
    }

    function createActions() {
      const actions = document.createElement("div");
      actions.classList.add("actions");

      const deleteButton = createAction(Trash, "trash icon", handleDeleteTodo);
      const calendar = document.createElement("input");
      calendar.setAttribute("type", "date");
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
        const dateTime = e.target.value;
        newTodo.dateTime = dateTime;
        details.children[2].innerText = new Date(
          newTodo.dateTime
        ).toDateString();
      }
    }
  }
}
