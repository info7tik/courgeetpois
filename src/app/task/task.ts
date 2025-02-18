import { Element } from "../common/element";
import { ElementDate } from "../common/element-date";
import { Constants } from "../constants";

export class Task extends Element {
  previousTaskId: number = Constants.NO_SELECTED_ID;
  date: ElementDate = new ElementDate(Constants.NO_TASK_DATE.month, Constants.NO_TASK_DATE.day);
  afterPreviousDays: number = 0;
  fullDate: Date = new Date();
  doneDates: { [year: number]: Date; } = {};

  constructor(id: number) {
    super(id, "task");
  }

  isBeginningTask(): boolean {
    return this.previousTaskId === Constants.NO_SELECTED_ID;
  }

  hasDate(): boolean {
    return this.date.isComplete();
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
        this.fullDate = this.date.toDate();
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
}
