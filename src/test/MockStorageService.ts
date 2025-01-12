import { StorageService } from "../app/common/storage.service";
import { Task } from "../app/task/task";

export class MockStorageService extends StorageService {
  private tasks: Task[] = [];

  override saveTasksToLocalStorage(tasks: Task[]): void {
    this.tasks = tasks;
  }

  override loadTasksFromLocalStorage(): Task[] {
    return this.tasks;
  }
}