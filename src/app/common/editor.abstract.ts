import { Constants } from "../constants";
import { Element } from "./element";
import { ElementService } from "./element.service.abstract";

export abstract class Editor<T extends Element> {
  message: string = '';
  errorMessage: string = '';
  selectedElementId: number = Constants.NO_SELECTED_ID;
  elements: T[] = [];

  private service: ElementService<T>;

  constructor(service: ElementService<T>) {
    this.service = service;
    this.clearForm();
  };

  protected abstract clearForm(): void;

  add(newElement: T): void {
    try {
      this.service.addElement(newElement);
      this.showMessage(`L'élément a été ajouté!`);
      this.clearForm();
      this.elements = this.service.getElements();
    } catch (error) {
      this.showExceptionMessage(error);
    }
  }

  protected deleteSelectedElement(): void {
    if (!this.isNewElement()) {
      try {
        const element = this.service.getElementById(this.selectedElementId);
        this.service.deleteElement(element);
        this.elements = this.service.getElements();
        this.clearForm();
      } catch (error) {
        this.showExceptionMessage(error);
      }
    }
  }

  protected isNewElement(): boolean {
    return this.selectedElementId === Constants.NO_SELECTED_ID;
  }

  protected update(element: T): void {
    try {
      this.service.updateElement(element);
      this.showMessage(`L'élément a été mis à jour!`);
      this.clearForm();
      this.elements = this.service.getElements();
    } catch (error) {
      if (error instanceof (Error)) {
        this.showErrorMessage(error.message);
      } else {
        this.showErrorMessage(error as string);
      }
    }
  }

  protected showExceptionMessage(error: unknown) {
    if (error instanceof (Error)) {
      this.showErrorMessage(error.message);
    } else {
      this.showErrorMessage(error as string);
    }
  }

  protected showMessage(message: string): void {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  protected showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
    this.message = '';
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}