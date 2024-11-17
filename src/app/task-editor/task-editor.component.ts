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
    previousTaskId: number | undefined;
    tasks: Task[] = [];
    message: string = '';
    errorMessage: string = '';
    selectedTaskId: number | null = null;

    constructor(private taskService: TaskService) {
        this.tasks = this.taskService.getTasks();
    }

    onSubmit(): void {
        if (this.taskName.trim()) {
            if (this.previousTaskId !== undefined && this.tasks.some(task => task.previousTaskId === this.previousTaskId && task.id !== this.selectedTaskId)) {
                this.showErrorMessage('A task with the same previous task ID already exists.');
                return;
            }

            const updatedTask: Task = {
                id: this.selectedTaskId ?? this.taskService.getNextId(),
                name: this.taskName,
                previousTaskId: this.previousTaskId
            };

            if (this.selectedTaskId) {
                // Update existing task
                this.taskService.updateTask(updatedTask);
            } else {
                // Add new task
                this.taskService.addTask(updatedTask);
            }

            this.tasks = this.taskService.getSortedTasks();
            this.taskName = '';
            this.previousTaskId = undefined;
            this.selectedTaskId = null;
            this.showMessage('Task added/updated successfully!');
        }
    }

    loadTask(task: Task): void {
        this.taskName = task.name;
        this.previousTaskId = task.previousTaskId;
        this.selectedTaskId = task.id;
    }

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
