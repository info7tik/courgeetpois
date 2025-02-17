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
      "sowingDate": crop.sowingDate.toJSON(),
      "isTransplanting": crop.isTransplanting,
      "transplantingDate": crop.transplantingDate.toJSON()
    };
  }

  private dumpTask(task: Task): {} {
    return {
      "id": task.id,
      "name": task.name,
      "type": task.type,
      "previousTaskId": task.previousTaskId,
      "date": task.date.toJSON(),
      "afterPreviousDays": task.afterPreviousDays,
      "doneDates": JSON.stringify(task.doneDates)
    };
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
    let crop = new Crop(JSONCrop.id, JSONCrop.name);
    crop.isSowing = JSONCrop.isSowing;
    crop.isTransplanting = JSONCrop.isTransplanting;
    return crop;
  }

  private loadTask(jsonObject: any): Task {
    let newTask = new Task(jsonObject.id, jsonObject.name);
    newTask.previousTaskId = jsonObject.previousTaskId;
    newTask.date = new ElementDate(jsonObject.date.month, jsonObject.date.day);
    newTask.afterPreviousDays = jsonObject.afterPreviousDays;
    newTask.doneDates = {};
    Object.entries(JSON.parse(jsonObject.doneDates)).forEach(
      ([year, dateString]) => newTask.doneDates[parseInt(year)] = new Date(dateString as string));
    return newTask;
  }
}