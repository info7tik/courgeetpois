import { JSONSerializerService } from "../app/common/json-serializer.service";
import { StorageService } from "../app/common/storage.service";
import { Crop } from "../app/crop/crop";
import { Task } from "../app/task/task";
import { TestUtils } from "./TestUtils";

describe("storage service tests", () => {
  const utils: TestUtils = new TestUtils();

  it("load tasks with default attributes", () => {
    const service = new StorageService(new JSONSerializerService());
    const firstTaskMonth = 0;
    const firstTaskDay = 13;
    const tasks = [utils.createTask(1, firstTaskMonth, firstTaskDay), utils.createTask(2, 1, 15), utils.createTask(3, 2, 15)];
    service.saveToLocalStorage(tasks);
    const loadedTasks = service.loadFromLocalStorage("task") as Task[];
    expect(loadedTasks.length).toBe(3);
    expect(loadedTasks[0].date.month).toBe(firstTaskMonth);
    expect(loadedTasks[0].date.day).toBe(firstTaskDay);
  });

  it("load tasks with doneDates", () => {
    const service = new StorageService(new JSONSerializerService());
    const firstTask = utils.createTask(1, 0, 15);
    const today = new Date();
    firstTask.doneDates[2025] = today;
    const tasks = [firstTask, utils.createTask(2, 1, 15), utils.createTask(3, 2, 15)];
    service.saveToLocalStorage(tasks);
    const loadedTasks = service.loadFromLocalStorage("task") as Task[];
    expect(loadedTasks.length).toBe(3);
    expect(loadedTasks[0].id).toBe(firstTask.id);
    expect(loadedTasks[0].doneDates[2025]).toEqual(today);
  });

  it("load crops with default attributes", () => {
    const service = new StorageService(new JSONSerializerService());
    const crops = [utils.createCrop(1, false, false), utils.createCrop(2, true, true)];
    service.saveToLocalStorage(crops);
    const loadedCrops = service.loadFromLocalStorage("crop") as Crop[];
    expect(loadedCrops.length).toBe(2);
    expect(loadedCrops[0].isSowing).toBeFalse();
    expect(loadedCrops[0].isTransplanting).toBeFalse();
    expect(loadedCrops[1].sowingDate.month).toBe(crops[1].sowingDate.month);
    expect(loadedCrops[1].sowingDate.day).toBe(crops[1].sowingDate.day);
    expect(loadedCrops[1].transplantingDate.month).toBe(crops[1].sowingDate.month);
    expect(loadedCrops[1].transplantingDate.day).toBe(crops[1].sowingDate.day);
  });
});