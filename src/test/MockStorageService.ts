import { Element } from "../app/common/element";
import { ElementType } from "../app/common/element.type";
import { StorageService } from "../app/common/storage.service";

export class MockStorageService extends StorageService {
  private elements: Element[] = [];

  override saveToLocalStorage(elements: Element[]): void {
    this.elements = elements;
  }
  override loadFromLocalStorage(type: ElementType): Element[] {
    return this.elements;
  }
}