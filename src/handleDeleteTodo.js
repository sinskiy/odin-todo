export default function handleDeleteTodo(e) {
  e.currentTarget.parentElement.parentElement.remove();
  const title =
    e.currentTarget.parentElement.parentElement.dataset.originalTitle;
  const savedTasks = localStorage.getItem("todos");
  if (!savedTasks) return;
  const newTasks = JSON.parse(savedTasks);
  delete newTasks[title];
  localStorage.setItem("todos", JSON.stringify(newTasks));
}
