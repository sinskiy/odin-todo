import "./reset.css";
import "./normalize.css";
import "./helpers.css";
import "./style.css";

import { handleAddTodo } from "./handleTodos";
import handleFirstLoad from "./handleFirstLoad";

document.addEventListener("DOMContentLoaded", handleFirstLoad);

const addTodoForm = document.querySelector(".add-todo");
addTodoForm.addEventListener("submit", handleAddTodo);
