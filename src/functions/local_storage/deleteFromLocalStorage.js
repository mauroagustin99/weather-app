import { updateProjectsInLocalStorage } from './updateLocalStorage.js';
import { getCurrentProject } from '../projectcontroller.js';

export function deleteProjectFromLocalStorage(projectName) {
  let storedProjects = JSON.parse(localStorage.getItem('projects')) || [];

  // Filtrar los proyectos y eliminar el que tiene el nombre especificado
  storedProjects = storedProjects.filter(
    (project) => project.name !== projectName
  );

  updateProjectsInLocalStorage();
}

export function deleteTaskFromProject(taskIndex) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  const currentProject = getCurrentProject();

  if (currentProject) {
    const projectIndex = projects.findIndex(
      (project) => project.name === currentProject.name
    );
    if (projectIndex !== -1) {
      projects[projectIndex].tasks.splice(taskIndex, 1); // Remove the task from the array
      localStorage.setItem('projects', JSON.stringify(projects));
    } else {
      console.error('El proyecto no se encontró en localStorage');
    }
  }
}

export function deleteNoteFromLocalStorage(id) {
  let storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  storedNotes = storedNotes.filter((note) => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(storedNotes));
}
