export class Crop {
  id: string;
  name: string;
  isSowing: boolean = false;
  isTransplanting: boolean = false;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static buildCropFromJSON(JSONCrop: any): Crop {
    let crop = new Crop(JSONCrop.id, JSONCrop.name);
    crop.isSowing = JSONCrop.isSowing;
    crop.isTransplanting = JSONCrop.isTransplanting;
    return crop;
  }
}