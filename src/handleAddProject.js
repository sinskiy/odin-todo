import { projects } from "./projectsDOMHelpers";

export default function handleAddProject(title) {
  const newProject = createNewProject(title);
  projects.append(newProject);

  function createNewProject() {
    const newProject = document.createElement("li");
    newProject.classList.add("hidden-input--parent");

    const newProjectRadio = document.createElement("input");
    newProjectRadio.setAttribute("type", "radio");
    newProjectRadio.id = title;
    newProjectRadio.name = title;

    const newProjectTitle = document.createElement("label");
    newProjectTitle.setAttribute("for", title);
    newProjectTitle.innerText = title;

    newProject.append(newProjectRadio, newProjectTitle);

    return newProject;
  }
}
