import { Injectable } from '@angular/core';
import { Crop } from "../crop/crop";
import { Task } from "../task/task";
import { Element } from "./element";
import { ElementDate } from "./element-date";

@Injectable({
  providedIn: 'root'
})
export class JSONSerializerService {
  dumpAll(elements: Element[]): {}[] {
    return elements.map(elem => this.dump(elem));
  }

  dump(elem: Element): any {
    switch (elem.type) {
      case "crop":
        return this.dumpCrop(elem as Crop);
      case "task":
        return this.dumpTask(elem as Task);
      default:
        throw new Error(`can not dump the element: unknown type ${elem.type}`);
    }
  }

  private dumpCrop(crop: Crop): {} {
    return {
      "id": crop.id,
      "name": crop.name,
      "type": crop.type,
      "isSowing": crop.isSowing,
      "sowingDate": this.dumpDate(crop.sowingDate),
      "isTransplanting": crop.isTransplanting,
      "transplantingDate": this.dumpDate(crop.transplantingDate)
    };
  }

  private dumpTask(task: Task): {} {
    return {
      "id": task.id,
      "name": task.name,
      "type": task.type,
      "previousTaskId": task.previousTaskId,
      "date": this.dumpDate(task.date),
      "afterPreviousDays": task.afterPreviousDays,
      "doneDates": JSON.stringify(task.doneDates)
    };
  }

  private dumpDate(date: ElementDate) {
    return { "month": date.month, "day": date.day };
  }

  load(elementData: {}): Element {
    if (!("type" in elementData)) {
      throw new Error(`can not load the element: no type in ${elementData}`);
    }
    switch (elementData.type) {
      case "crop":
        return this.loadCrop(elementData);
      case "task":
        return this.loadTask(elementData);
      default:
        throw new Error(`can not load the element: unknown type ${elementData["type"]}`);
    }
  }

  private loadCrop(JSONCrop: any): Crop {
    let crop = new Crop(JSONCrop.id);
    crop.name = JSONCrop.name;
    crop.isSowing = JSONCrop.isSowing;
    if (crop.isSowing) {
      crop.sowingDate = new ElementDate(JSONCrop.sowingDate.month, JSONCrop.sowingDate.day);
    }
    crop.isTransplanting = JSONCrop.isTransplanting;
    if (crop.isTransplanting) {
      crop.transplantingDate = new ElementDate(JSONCrop.transplantingDate.month, JSONCrop.transplantingDate.day);
    }
    return crop;
  }

  private loadTask(jsonObject: any): Task {
    let newTask = new Task(jsonObject.id);
    newTask.name = jsonObject.name;
    newTask.previousTaskId = jsonObject.previousTaskId;
    newTask.date = new ElementDate(jsonObject.date.month, jsonObject.date.day);
    newTask.afterPreviousDays = jsonObject.afterPreviousDays;
    newTask.doneDates = {};
    Object.entries(JSON.parse(jsonObject.doneDates)).forEach(
      ([year, dateString]) => newTask.doneDates[parseInt(year)] = new Date(dateString as string));
    return newTask;
  }
}