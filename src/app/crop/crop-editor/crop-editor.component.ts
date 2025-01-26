import { Component, ViewChild } from '@angular/core';
import { AnnualDateComponent } from '../../annual-date/annual-date.component';
import { Editor } from '../../common/editor.abstract';
import { Constants } from '../../constants';
import { Crop } from '../crop';
import { CropService } from '../crop.service';

@Component({
  selector: 'app-crop-editor',
  templateUrl: './crop-editor.component.html',
  styleUrl: './crop-editor.component.css'
})
export class CropEditorComponent extends Editor<Crop> {
  @ViewChild("transplanting") transplantingDate!: AnnualDateComponent;
  @ViewChild("sowing") sowingDate!: AnnualDateComponent;

  selectedCropId: string = "";
  cropName: string = "";
  isSowing: boolean = false;
  isTransplanting: boolean = false;

  constructor(private cropService: CropService) {
    super(cropService);
  }

  addCrop(): void {
    try {
      const newCrop = new Crop(this.cropService.getNewId(), this.cropName);
      this.fillCropAttributes(newCrop);
      this.add(newCrop);
    } catch (error) {
      this.showExceptionMessage(error);
    }
  }

  updateCrop(): void {
    try {
      const toUpdateCrop = new Crop(this.selectedElementId, this.cropName);
      this.fillCropAttributes(toUpdateCrop);
      this.update(toUpdateCrop);
    } catch (error) {
      this.showExceptionMessage(error);
    }
  }

  private fillCropAttributes(newCrop: Crop) {
    newCrop.isSowing = this.isSowing;
    newCrop.isTransplanting = this.isTransplanting;
  }

  loadCrop(element: Crop): void {
    this.selectedElementId = element.id;
    this.cropName = element.name;
    this.isSowing = element.isSowing;
    this.isTransplanting = element.isTransplanting;
  }

  protected override clearForm(): void {
    this.selectedElementId = Constants.NO_SELECTED_ID;
    this.cropName = "";
    this.isSowing = false;
    this.isTransplanting = false;
  }
}
