import { Injectable } from '@angular/core';
import { Task } from './task';

type PreviousTaskId = number;

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private storageKey = 'tasks';

  constructor() {
    this.loadTasksFromLocalStorage();
  }


  getTaskById(taskId: number): Task {
    const foundTask = this.tasks.find(task => task.id === taskId);
    if (foundTask !== undefined) {
      return foundTask;
    }
    throw Error(`No task with ID ${taskId}`);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  hasTask(id: number): boolean {
    try {
      this.getTaskById(id);
      return true;
    } catch {
      return false;
    }
  }

  addTask(task: Task): void {
    if (this.hasTask(task.id)) {
      throw Error(`Task with ID ${task.id} already exists`);
    }
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }

  updateTask(task: Task): void {
    this.tasks = this.tasks.filter(existing => existing.id !== task.id);
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(existing => existing.id !== id);
    this.saveTasksToLocalStorage();
  }

  getNextId(): number {
    return this.tasks.length + 1;
  }

  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem(this.storageKey);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks) as Task[];
    }
  }

  private saveTasksToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }
}