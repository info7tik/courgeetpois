import { Injectable } from '@angular/core';
import { Crop } from '../crop/crop';
import { Task } from '../task/task';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TASKS_KEY = 'tasks';
  private readonly CROPS_KEY = 'crops';

  constructor() { }

  deleteAllStoredInformation() {
    localStorage.clear();
  }

  saveCropsToLocalStorage(crops: Crop[]): void {
    localStorage.setItem(this.CROPS_KEY, JSON.stringify(crops));
  }

  loadCropsFromLocalStorage(): Crop[] {
    const storedCrops = localStorage.getItem(this.CROPS_KEY);
    if (storedCrops) {
      return JSON.parse(storedCrops).map((JSONCrop: any) => Crop.buildCropFromJSON(JSONCrop));
    } else {
      return [];
    }
  }

  saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
  }

  loadTasksFromLocalStorage(): Task[] {
    const storedTasks = localStorage.getItem(this.TASKS_KEY);
    if (storedTasks) {
      return JSON.parse(storedTasks).map((JSONtask: any) => Task.buildTaskFromJSON(JSONtask));
    } else {
      return [];
    }
  }
}
