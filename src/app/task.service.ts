import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [];

    constructor() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
    }

    getTasks(): Task[] {
      return this.tasks;
    }

    addTask(task: Task): void {
      this.tasks.push(task);
      this.tasks.sort((a, b) => a.date.getTime() - b.date.getTime());
      this.saveTasks();
    }

    deleteTask(id: number): void {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
    }

    private saveTasks(): void {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }