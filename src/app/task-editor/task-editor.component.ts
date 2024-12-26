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
  readonly NO_SELECTED_TASK = Constants.NO_SELECTED_TASK_ID;
  tasks: Task[] = [];
  taskName: string = '';
  previousTaskId: number = this.NO_SELECTED_TASK;
  taskMonth: number = 0;
  taskDay: number = 0;
  sincePreviousMonths: number = 0;
  sincePreviousDays: number = 0;
  message: string = '';
  errorMessage: string = '';
  selectedTaskId: number = this.NO_SELECTED_TASK;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  onSubmit(): void {
    try {
      if (this.taskName.trim()) {
        if (!checkPreviousTaskExists(this, this.previousTaskId)) {
          throw Error(`Previous task ${this.previousTaskId} does not exist`);
        }
        const taskData: Task = {
          id: this.selectedTaskId === this.NO_SELECTED_TASK ? this.taskService.getNextId() : this.selectedTaskId,
          name: this.taskName,
          date: { "month": this.taskMonth, "day": this.taskDay },
          sincePrevious: { "months": this.sincePreviousMonths, "days": this.sincePreviousDays },
          previousTaskId: this.previousTaskId
        };
        if (this.selectedTaskId !== null) {
          this.taskService.updateTask(taskData);
        } else {
          this.taskService.addTask(taskData);
        }
        this.tasks = this.taskService.getTasks();
        this.clearForm();
        this.showMessage('Task added/updated successfully!');
      } else {
        this.showErrorMessage("Please, provide task name");
      }
    } catch (error) {
      if (error instanceof (Error)) {
        this.showErrorMessage(error.message);
      }
    }

    function checkPreviousTaskExists(component: TaskEditorComponent, previousTaskId: number) {
      if (previousTaskId === -1) {
        return true;
      }
      if (component.taskService.hasTask(previousTaskId)) {
        return true;
      }
      return false;
    }
  }

  private clearForm() {
    this.taskName = '';
    this.previousTaskId = this.NO_SELECTED_TASK;
    this.selectedTaskId = this.NO_SELECTED_TASK;
    this.taskMonth = 0;
    this.taskDay = 0;
    this.sincePreviousMonths = 0;
    this.sincePreviousDays = 0;
  }

  changeButtonLabel() {
    if (this.selectedTaskId !== this.NO_SELECTED_TASK) {
      this.clearForm();
    }
  }

  loadTask(task: Task): void {
    this.taskName = task.name;
    this.previousTaskId = task.previousTaskId;
    this.selectedTaskId = task.id;
    this.taskMonth = task.date.month;
    this.taskDay = task.date.day;
    this.sincePreviousMonths = task.sincePrevious.months;
    this.sincePreviousDays = task.sincePrevious.days;
  };

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
