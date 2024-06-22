export function createDialog(title, body) {
  const dialog = document.createElement("dialog");

  const dialogTitle = document.createElement("h2");
  dialogTitle.innerText = title;

  dialog.append(dialogTitle, body);

  document.body.appendChild(dialog);
  return dialog;
}

export function createDialogBody(inputs, actions) {
  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
  form.append(inputs, actions);
  return form;
}

export function createFormColumn(label, id) {
  const formColumn = document.createElement("div");
  formColumn.classList.add("form-column");

  const columnLabel = document.createElement("label");
  columnLabel.textContent = label;
  columnLabel.setAttribute("for", id);

  const input = document.createElement("input");
  input.classList.add("styled-input");
  input.id = id;
  input.name = id;

  formColumn.append(columnLabel, input);

  return formColumn;
}

export function createDialogAction(title, clickEventHandler) {
  const button = document.createElement("button");
  button.classList.add("styled-button");
  button.innerText = title;
  button.addEventListener("click", clickEventHandler);
  return button;
}
