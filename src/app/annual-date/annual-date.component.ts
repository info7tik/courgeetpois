import { Component } from '@angular/core';
import { ElementDate } from '../common/element-date';

@Component({
  selector: 'app-annual-date',
  templateUrl: './annual-date.component.html',
  styleUrl: './annual-date.component.css'
})
export class AnnualDateComponent {
  month: number = 0;
  day: number = 0;

  getDate(): ElementDate {
    if (this.hasTaskDate()) {
      return { "month": this.month - 1, "day": this.day };
    }
    throw Error(`date mal définie: m:${this.month}, d:${this.day}`);
  }

  private hasTaskDate(): boolean {
    return this.month > 0 && this.day > 0;
  }

  load(month: number, day: number) {
    this.month = month + 1;
    this.day = day;
  }

  reset() {
    this.month = 0;
    this.day = 0;
  }
}
