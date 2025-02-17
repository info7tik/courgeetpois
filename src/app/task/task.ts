import { Element } from "../common/element";
import { ElementDate } from "../common/element-date";
import { Constants } from "../constants";

export class Task extends Element {
  previousTaskId: number = Constants.NO_SELECTED_ID;
  date: ElementDate = new ElementDate(Constants.NO_TASK_DATE.month, Constants.NO_TASK_DATE.day);
  afterPreviousDays: number = 0;
  fullDate: Date = new Date();
  doneDates: { [year: number]: Date; } = {};

  constructor(id: number, name: string) {
    super(id, name);
  }

  isBeginningTask(): boolean {
    return this.previousTaskId === Constants.NO_SELECTED_ID;
  }

  hasDate(): boolean {
    return this.date.month >= 0 && this.date.day > 0;
  }

  markAsDone() {
    const today = new Date();
    this.doneDates[today.getFullYear()] = today;
  }

  isDone(): boolean {
    const today = new Date();
    return today.getFullYear() in this.doneDates;
  }

  computeFullDate(previousTask: Task | undefined) {
    if (this.isDone()) {
      const today = new Date();
      this.fullDate = this.doneDates[today.getFullYear()];
      return;
    }
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
    newTask.date = new ElementDate(jsonObject["date"]["month"], jsonObject["date"]["day"]);
    newTask.afterPreviousDays = jsonObject["afterPreviousDays"];
    newTask.doneDates = {};
    Object.entries(JSON.parse(jsonObject["doneDates"])).forEach(
      ([year, dateString]) => newTask.doneDates[parseInt(year)] = new Date(dateString as string));
    return newTask;
  }

  toJSON(): {} {
    return {
      "id": this._id,
      "name": this._name,
      "previousTaskId": this.previousTaskId,
      "date": this.date.toJSON(),
      "afterPreviousDays": this.afterPreviousDays,
      "doneDates": JSON.stringify(this.doneDates)
    };
  }
}
