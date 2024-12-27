import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageKey = 'tasks';

  constructor() { }

  loadTasksFromLocalStorage(): Task[] {
    const storedTasks = localStorage.getItem(this.storageKey);
    if (storedTasks) {
      return this.keepProperlyConfiguredTasks(JSON.parse(storedTasks) as Task[]);
    } else {
      return [];
    }
  }

  saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.keepProperlyConfiguredTasks(tasks)));
  }

  private keepProperlyConfiguredTasks(tasks: Task[]): Task[] {
    const properTasks = tasks.filter(task => task.id !== Constants.NO_SELECTED_TASK_ID);
    if (properTasks.length !== tasks.length) {
      alert(`error while saving tasks: wrong task ID for ${tasks.length - properTasks.length} tasks`);
    }
    return properTasks;
  }
}
