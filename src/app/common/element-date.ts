
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

  isComplete(): boolean {
    return this._month >= 0 && this._day > 0;
  }

  toDate(): Date {
    let fullDate = new Date();
    fullDate.setMonth(this._month - 1, this.day);
    return fullDate;
  }
};
