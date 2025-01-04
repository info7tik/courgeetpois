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

  markAsDone(taskId: number): void {
    const task = this.getTaskById(taskId);
    task.markAsDone();
    this.setFullDates(this.tasks);
    this.storageService.saveTasksToLocalStorage(this.tasks);
  }

  getTaskById(taskId: number): Task {
    const foundTask = this.tasks.find(task => task.id === taskId);
    if (foundTask !== undefined) {
      return foundTask;
    }
    throw Error(`No task with ID ${taskId}`);
  }

  getTasksOrderByDate(): Task[] {
    this.setFullDates(this.tasks);
    //TODO: move the doneTasks to the end of the list
    return this.tasks.sort((t1, t2) => t1.fullDate.getTime() - t2.fullDate.getTime());
  }

  getTasksOrderByPreviousTaskId(): Task[] {
    if (this.tasks.length === 0) {
      return [];
    }
    const result = sortTasks(this.tasks);
    this.setFullDates(result);
    return result;

    function sortTasks(unorderedTasks: Task[]): Task[] {
      let result = getTasksWithoutPreviousTask(unorderedTasks);
      if (result.length === 0) {
        throw Error(`No first tasks: (missing tasks with previousId ${Constants.NO_SELECTED_TASK_ID})`);
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
        task.computeFullDate(this.getTaskById(task.previousTaskId));
      }
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
  };

  deleteTask(id: number): void {
    const taskToDelete = this.getTaskById(id);
    const followingTasks = this.tasks.filter(task => task.previousTaskId === taskToDelete.id);
    if (followingTasks.length > 0) {
      throw Error(`can not delete the task ${id} because it is connected to other tasks ${followingTasks.map(task => task.id)}`);
    }
    this.tasks = this.tasks.filter(existing => existing.id !== id);
    this.storageService.saveTasksToLocalStorage(this.tasks);
  };

  getNewId(): number {
    if (this.tasks.length === 0) {
      return 0;
    }
    const existingIds = this.tasks.map(task => task.id);
    const maxId = Math.max(...existingIds);
    for (let index = 0; index < maxId; index++) {
      if (!existingIds.includes(index)) {
        return index;
      }
    }
    return maxId + 1;
  }
}