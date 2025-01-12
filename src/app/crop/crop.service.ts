import { Injectable } from '@angular/core';
import { StorageService } from '../common/storage.service';
import { Crop } from './crop';

@Injectable({
  providedIn: 'root'
})
export class CropService {
  private readonly MAX_CROPS_NUMBER = 10000;
  private crops: Crop[] = [];

  constructor(private storageService: StorageService) {
    this.crops = this.storageService.loadCropsFromLocalStorage();
  }


  add(crop: Crop): void {
    this.crops.push(crop);
    this.storageService.saveCropsToLocalStorage(this.crops);
  }

  getElements(): Crop[] {
    return this.crops;
  }

  getNewId(): string {
    const beginningId = "crop";
    const existingIds = this.crops.map(crop => crop.id);
    for (let counter = 1; counter < this.MAX_CROPS_NUMBER; counter++) {
      const newId = `${beginningId}${counter}`;
      if (!existingIds.includes(newId)) {
        return newId;
      }
    }
    throw new Error(`can not generate crop id: too many registered crops`);
  }

}
