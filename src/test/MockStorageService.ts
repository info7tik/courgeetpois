import { StorageService } from "../app/storage.service";
import { Task } from "../app/task";

export class MockStorageService extends StorageService {
  private tasks: Task[] = [];

  override saveTasksToLocalStorage(tasks: Task[]): void {
    this.tasks = tasks;
  }

  override loadTasksFromLocalStorage(): Task[] {
    return this.tasks;
  }
}