import { Constants } from "./constants";
import { TaskDate } from "./task-date";

export class Task {
  private _id: number;
  private _name: string;
  previousTaskId: number = Constants.NO_SELECTED_TASK_ID;
  date: TaskDate = { "month": 0, "day": 0 };
  afterPreviousDays: number = 0;
  fullDate: Date = new Date();
  doneDates: { [year: number]: string; } = {};

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

  hasDate(): boolean {
    return this.date.month > 0 && this.date.day > 0;
  }

  markAsDone() {
    //TODO add the current date to the doneDates
  }

  isDone(): boolean {
    //TODO
    return false;
  }

  computeFullDate(previousTask: Task | undefined) {
    //TODO: if this has doneDate for the current year, return the doneDate
    if (this.isBeginningTask()) {
      if (this.hasDate()) {
        let fullDate = new Date();
        fullDate.setMonth(this.date.month, this.date.day);
        this.fullDate = fullDate;
      } else {
        throw Error(`Wrong date format month:${this.date.month}, day:${this.date.day}`);
      }
    } else {
      if (previousTask) {
        let fullDate = new Date(previousTask.fullDate);
        fullDate.setDate(fullDate.getDate() + this.afterPreviousDays);
        this.fullDate = fullDate;
      } else {
        throw Error(`No previous task for task with ID ${this.id}`);
      }
    }
  }

  static buildTaskFromJSON(jsonObject: any): Task {
    let newTask = new Task(jsonObject["id"], jsonObject["name"]);
    newTask.previousTaskId = jsonObject["previousTaskId"];
    newTask.date = jsonObject["date"];
    newTask.afterPreviousDays = jsonObject["afterPreviousDays"];
    // TODO: load the doneDates with format MM/DD/YYYY
    return newTask;
  }

  toJSON(): {} {
    // TODO: export the doneDates with format MM/DD/YYYY
    return {
      "id": this._id,
      "name": this._name,
      "previousTaskId": this.previousTaskId,
      "date": { "month": this.date.month, "day": this.date.day },
      "afterPreviousDays": this.afterPreviousDays
    };
  }
}
