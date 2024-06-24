import modifyTask from '../modifytask.js';
import printTask, { clearProjectList } from '../domcontroller.js';
import { addProjectToList } from '../domcontroller.js';
import { Project } from '../projects.js';
import { printNote } from '../notecontroller.js';

export function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    printTask(task.task, task.dueDate, task.priority, task.state);
  });
  modifyTask();
}

export function loadProjectsFromLocalStorage() {
  let projects = [];
  try {
    const storedProjects = localStorage.getItem('projects');

    // Check if there is something stored and it is not an empty string
    if (storedProjects) {
      projects = JSON.parse(storedProjects);
    }

    // Make sure projects is an array
    if (!Array.isArray(projects)) {
      projects = [];
    }
  } catch (e) {
    console.error('Error parsing JSON from localStorage:', e);
    projects = [];
  }

  clearProjectList();

  projects.forEach((project) => {
    const projectInstance = new Project(project.name, project.tasks);
    addProjectToList(projectInstance);
  });

  return projects;
}

export function loadNotesFromLocalStorage() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  notes.forEach((note) => {
    printNote(note.id, note.title, note.description, note.color);
  });
}
