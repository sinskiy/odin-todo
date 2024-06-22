const projectsList = document.querySelector(".projects-list");

export function handleAddProject(project) {
  const newProject = createNewProject();
  projectsList.append(newProject);

  function createNewProject() {
    const newProject = document.createElement("li");
    newProject.classList.add("hidden-input--parent");

    const newProjectRadio = document.createElement("input");
    newProjectRadio.setAttribute("type", "radio");
    newProjectRadio.id = project.title;
    newProjectRadio.name = "projects";
    newProjectRadio.checked = project.current;

    const newProjectTitle = document.createElement("label");
    newProjectTitle.setAttribute("for", project.title);
    newProjectTitle.innerText = project.title;

    newProject.append(newProjectRadio, newProjectTitle);

    return newProject;
  }
}
