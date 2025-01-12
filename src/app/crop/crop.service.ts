import { Injectable } from '@angular/core';
import { ElementService } from '../common/element.service.abstract';
import { StorageService } from '../common/storage.service';
import { Crop } from './crop';

@Injectable({
  providedIn: 'root'
})
export class CropService extends ElementService<Crop> {

  constructor(storageService: StorageService) {
    super(storageService);
  }

  saveElementsToLocalStorage(): void {
    this.storageService.saveCropsToLocalStorage(this.elements);
  }

  loadElementsFromLocalStorage(): Crop[] {
    return this.storageService.loadCropsFromLocalStorage();
  }
}
