import { ElementType } from "./element.type";

export abstract class Element {
  protected _id: number;
  protected _type: ElementType;
  public name: string;

  constructor(identifier: number, type: ElementType) {
    this._id = identifier;
    this._type = type;
    this.name = "";
  };

  get id(): number {
    return this._id;
  }

  get type(): ElementType {
    return this._type;
  }
}