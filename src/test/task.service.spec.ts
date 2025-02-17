import { JSONSerializerService } from "../app/common/json-serializer.service";
import { TaskService } from "../app/task/task.service";
import { MockStorageService } from "./MockStorageService";
import { TestUtils } from "./TestUtils";


describe("task service tests", () => {
  const utils: TestUtils = new TestUtils();

  it("add tasks", () => {
    const service = new TaskService(new MockStorageService(new JSONSerializerService()));
    const task2 = utils.createTask(2, 1, 15);
    service.addElement(utils.createTask(1, 0, 15));
    service.addElement(task2);
    expect(service.getElements().length).toBe(2);
  });

  it("delete task", () => {
    const service = new TaskService(new MockStorageService(new JSONSerializerService()));
    const task2 = utils.createTask(2, 1, 15);
    service.addElement(utils.createTask(1, 0, 15));
    service.addElement(task2);
    service.addElement(utils.createTask(3, 2, 15));
    service.deleteElement(task2);
    expect(service.getElements().length).toBe(2);
  });

  it("get sorted tasks", () => {
    const service = new TaskService(new MockStorageService(new JSONSerializerService()));
    const firstTask = utils.createTask(10, 2, 3);
    const secondTask = utils.createTask(5, 1, 9, firstTask.id);
    const thirdTask = utils.createTask(3, 2, 2, secondTask.id);
    service.addElement(secondTask);
    service.addElement(thirdTask);
    service.addElement(firstTask);
    service.getElements();
    const sortedTasks = service.getElements();
    expect(sortedTasks[0]).toEqual(firstTask);
    expect(sortedTasks[1]).toEqual(secondTask);
    expect(sortedTasks[2]).toEqual(thirdTask);
  });
});