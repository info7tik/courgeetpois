import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.css'
})
export class TaskEditorComponent {
  readonly NO_SELECTED_TASK = -1;
  taskName: string = '';
  previousTaskId: number = -1;
  taskMonth: number = 0;
  taskDay: number = 0;
  tasks: Task[] = [];
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
        const updatedTask: Task = {
          id: this.selectedTaskId === this.NO_SELECTED_TASK ? this.taskService.getNextId() : this.selectedTaskId,
          name: this.taskName,
          previousTaskId: this.previousTaskId
        };
        if (this.selectedTaskId !== null) {
          this.taskService.updateTask(updatedTask);
        } else {
          this.taskService.addTask(updatedTask);
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
  };

  showMessage(message: string): void {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000); // The message will disappear after 3 seconds
  }

  showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
    this.message = '';
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000); // The error message will disappear after 3 seconds
  }

}
