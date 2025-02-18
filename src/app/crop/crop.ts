import { Element } from "../common/element";
import { ElementDate } from "../common/element-date";
import { Constants } from "../constants";

export class Crop extends Element {
  isSowing: boolean = false;
  sowingDate: ElementDate = new ElementDate(Constants.NO_TASK_DATE.month, Constants.NO_TASK_DATE.day);
  isTransplanting: boolean = false;
  transplantingDate: ElementDate = new ElementDate(Constants.NO_TASK_DATE.month, Constants.NO_TASK_DATE.day);

  constructor(id: number) {
    super(id, "crop");
  }

  copyAttributes(crop: Crop) {
    this.name = crop.name;
    this.isSowing = crop.isSowing;
    this.sowingDate = crop.sowingDate;
    this.isTransplanting = crop.isTransplanting;
    this.transplantingDate = crop.transplantingDate;
  }
}