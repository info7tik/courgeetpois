import { Element } from "../common/element";

export class Crop extends Element {
  isSowing: boolean = false;
  isTransplanting: boolean = false;

  constructor(id: number, name: string) {
    super(id, name);
  }

  static buildCropFromJSON(JSONCrop: any): Crop {
    let crop = new Crop(JSONCrop.id, JSONCrop.name);
    crop.isSowing = JSONCrop.isSowing;
    crop.isTransplanting = JSONCrop.isTransplanting;
    return crop;
  }
}