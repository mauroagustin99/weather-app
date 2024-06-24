import { saveProjecToLocalStorage } from './local_storage/saveToLocalStorage.js';
import { getCurrentProject, setCurrentProject } from './projectcontroller.js';
import modifyTask from './modifytask.js';
import {
  deleteProjectFromLocalStorage,
  deleteTaskFromProject,
} from './local_storage/deleteFromLocalStorage.js';
import {
  differenceInDays,
  format,
  formatDistanceToNow,
  isToday,
  isTomorrow,
  parseISO,
} from 'date-fns';

let modal; //Creating modal to just making it once per session

export default function printTask(name, date, priority, state, taskIndex) {
  const tasksContainer = document.getElementById('tasks-container');

  //Making task and adding it to the task container
  const task = document.createElement('div');
  task.classList.add('task');

  const taskstate = document.createElement('input'); //State
  taskstate.type = 'checkbox';
  taskstate.checked = state;

  const taskname = document.createElement('p');
  taskname.textContent = name;
  taskname.classList.add('task-name');
  taskname.setAttribute('contenteditable', 'true');

  const taskdate = document.createElement('input');
  taskdate.type = 'date';
  taskdate.value = date;

  //Date working with date-fns
  const dueDateObj = parseISO(taskdate.value);
  const currentDate = new Date();
  const daysRemaining = differenceInDays(dueDateObj, currentDate);

  let timeRemaining;

  if (daysRemaining > 0) {
    timeRemaining = `due in ${daysRemaining} days`;
  } else if (daysRemaining === 0) {
    timeRemaining = 'due today';
  } else {
    timeRemaining = `was due ${Math.abs(daysRemaining)} days ago`;
  }
  const dueDate = document.createElement('p');
  dueDate.classList.add('due');
  dueDate.textContent = timeRemaining;

  const taskpriority = document.createElement('select');
  taskpriority.classList.add('priority-select');
  taskpriority.innerHTML = `
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
`;

  if (priority === 'High') {
    taskpriority.classList.add('high-priority');
  } else if (priority === 'Medium') {
    taskpriority.classList.add('medium-priority');
  } else if (priority === 'Low') {
    taskpriority.classList.add('low-priority');
  }
  taskpriority.value = priority;

  const taskdeletebtn = document.createElement('button');
  taskdeletebtn.classList.add('delete-task');

  //Add trash button style
  taskdeletebtn.innerHTML = `<svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
  <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
</svg>`;

  // Add event listener for deleting the task
  taskdeletebtn.addEventListener('click', () => {
    deleteTaskFromProject(taskIndex);
    task.remove(); // Remove the task element from the DOM
  });

  task.appendChild(taskstate);
  task.appendChild(taskname);
  task.appendChild(dueDate);
  task.appendChild(taskdate);
  task.appendChild(taskpriority);
  task.appendChild(taskdeletebtn);

  tasksContainer.appendChild(task);
}

export function overlay() {
  let formData;
  //Conditional to make modal just once per session
  if (!modal) {
    modal = makeModal();
    document.body.appendChild(modal); // Append modal to the body
  }

  const closeBtn = document.querySelector('.close-btn');
  const cancelBtn = document.getElementById('cancelBtn');
  const body = document.body;

  modal.style.display = 'block'; //Display modal
  body.classList.add('modal-open'); //Should be used to change the body filter when model is open, using css

  //Trying to use a function to return the task object when the form is submitted or a console.log when the form is canceled
  return new Promise((resolve, reject) => {
    //Submit event
    const submitHandler = (event) => {
      event.preventDefault(); // Evita que se envíe el formulario

      // Obtaining form variable values
      const taskName = document.getElementById('task-name').value;
      const dueDate = document.getElementById('due-date').value;
      const priority = document.querySelector(
        'input[name="options"]:checked'
      ).value;

      formData = { taskName, dueDate, priority };

      clean();
      resolve(formData); //Made Promise with formData
    };

    //Close modal btn
    const closeHandler = (event) => {
      event.stopPropagation(); // Evita la propagación del evento

      clean();
      reject('cancelado'); // Denied promise
    };

    //Cancel btn
    const cancelHandler = (event) => {
      event.stopPropagation(); // Evita la propagación del evento

      clean();
      reject('cancelado'); // Denied promise
    };

    //Click outside the modal
    const windowClickHandler = (event) => {
      if (event.target === modal) {
        clean();
        reject('cancelado'); // Denied promise
      }
    };

    //Function to hide and clean the form after closing a modal
    const clean = () => {
      //Hidding modal
      modal.style.display = 'none';
      body.classList.remove('modal-open');

      //Cleaning modal
      document.getElementById('task-name').value = '';
      document.getElementById('due-date').value = '';
      const options = document.querySelectorAll('input[name="options"]');
      options.forEach((option) => {
        option.checked = false; // Desmarca todas las opciones
      });

      // Remove event listeners
      modal
        .querySelector('#modal-form')
        .removeEventListener('submit', submitHandler);
      closeBtn.removeEventListener('click', closeHandler);
      cancelBtn.removeEventListener('click', cancelHandler);
      window.removeEventListener('click', windowClickHandler);
    };

    // Register event listeners
    document
      .getElementById('modal-form')
      .addEventListener('submit', submitHandler);
    closeBtn.addEventListener('click', closeHandler);
    cancelBtn.addEventListener('click', cancelHandler);
    window.addEventListener('click', windowClickHandler);
  });
}

function makeModal() {
  //Making the modal
  const modal = document.createElement('div');

  modal.classList.add('modal');
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modal.appendChild(modalContent);
  modalContent.innerHTML = `
  <button class="close-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg></button>
        <form id="modal-form">
        <fieldset>
        <legend id="form-legend">Add new task:</legend>


          <div class="task-name-div">
          <label for="task-name">Task:</label>
          <input type="text" id="task-name" placeholder="Task Name" required><br>
          </div>

          <div class="task-date-div">
          <label for="due-date">Due Date:</label>
          <input type="date" id="due-date" name="due-date" required />
          </div>
          

          <p class="priority-p">Priority:</p>
          <div class="radio-container">
          <input type="radio" id="low-priority" name="options" value="Low" class="radio-input" required />
          <label for="low-priority" class="radio-label" data-color="yellow">Low</label>
          <input type="radio" id="medium-priority" name="options" value="Medium" class="radio-input" required/>
          <label for="medium-priority" class="radio-label" data-color="orange">Medium</label>
          <input type="radio" id="high-priority" name="options" value="High" class="radio-input" required/>
          <label for="high-priority" class="radio-label" data-color="red">High</label><br />
          </div>


          <div class= "submit-btn">
          <button type="submit">Guardar</button>
          <button type="button" id="cancelBtn">Cancelar</button>
          </div>

          </fieldset>
        </form>
  `;

  document.body.appendChild(modal); // Append modal to the body

  return modal;
}

export function createProject() {
  const projectList = document.getElementById('project-list');
  const newProjectInput = document.createElement('input');
  newProjectInput.type = 'text';
  newProjectInput.placeholder = 'Project Name';

  const newLi = document.createElement('li');
  newLi.appendChild(newProjectInput);
  projectList.appendChild(newLi);
  // Focus the input so the user can start typing immediately
  newProjectInput.focus();

  // Add event listeners for when the user finishes typing
  newProjectInput.addEventListener('blur', () => {
    if (newProjectInput.value.trim()) {
      saveProjecToLocalStorage(
        newProjectInput.value.trim(),
        newLi,
        projectList
      );
      selectProject(newLi); //Select new project as current
    } else {
      projectList.removeChild(newLi);
    }
  });

  newProjectInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && newProjectInput.value.trim()) {
      saveProjecToLocalStorage(newProjectInput, newLi, projectList);
      selectProject(newLi);
    }
  });
}

export function addProjectToList(project) {
  const projectList = document.getElementById('project-list');
  const listItem = document.createElement('li');

  listItem.textContent = project.getProjectName();
  projectList.appendChild(listItem);
}

export function clearProjectList() {
  const projectList = document.getElementById('project-list');
  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }
}

export function clearTaskList() {
  const taskList = document.getElementById('tasks-container');
  taskList.innerHTML = '';
}

function selectProject(li) {
  const projectList = document.getElementById('project-list');

  // Clear task container before loading current project tasks
  clearTaskList();

  // Remove current-project css class and delete button in all projects
  projectList.querySelectorAll('li').forEach((item) => {
    item.classList.remove('current-project');
    const deleteButton = item.querySelector('.delete-button');
    if (deleteButton) {
      item.removeChild(deleteButton);
    }
  });

  // Add current-project css class to the current project
  li.classList.add('current-project');

  // Set clicked project to current project
  const projectName = li.childNodes[0].nodeValue.trim();
  setCurrentProject(projectName);

  // Show current project tasks
  const currentProject = getCurrentProject();
  if (currentProject) {
    currentProject.tasks.forEach((task, index) => {
      printTask(task.task, task.dueDate, task.priority, task.state, index);
    });
    modifyTask();
  }

  // Add delete button if project is not 'General'
  if (projectName !== 'General') {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
  <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
</svg>`;
    deleteButton.classList.add('delete-button');
    li.appendChild(deleteButton);

    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent triggering the click event on the li element
      projectList.removeChild(li);
      deleteProjectFromLocalStorage(projectName);
    });
  }
}

export function initializeProjectSelection() {
  const projectList = document.getElementById('project-list');

  projectList.querySelectorAll('li').forEach((li) => {
    li.addEventListener('click', () => selectProject(li));
  });

  // Automatically select the "General" project on page load
  const generalProjectLi = Array.from(projectList.querySelectorAll('li')).find(
    (li) => li.textContent.trim() === 'General'
  );

  if (generalProjectLi) {
    selectProject(generalProjectLi);
  }
}
