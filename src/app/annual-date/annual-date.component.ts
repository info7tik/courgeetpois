import { Component, Input } from '@angular/core';
import { ElementDate } from '../common/element-date';

@Component({
  selector: 'app-annual-date',
  templateUrl: './annual-date.component.html',
  styleUrl: './annual-date.component.css'
})
export class AnnualDateComponent {
  @Input({ required: true }) disabled!: boolean;
  month: number = 0;
  day: number = 0;

  getDate(): ElementDate {
    if (this.hasTaskDate()) {
      return new ElementDate(this.month, this.day);
    }
    throw Error(`date mal définie: mois:${this.month}, jour:${this.day}`);
  }

  private hasTaskDate(): boolean {
    return this.month > 0 && this.day > 0;
  }

  load(month: number, day: number) {
    this.month = month;
    this.day = day;
  }

  reset() {
    this.month = 0;
    this.day = 0;
  }
}
