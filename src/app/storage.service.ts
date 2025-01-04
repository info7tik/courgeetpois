import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'tasks';

  constructor() { }

  loadTasksFromLocalStorage(): Task[] {
    const storedTasks = localStorage.getItem(this.STORAGE_KEY);
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks).map((JSONtask: any) => Task.buildTaskFromJSON(JSONtask));
      return this.keepProperlyConfiguredTasks(parsedTasks);
    } else {
      return [];
    }
  }

  saveTasksToLocalStorage(tasks: Task[]): void {
    const JSONtasks = this.keepProperlyConfiguredTasks(tasks);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(JSONtasks));
  }

  private keepProperlyConfiguredTasks(tasks: Task[]): Task[] {
    const properTasks = tasks.filter(task => task.id !== Constants.NO_SELECTED_TASK_ID);
    if (properTasks.length !== tasks.length) {
      alert(`error while saving tasks: wrong task ID for ${tasks.length - properTasks.length} tasks`);
    }
    return properTasks;
  }
}
