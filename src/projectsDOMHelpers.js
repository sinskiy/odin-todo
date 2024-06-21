export const projects = document.querySelector(".projects-list");

export function getCurrentProject() {
  return Array.from(projects.children).find(
    (project) => project.children[0].checked
  );
}
