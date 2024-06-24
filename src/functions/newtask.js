import printTask from './domcontroller.js';
import { overlay } from './domcontroller.js';
import modifyTask from './modifytask.js';
import { saveTaskToCurrentProject } from './local_storage/saveToLocalStorage.js';
import { Task } from './tasks.js';

export default function NewTask() {
  overlay()
    .then((formData) => {
      const myTask = new Task(
        formData.taskName,
        formData.dueDate,
        formData.priority,
        false
      );

      saveTaskToCurrentProject(myTask);
      printTask(myTask.task, myTask.dueDate, myTask.priority, myTask.state);
      modifyTask();
    })
    .catch((error) => {
      console.error(error);
    });
}
