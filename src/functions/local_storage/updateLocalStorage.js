import { Project } from '../projects.js';
import { getTasksForProject } from '../projectcontroller.js';

export function addProjectToLocalStorage(project) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.push(project);
  localStorage.setItem('projects', JSON.stringify(projects));
}
export function updateProjectsInLocalStorage() {
  const projects = [];
  const projectList = document.getElementById('project-list');
  projectList.querySelectorAll('li').forEach((li) => {
    const projectName = li.childNodes[0].nodeValue.trim();
    const tasks = getTasksForProject(projectName);
    const projectsObject = new Project(projectName, tasks);
    projects.push(projectsObject);
  });
  localStorage.setItem('projects', JSON.stringify(projects));
}

export function pushTaskToCurrentProject(currentProject) {
  try {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    //Search current project index
    const projectIndex = projects.findIndex(
      (project) => project.name === currentProject.name
    );

    if (projectIndex !== -1) {
      // Replace current project with new task added
      projects[projectIndex] = currentProject;

      localStorage.setItem('projects', JSON.stringify(projects));
    } else {
      console.error(
        'El proyecto no se encontró en localStorage:',
        currentProject.name
      );
    }
  } catch (e) {
    console.error('Error actualizando el proyecto en localStorage:', e);
  }
}

export function updateTaskInProject(projectIndex, taskIndex, updatedTask) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  if (projects[projectIndex]) {
    projects[projectIndex].tasks[taskIndex] = updatedTask;
    localStorage.setItem('projects', JSON.stringify(projects));
  } else {
    console.error('Cannot find the project');
  }
}

export function updateNoteInLocalStorage(id, title, description, color) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex > -1) {
    notes[noteIndex].title = title;
    notes[noteIndex].description = description;
    notes[noteIndex].color = color;
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}
