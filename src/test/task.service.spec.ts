import { TaskService } from "../app/task.service";
import { MockStorageService } from "./MockStorageService";
import { TestUtils } from "./TestUtils";


describe("task service tests", () => {
  const utils: TestUtils = new TestUtils();

  it("delete task", () => {
    const service = new TaskService(new MockStorageService());
    service.addTask(utils.createTask(1, 0, 15));
    service.addTask(utils.createTask(2, 1, 15));
    service.addTask(utils.createTask(3, 2, 15));
    service.deleteTask(2);
    expect(service.getTasksOrderByPreviousTaskId().length).toBe(2);
  });
});