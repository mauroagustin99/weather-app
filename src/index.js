import './style.css';
import './tasks.css';
import './projects.css';
import './notes.css';
import {
  format,
  addDays,
  subDays,
  compareAsc,
  differenceInDays,
} from 'date-fns';
import {
  createProject,
  initializeProjectSelection,
} from './functions/domcontroller.js';
import NewTask from './functions/newtask.js';
import {
  loadProjectsFromLocalStorage,
  loadNotesFromLocalStorage,
} from './functions/local_storage/loadLocalStorage.js';
import { initializeGeneralProject } from './functions/projectcontroller.js';
import NewNote, { initializeNotes } from './functions/notecontroller.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize "General" project if it doesn't exist
  initializeGeneralProject();

  //Load Projects from the local storage
  loadProjectsFromLocalStorage();

  loadNotesFromLocalStorage();
  // Initialize first note
  initializeNotes();

  // Set "General" as the current project each time DOMContent is loaded
  initializeProjectSelection();

  //Add project button
  const newProject = document.getElementById('add-project');
  newProject.addEventListener('click', () => {
    createProject();
  });
  //Add Task button
  const newTask = document.getElementById('new-task');
  newTask.addEventListener('click', () => {
    NewTask();
  });

  const newNote = document.getElementById('new-note');
  newNote.addEventListener('click', () => {
    NewNote();
  });
});
