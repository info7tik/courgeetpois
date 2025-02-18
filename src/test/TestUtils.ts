import { ElementDate } from "../app/common/element-date";
import { Crop } from "../app/crop/crop";
import { Task } from "../app/task/task";

export class TestUtils {
  createTask(id: number, dateMonth: number, dateDay: number, previousTaskId?: number): Task {
    let result = new Task(id);
    result.date = new ElementDate(dateMonth, dateDay);
    if (previousTaskId !== undefined) {
      result.previousTaskId = previousTaskId;
    }
    return result;
  }

  createCrop(id: number, isSowing: boolean, isTransplanting: boolean): Crop {
    let result = new Crop(id);
    if (isSowing) {
      result.isSowing = true;
      result.sowingDate = new ElementDate(this.generateRandomMonth(), this.generateRandomDay());
    }
    if (isTransplanting) {
      result.isTransplanting = true;
      result.transplantingDate = new ElementDate(this.generateRandomMonth(), this.generateRandomDay());
    }
    return result;
  }

  private generateRandomMonth() {
    return this.generateRandomInt(12);
  }

  private generateRandomDay() {
    return this.generateRandomInt(29) + 1;
  }

  private generateRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}