import { StorageService } from "../app/common/storage.service";
import { TestUtils } from "./TestUtils";

describe("storage service tests", () => {
  const utils: TestUtils = new TestUtils();

  it("load tasks with default attributes", () => {
    const service = new StorageService();
    const firstTaskMonth = 0;
    const firstTaskDay = 13;
    const tasks = [utils.createTask(1, firstTaskMonth, firstTaskDay), utils.createTask(2, 1, 15), utils.createTask(3, 2, 15)];
    service.saveTasksToLocalStorage(tasks);
    const loadedTasks = service.loadTasksFromLocalStorage();
    expect(loadedTasks.length).toBe(3);
    expect(loadedTasks[0].date.month).toBe(firstTaskMonth);
    expect(loadedTasks[0].date.day).toBe(firstTaskDay);
  });

  it("load tasks with doneDates", () => {
    const service = new StorageService();
    const firstTask = utils.createTask(1, 0, 15);
    const today = new Date();
    firstTask.doneDates[2025] = today;
    const tasks = [firstTask, utils.createTask(2, 1, 15), utils.createTask(3, 2, 15)];
    service.saveTasksToLocalStorage(tasks);
    const loadedTasks = service.loadTasksFromLocalStorage();
    expect(loadedTasks.length).toBe(3);
    expect(loadedTasks[0].id).toBe(firstTask.id);
    expect(loadedTasks[0].doneDates[2025]).toEqual(today);
  });
});