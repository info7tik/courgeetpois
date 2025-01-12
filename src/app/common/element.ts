export abstract class Element {
  protected _id: number;
  protected _name: string;
  type: "task" | "crop";

  constructor(type: "task" | "crop", identifier: number, name: string) {
    this._id = identifier;
    this._name = name;
    this.type = type;
  };

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

}