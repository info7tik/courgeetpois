import { Constants } from "../app/constants";
import { Task } from "../app/task";
import { TaskService } from "../app/task.service";
import { MockStorageService } from "./MockStorageService";


describe("task service", () => {
  function createTask(id: number): Task {
    return {
      "id": id,
      "name": `name${id}`,
      "previousTaskId": Constants.NO_SELECTED_TASK_ID,
      "date": { "month": 1, "day": 1 },
      "sincePrevious": { "months": 0, "days": 0 }
    };
  }
  it("delete task", () => {
    const service = new TaskService(new MockStorageService());
    service.addTask(createTask(1));
    service.addTask(createTask(2));
    service.addTask(createTask(3));
    service.deleteTask(2);
    expect(service.getTasks().length).toBe(2);
  });
});