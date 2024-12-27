import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { StorageService } from './storage.service';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor(private storageService: StorageService) {
    this.tasks = storageService.loadTasksFromLocalStorage();
  }


  getTaskById(taskId: number): Task {
    const foundTask = this.tasks.find(task => task.id === taskId);
    if (foundTask !== undefined) {
      return foundTask;
    }
    throw Error(`No task with ID ${taskId}`);
  }

  getTasks(): Task[] {
    let result = getTasksWithoutPreviousTask(this);
    if (result.length === 0) {
      throw Error(`No first tasks: (missing tasks with previousId ${Constants.NO_SELECTED_TASK_ID})`);
    }
    let oldResultSize = 0;
    let newTaskIds = result.map(t => t.id);
    while (oldResultSize < result.length) {
      oldResultSize = result.length;
      const newTasks = this.tasks.filter(t => newTaskIds.includes(t.previousTaskId));
      newTaskIds = newTasks.map(t => t.id);
      result = [...result, ...newTasks];
    }
    return result;

    function getTasksWithoutPreviousTask(service: TaskService) {
      return service.tasks.filter((task) => task.previousTaskId == -1);
    }
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
    this.storageService.saveTasksToLocalStorage(this.tasks);
  }

  updateTask(task: Task): void {
    this.tasks = this.tasks.filter(existing => existing.id !== task.id);
    this.tasks.push(task);
    this.storageService.saveTasksToLocalStorage(this.tasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(existing => existing.id !== id);
    this.storageService.saveTasksToLocalStorage(this.tasks);
  }

  getNextId(): number {
    return this.tasks.length + 1;
  }
}