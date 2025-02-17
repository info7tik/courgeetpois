import { ElementType } from "./element.type";

export abstract class Element {
  protected _id: number;
  protected _name: string;
  protected _type: ElementType;

  constructor(identifier: number, name: string, type: ElementType) {
    this._id = identifier;
    this._name = name;
    this._type = type;
  };

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get type(): ElementType {
    return this._type;
  }
}