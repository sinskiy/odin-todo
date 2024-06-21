import handleAddProject from "./handleAddProject";
import { createNewTodo, todos } from "./handleAddTodo";
import { projects } from "./projectsDOMHelpers";
import Todo from "./todos";

export default function HandleFirstLoad() {
  handleAddProject("Default");
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    const parsedTodos = JSON.parse(savedTodos);
    for (const todoTitle in parsedTodos) {
      const { title, project, description, priority, completed, dateTime } =
        parsedTodos[todoTitle];
      const todo = new Todo(
        title,
        project,
        priority,
        completed,
        description,
        dateTime
      );
      const newTodo = createNewTodo(todo);
      todos.appendChild(newTodo);
    }
  }
  projects.children[0].children[0].checked = true;
}
