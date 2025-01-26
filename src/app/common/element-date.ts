export class ElementDate {
  private _month: number;
  private _day: number;

  constructor(data: { [type: string]: number; }) {
    this._month = data["month"];
    this._day = data["day"];
  }

  get month(): number {
    return this._month;
  }

  get day(): number {
    return this._day;
  }

  toJSON(): {} {
    return { "month": this._month, "day": this._day };
  }
};
