import { Constants } from "./constants";
import { TaskDate } from "./task-date";

export class Task {
  private _id: number;
  private _name: string;
  date: TaskDate = { "month": 0, "day": 0 };
  previousTaskId: number = Constants.NO_SELECTED_TASK_ID;
  afterPreviousDays: number = 0;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
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
}
