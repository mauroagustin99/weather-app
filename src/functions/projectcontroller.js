import { Project } from './projects.js';
import { loadProjectsFromLocalStorage } from './local_storage/loadLocalStorage.js';
import { Task } from './tasks.js';
import { saveTaskToCurrentProject } from './local_storage/saveToLocalStorage.js';

let currentProjectName = null;
let projects = [];
projects = loadProjectsFromLocalStorage();

export function setCurrentProject(name) {
  currentProjectName = name;
}

export function getCurrentProject() {
  return projects.find((project) => project.name === currentProjectName);
}

export function getTasksForProject(projectName) {
  const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
  const project = storedProjects.find((proj) => proj.name === projectName);
  return project ? project.tasks : [];
}

export function initializeGeneralProject() {
  const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
  const generalProject = storedProjects.find(
    (project) => project.name === 'General'
  );

  if (!generalProject) {
    const myTask = [
      new Task('Clean my bedroom', '2026-06-11', 'Low', false),
      new Task('Study maths', '2024-05-11', 'High', true),
    ];
    const newGeneralProject = new Project('General', myTask);
    storedProjects.push(newGeneralProject);
    localStorage.setItem('projects', JSON.stringify(storedProjects));
    projects = storedProjects;
  }
}
