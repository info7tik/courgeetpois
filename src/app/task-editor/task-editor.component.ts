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
      const newTask = new Task(this.taskService.getNewId(), this.taskName);
      this.fillTaskAttributes(newTask);
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
  }

  updateTask(): void {
    try {
      const toUpdateTask = new Task(this.selectedTaskId, this.taskName);
      this.fillTaskAttributes(toUpdateTask);
      this.taskService.updateTask(toUpdateTask);
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
  }

  private fillTaskAttributes(newTask: Task) {
    setPreviousTaskId(this.taskService, newTask, this.previousTaskId);
    if (newTask.isBeginningTask()) {
      setTaskDate(newTask, this.taskMonth, this.taskDay);
    } else {
      setAfterPreviousDays(newTask, this.afterPreviousDays);
    }

    function setTaskDate(task: Task, taskMonth: number, taskDay: number) {
      if (hasTaskDate(taskMonth, taskDay)) {
        task.date.month = taskMonth;
        task.date.day = taskDay;
      } else {
        throw Error(`Missing date for the task ${task.name}`);
      }

      function hasTaskDate(taskMonth: number, taskDay: number): boolean {
        return taskMonth > 0 && taskDay > 0;
      }
    }

    function setPreviousTaskId(taskService: TaskService, task: Task, taskId: number) {
      if (previousTaskExists(taskService, taskId)) {
        task.previousTaskId = taskId;
      } else {
        throw Error(`Previous task ${taskId} does not exist`);
      }

      function previousTaskExists(taskService: TaskService, taskId: number): boolean {
        return taskId === Constants.NO_SELECTED_TASK_ID ? true : taskService.hasTask(taskId);
      }
    }

    function setAfterPreviousDays(task: Task, afterPreviousDays: number) {
      task.afterPreviousDays = afterPreviousDays;
    }
  }

  isNewTask(): boolean {
    return this.selectedTaskId === Constants.NO_SELECTED_TASK_ID;
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
      this.clearForm();
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
