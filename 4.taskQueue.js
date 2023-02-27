import logUpdate from "log-update";

const delay = (seconds) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(`waited ${seconds} seconds...`), seconds * 1000);
  });

class Task {
  constructor(task = (f) => f, args = []) {
    this.task = (...args) => Promise.resolve(task(...args));
    this.args = args;
  }

  execute() {
    return new Promise((resolve, reject) => {
      this.task(...this.args).then(resolve);
    });
  }
}

class TaskQueue {
  constructor(tasks = [], concurrentCount = 1) {
    this.tasks = tasks;
    this.concurrentCount = concurrentCount;
    this.running = [];
    this.completed = [];
    this.failed = [];
  }

  get hasTasks() {
    return this.running.length < this.concurrentCount && this.tasks.length > 0;
  }

  logTasks() {
    const toX = () => "x";

    const { tasks, running, completed } = this;

    logUpdate(`
        Tasks: [${tasks.map(toX)}]
        Running: [${running.map(toX)}]
        Completed: [${completed.map(toX)}]
    `);
  }

  run() {
    while (this.hasTasks) {
      const task = this.tasks.shift();
      task.execute().then((result) => {
        this.running.shift();
        this.completed.push(result);
        this.logTasks();
        this.run();
      });
      this.running.push(task);
      this.logTasks();
    }
  }
}

const tasks = [
  new Task(delay, [3]),
  new Task(console.log, [100]),
  new Task(delay, [10]),
  new Task(delay, [4]),
  new Task(delay, [1]),
  new Task(delay, [6]),
  new Task(delay, [7]),
  new Task(delay, [2]),
  new Task(delay, [11]),
  new Task(delay, [8]),
  new Task(delay, [5]),
  new Task(delay, [7]),
];

const taskQueue = new TaskQueue(tasks, 3);
taskQueue.run();
