import { ElementDate } from "../app/common/element-date";
import { Task } from "../app/task/task";

export class TestUtils {
  createTask(id: number, dateMonth: number, dateDay: number, previousTaskId?: number): Task {
    let result = new Task(id, `name${id}`);
    result.date = new ElementDate(dateMonth, dateDay);
    if (previousTaskId !== undefined) {
      result.previousTaskId = previousTaskId;
    }
    return result;
  }
}