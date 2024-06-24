export class Project {
  constructor(name, tasks = []) {
    this.name = name;
    this.tasks = tasks;
  }

  getProjectName() {
    return this.name;
  }
}
