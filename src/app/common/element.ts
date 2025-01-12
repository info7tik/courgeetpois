export abstract class Element {
  protected _id: number;
  protected _name: string;

  constructor(identifier: number, name: string) {
    this._id = identifier;
    this._name = name;
  };

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

}