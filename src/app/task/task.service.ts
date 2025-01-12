import { Injectable } from '@angular/core';
import { ElementService } from '../common/element.service.abstract';
import { StorageService } from '../common/storage.service';
import { Constants } from '../constants';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ElementService<Task> {
  constructor(storageService: StorageService) {
    super(storageService);
  }

  markAsDone(taskId: number): void {
    const task = this.getElementById(taskId);
    task.markAsDone();
    this.setFullDates(this.elements);
    this.saveElementsToLocalStorage();
  }

  getTasksOrderByDate(): Task[] {
    this.setFullDates(this.elements);
    //TODO: move the doneTasks to the end of the list
    return this.elements.sort((t1, t2) => t1.fullDate.getTime() - t2.fullDate.getTime());
  }

  getElements(): Task[] {
    return this.getTasksWithPreviousTasksBefore();
  }

  private getTasksWithPreviousTasksBefore(): Task[] {
    if (this.elements.length === 0) {
      return [];
    }
    const result = sortTasks(this.elements);
    this.setFullDates(result);
    return result;

    function sortTasks(unorderedTasks: Task[]): Task[] {
      let result = getTasksWithoutPreviousTask(unorderedTasks);
      if (result.length === 0) {
        throw Error(`Aucune tâche de début: (tâche avec l'ID ${Constants.NO_SELECTED_ID} manquante)`);
      }
      let oldResultSize = 0;
      let newTaskIds = result.map(t => t.id);
      while (oldResultSize < result.length) {
        oldResultSize = result.length;
        const newTasks = unorderedTasks.filter(t => newTaskIds.includes(t.previousTaskId));
        newTaskIds = newTasks.map(t => t.id);
        result = [...result, ...newTasks];
      }
      return result;

      function getTasksWithoutPreviousTask(tasks: Task[]) {
        return tasks.filter((task) => task.previousTaskId == -1);
      }
    }
  }

  private setFullDates(tasks: Task[]) {
    for (let index = 0; index < tasks.length; index++) {
      const task = tasks[index];
      if (task.isBeginningTask()) {
        task.computeFullDate(undefined);
      } else {
        task.computeFullDate(this.getElementById(task.previousTaskId));
      }
    }
  }

  getNewId(): number {
    if (this.elements.length === 0) {
      return 0;
    }
    const existingIds = this.elements.map(task => task.id);
    const maxId = Math.max(...existingIds);
    for (let index = 0; index < maxId; index++) {
      if (!existingIds.includes(index)) {
        return index;
      }
    }
    return maxId + 1;
  }

  loadTasksFromLocalStorage(): Task[] {
    return this.storageService.loadTasksFromLocalStorage();
  }

  override saveElementsToLocalStorage(): void {
    this.storageService.saveTasksToLocalStorage(this.elements);
  }

  override loadElementsFromLocalStorage(): Task[] {
    return this.storageService.loadTasksFromLocalStorage();
  }
}