import { Component } from '@angular/core';
import { Constants } from '../constants';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.css'
})
export class TaskEditorComponent {
  NO_SELECTED_TASK = Constants.NO_SELECTED_TASK_ID;
  tasks: Task[] = [];
  taskName: string = '';
  previousTaskId: number = Constants.NO_SELECTED_TASK_ID;
  taskMonth: number = 0;
  taskDay: number = 0;
  sincePreviousMonths: number = 0;
  afterPreviousDays: number = 0;
  message: string = '';
  errorMessage: string = '';
  selectedTaskId: number = Constants.NO_SELECTED_TASK_ID;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
    this.clearForm();
  }

  addTask(): void {
    try {
      const newTask = new Task(this.taskService.getNextId(), this.taskName);
      setPreviousTaskId(this, newTask);
      if (newTask.isBeginningTask()) {
        setTaskDate(this, newTask);
      } else {
        setAfterPreviousDays(this, newTask);
      }
      this.taskService.addTask(newTask);
      this.showMessage('Task successfully added!');
      this.clearForm();
      this.tasks = this.taskService.getTasks();
    } catch (error) {
      if (error instanceof (Error)) {
        this.showErrorMessage(error.message);
      } else {
        this.showErrorMessage(error as string);
      }
    }

    function setPreviousTaskId(component: TaskEditorComponent, task: Task): void {
      if (component.previousTaskExists()) {
        task.previousTaskId = component.previousTaskId;
      } else {
        throw Error(`Previous task ${component.previousTaskId} does not exist`);
      }
    }

    function setTaskDate(component: TaskEditorComponent, task: Task) {
      if (component.checkTaskDate()) {
        task.date.month = component.taskMonth;
        task.date.day = component.taskDay;
      } else {
        throw Error(`Missing date for the task ${task.name}`);
      }
    }

    function setAfterPreviousDays(component: TaskEditorComponent, task: Task) {
      task.afterPreviousDays = component.afterPreviousDays;
    }
  }

  isNewTask(): boolean {
    return this.selectedTaskId === Constants.NO_SELECTED_TASK_ID;
  }

  updateTask(): void {
    const newTask = new Task(this.taskService.getNextId(), this.taskName);
    setPreviousTaskId(this, newTask);
    if (newTask.isBeginningTask()) {
      setTaskDate(this, newTask);
    } else {
      setAfterPreviousDays(this, newTask);
    }
    this.taskService.addTask(newTask);

    function setPreviousTaskId(component: TaskEditorComponent, task: Task): void {
      if (component.previousTaskExists()) {
        task.previousTaskId = component.previousTaskId;
      } else {
        throw Error(`Previous task ${component.previousTaskId} does not exist`);
      }
    }

    function setTaskDate(component: TaskEditorComponent, task: Task) {
      if (component.checkTaskDate()) {
        task.date.month = component.taskMonth;
        task.date.day = component.taskDay;
      } else {
        throw Error(`Missing date for the task ${task.name}`);
      }
    }

    function setAfterPreviousDays(component: TaskEditorComponent, task: Task) {
      task.afterPreviousDays = component.afterPreviousDays;
    }
  }

  private previousTaskExists(): boolean {
    return this.previousTaskId === Constants.NO_SELECTED_TASK_ID ? true : this.taskService.hasTask(this.previousTaskId);
  }

  private checkTaskDate(): boolean {
    return this.taskDay > 0 && this.taskMonth > 0;
  }

  canNotUpdateName() {
    if (!this.isNewTask()) {
      this.showErrorMessage("can not update name of existing tasks");
      this.clearForm();
    }
  }

  private clearForm() {
    this.taskName = '';
    this.previousTaskId = Constants.NO_SELECTED_TASK_ID;
    this.selectedTaskId = Constants.NO_SELECTED_TASK_ID;
    this.taskMonth = 0;
    this.taskDay = 0;
    this.sincePreviousMonths = 0;
    this.afterPreviousDays = 0;
  }

  loadTask(task: Task): void {
    this.taskName = task.name;
    this.previousTaskId = task.previousTaskId;
    this.selectedTaskId = task.id;
    this.taskMonth = task.date.month;
    this.taskDay = task.date.day;
    this.afterPreviousDays = task.afterPreviousDays;
  };

  deleteTask(): void {
    if (!this.isNewTask()) {
      this.taskService.deleteTask(this.selectedTaskId);
      this.tasks = this.taskService.getTasks();
    }
  }

  showMessage(message: string): void {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
    this.message = '';
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
