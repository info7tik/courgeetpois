import { Injectable } from '@angular/core';
import { Element } from './element';
import { ElementType } from './element.type';
import { JSONSerializerService } from './json-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private JSONSerializer: JSONSerializerService) { }

  deleteAllStoredInformation() {
    localStorage.clear();
  }

  loadFromLocalStorage(type: ElementType): Element[] {
    const storedElements = localStorage.getItem(type);
    if (storedElements) {
      return JSON.parse(storedElements).map((JSONElement: {}) => this.JSONSerializer.load(JSONElement));
    } else {
      return [];
    }
  }

  saveToLocalStorage(elements: Element[]): void {
    let sortedByType: { [type: string]: Element[]; } = {};
    elements.forEach(elem => {
      if (!(elem.type in sortedByType)) {
        sortedByType[elem.type] = [];
      }
      sortedByType[elem.type].push(elem);
    });
    Object.keys(sortedByType)
      .forEach(type => localStorage.setItem(type, JSON.stringify(this.JSONSerializer.dumpAll(sortedByType[type]))));
  }
}
