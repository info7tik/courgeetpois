import { Element } from "./element";
import { StorageService } from "./storage.service";

export abstract class ElementService<T extends Element> {
  protected elements: T[] = [];

  constructor(protected storageService: StorageService) {
    this.elements = this.loadElementsFromLocalStorage();
  }

  abstract getElements(): T[];
  abstract saveElementsToLocalStorage(): void;
  abstract loadElementsFromLocalStorage(): T[];

  addElement(element: T): void {
    if (this.hasElement(element.id)) {
      throw Error(`l'élement avec l'ID ${element.id} existe déjà`);
    }
    this.elements.push(element);
    this.saveElementsToLocalStorage();
  }

  hasElement(id: number): boolean {
    try {
      this.getElementById(id);
      return true;
    } catch {
      return false;
    }
  }

  getElementById(elementId: number): T {
    const foundTask = this.elements.find(elem => elem.id === elementId);
    if (foundTask !== undefined) {
      return foundTask;
    }
    throw Error(`aucun élément avec l'ID ${elementId}`);
  }

  updateElement(element: T): void {
    this.elements = this.elements.filter(existing => existing.id !== element.id);
    this.elements.push(element);
    this.saveElementsToLocalStorage();
  };

  deleteElement(element: T): void {
    this.elements = this.elements.filter(existing => existing.id !== element.id);
    this.saveElementsToLocalStorage();
  };
}