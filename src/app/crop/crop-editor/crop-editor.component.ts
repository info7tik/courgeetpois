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

  selectedCropId: number = Constants.NO_SELECTED_ID;
  cropName: string = "";
  isSowing: boolean = false;
  isTransplanting: boolean = false;

  constructor(private cropService: CropService) {
    super(cropService);
  }

  addCrop(): void {
    try {
      const newCrop = new Crop(this.cropService.getNewId());
      this.fillCropAttributes(newCrop);
      this.add(newCrop);
    } catch (error) {
      this.showExceptionMessage(error);
    }
  };

  updateCrop(): void {
    try {
      const toUpdateCrop = new Crop(this.selectedElementId);
      this.fillCropAttributes(toUpdateCrop);
      this.update(toUpdateCrop);
    } catch (error) {
      this.showExceptionMessage(error);
    }
  }

  private fillCropAttributes(crop: Crop) {
    crop.name = this.cropName;
    crop.isSowing = this.isSowing;
    crop.isTransplanting = this.isTransplanting;
    if (crop.isSowing) {
      crop.sowingDate = this.sowingDate.getDate();
    }
    if (crop.isTransplanting) {
      crop.transplantingDate = this.transplantingDate.getDate();
    }
  }

  loadCrop(element: Crop): void {
    console.log(this.sowingDate);
    this.selectedElementId = element.id;
    this.cropName = element.name;
    this.isSowing = element.isSowing;
    this.isTransplanting = element.isTransplanting;
    if (this.isSowing) {
      this.sowingDate.day = element.sowingDate.day;
      this.sowingDate.month = element.sowingDate.month;
    }
    if (this.isTransplanting) {
      this.transplantingDate.day = element.transplantingDate.day;
      this.transplantingDate.month = element.transplantingDate.month;
    }
  }

  protected override clearForm(): void {
    this.selectedElementId = Constants.NO_SELECTED_ID;
  }
}
