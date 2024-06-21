import handleAddProject from "./handleAddProject";
import { projects } from "./projectsDOMHelpers";

export default function HandleFirstLoad() {
  handleAddProject("Default");
  projects.children[0].children[0].checked = true;
}
