import { Note } from './notes.js';
import { saveNoteToLocalStorage } from './local_storage/saveToLocalStorage.js';
import { deleteNoteFromLocalStorage } from './local_storage/deleteFromLocalStorage.js';
import { updateNoteInLocalStorage } from './local_storage/updateLocalStorage.js';

export default function newNote() {
  const id = Date.now();
  const myNote = new Note(id, 'New note', 'Add text!', '#FFF9C4');
  saveNoteToLocalStorage(myNote);
  printNote(myNote.id, myNote.title, myNote.description, myNote.color);
}

export function printNote(id, title, description, color) {
  const notesContainer = document.getElementById('notes-container');
  const note = document.createElement('div');
  note.classList.add('note');

  const noteTitle = document.createElement('input');
  noteTitle.type = 'text';
  noteTitle.value = title;
  noteTitle.placeholder = title;

  const noteDescription = document.createElement('textarea');
  noteDescription.value = description;
  noteDescription.placeholder = description;

  const noteColor = document.createElement('input');
  noteColor.type = 'color';
  noteColor.value = color;

  note.style.backgroundColor = color;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-note');
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path></svg>`;

  // Add event listener for deleting the note
  deleteButton.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteNoteFromLocalStorage(id);
    note.remove(); // Remove the note from the DOM
  });

  // Add event listeners for saving changes to local storage
  noteTitle.addEventListener('input', () => {
    updateNoteInLocalStorage(
      id,
      noteTitle.value,
      noteDescription.value,
      noteColor.value
    );
  });

  noteDescription.addEventListener('input', () => {
    updateNoteInLocalStorage(
      id,
      noteTitle.value,
      noteDescription.value,
      noteColor.value
    );
  });

  noteColor.addEventListener('change', () => {
    note.style.backgroundColor = noteColor.value;
    updateNoteInLocalStorage(
      id,
      noteTitle.value,
      noteDescription.value,
      noteColor.value
    );
  });

  note.appendChild(deleteButton);
  note.appendChild(noteTitle);
  note.appendChild(noteDescription);
  note.appendChild(noteColor);
  notesContainer.appendChild(note);
}

export function initializeNotes() {
  const isFirstTime = localStorage.getItem('isFirstTime'); // Checking if its your first time accessing to To Do!!
  if (!isFirstTime) {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    if (!storedNotes.length) {
      // If storedNotes is empty
      newNote();
      localStorage.setItem('isFirstTime', true);
    }
  }
}
