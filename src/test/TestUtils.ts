import { Task } from "../app/task";

export class TestUtils {
  createTask(id: number, dateMonth: number, dateDay: number): Task {
    let result = new Task(id, `name${id}`);
    result.date.month = dateMonth;
    result.date.day = dateDay;
    return result;
  }
}