import { Constants } from "./constants";
import { TaskDate } from "./task-date";

export class Task {
  private _id: number;
  private _name: string;
  previousTaskId: number = Constants.NO_SELECTED_TASK_ID;
  date: TaskDate = { "month": 0, "day": 0 };
  afterPreviousDays: number = 0;
  fullDate: Date = new Date();

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  static buildTaskFromJSON(jsonObject: any): Task {
    let newTask = new Task(jsonObject["id"], jsonObject["name"]);
    newTask.previousTaskId = jsonObject["previousTaskId"];
    newTask.date = jsonObject["date"];
    newTask.afterPreviousDays = jsonObject["afterPreviousDays"];
    return newTask;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  isBeginningTask(): boolean {
    return this.previousTaskId === Constants.NO_SELECTED_TASK_ID;
  }

  hasDate(): boolean {
    return this.date.month > 0 && this.date.day > 0;
  }

  toJSON(): {} {
    return {
      "id": this._id,
      "name": this._name,
      "previousTaskId": this.previousTaskId,
      "date": { "month": this.date.month, "day": this.date.day },
      "afterPreviousDays": this.afterPreviousDays
    };
  }
}
