import { Task } from "../app/task/task";

export class TestUtils {
  createTask(id: number, dateMonth: number, dateDay: number, previousTaskId?: number): Task {
    let result = new Task(id, `name${id}`);
    result.date.month = dateMonth;
    result.date.day = dateDay;
    if (previousTaskId !== undefined) {
      result.previousTaskId = previousTaskId;
    }
    return result;
  }
}