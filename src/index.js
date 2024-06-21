import "./reset.css";
import "./normalize.css";
import "./helpers.css";
import "./style.css";

import handleAddTodo from "./handleAddTodo";
import HandleFirstLoad from "./handleFirstLoad";

document.addEventListener("DOMContentLoaded", HandleFirstLoad);

const addTodoForm = document.querySelector(".add-todo");
addTodoForm.addEventListener("submit", handleAddTodo);
