import { dateData } from "./date-data.type";

export class ElementDate {
  private _month: number;
  private _day: number;

  constructor(month: number, day: number) {
    this._month = month;
    this._day = day;
  }

  get month(): number {
    return this._month;
  }

  get day(): number {
    return this._day;
  }

  toJSON(): dateData {
    return { "month": this._month, "day": this._day };
  }
};
