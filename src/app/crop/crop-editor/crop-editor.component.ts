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
  crop: string = "";

  constructor(private cropService: CropService) {
    super(cropService);
  }

  addCrop(): void {
    try {
      const newTask = new Crop(this.cropService.getNewId(), this.cropName);
      this.fillTaskAttributes(newTask);
      this.add(newTask);
    } catch (error) {
      this.showExceptionMessage(error);
    }
  }

  updateCrop(): void {
    try {
      const toUpdateCrop = new Crop(this.selectedElementId, this.cropName);
      this.fillTaskAttributes(toUpdateCrop);
      this.update(toUpdateCrop);
    } catch (error) {
      this.showExceptionMessage(error);
    }
  }

  private fillTaskAttributes(newCrop: Crop) {
    throw Error("not implemented yet!");
  }

  loadCrop(element: Crop): void {
    const crop = element;
    this.cropName = element.name;
    throw Error("not implemented yet!");
  }

  protected override clearForm(): void {
    this.selectedElementId = Constants.NO_SELECTED_ID;
    this.cropName = "";
    this.isSowing = false;
    this.isTransplanting = false;
    this.crop = "";
  }
}
