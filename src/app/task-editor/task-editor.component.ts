import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.css'
})
export class TaskEditorComponent {
  taskName: string = '';
  previousTaskId: number | null = null;
  tasks: Task[] = [];
  message: string = '';
  errorMessage: string = '';
  selectedTaskId: number | null = null;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  onSubmit(): void {
    try {
      if (this.taskName.trim()) {
        const previousTaskId = getPreviousTaskId(this.previousTaskId);
        if (!checkPreviousTaskExists(this, previousTaskId)) {
          throw Error(`Previous task ${previousTaskId} does not exist`);
        }
        const updatedTask: Task = {
          id: this.selectedTaskId ?? this.taskService.getNextId(),
          name: this.taskName,
          previousTaskId: previousTaskId
        };
        if (this.selectedTaskId !== null) {
          this.taskService.updateTask(updatedTask);
        } else {
          this.taskService.addTask(updatedTask);
        }
        this.tasks = this.taskService.getTasks();
        this.taskName = '';
        this.previousTaskId = null;
        this.selectedTaskId = null;
        this.showMessage('Task added/updated successfully!');
      } else {
        this.showErrorMessage("Please, provide task name");
      }
    } catch (error) {
      if (error instanceof (Error)) {
        this.showErrorMessage(error.message);
      }
    }

    function getPreviousTaskId(formPreviousTaskId: number | null) {
      if (formPreviousTaskId === undefined || formPreviousTaskId === null) {
        return -1;
      } else {
        return formPreviousTaskId;
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
