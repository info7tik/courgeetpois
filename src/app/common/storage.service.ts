import { Injectable } from '@angular/core';
import { Element } from './element';
import { ElementType, elementTypeValues } from './element.type';
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

  export(): string {
    const result: { [type: string]: {}; } = {};
    for (const type of elementTypeValues) {
      const jsonValue = localStorage.getItem(type);
      if (jsonValue) {
        result[type] = JSON.parse(jsonValue);
      }
    }
    return JSON.stringify(result);
  }

  import(jsonData: { [type: string]: {}; }): void {
    const jsonKeys = Object.keys(jsonData);
    if (jsonKeys.every(key => elementTypeValues.includes(key))) {
      jsonKeys.forEach(key => localStorage.setItem(key, JSON.stringify(jsonData[key])));
    } else {
      const invalidKeys = jsonKeys.filter(key => !elementTypeValues.includes(key));
      throw new Error(
        `impossible de charger le fichier JSON: le fichier contient les clés inconnues suivantes: ${invalidKeys}`);
    }
  }
}
