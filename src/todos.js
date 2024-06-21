export default class Todo {
  constructor(title, project, priority, completed, description, dateTime) {
    this.originalTitle = title;
    this.title = title;
    this.project = project;
    this.priority = priority ?? 3;
    this.completed = completed ?? false;
    this.description = description ?? "";
    this.dateTime = dateTime ?? null;
  }
  toggleTodoCompleteness() {
    this.completed = !this.completed;
    this.saveTodo();
  }
  setTitle(title) {
    this.title = title;
    this.saveTodo();
  }
  setDescription(description) {
    this.description = description;
    this.saveTodo();
  }
  setDateTime(dateTime) {
    this.dateTime = dateTime;
    this.saveTodo();
  }
  saveTodo() {
    const savedTodos = localStorage.getItem("todos");

    const parsedTodos = JSON.parse(savedTodos ?? "{}");
    parsedTodos[this.originalTitle] = this;
    localStorage.setItem("todos", JSON.stringify(parsedTodos));
  }
}
