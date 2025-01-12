import { Component } from '@angular/core';
import { Constants } from '../../constants';
import { CropService } from '../crop.service';

@Component({
  selector: 'app-crop-editor',
  templateUrl: './crop-editor.component.html',
  styleUrl: './crop-editor.component.css'
})
export class CropEditorComponent {
  selectedCropId: string = "";
  cropName: string = "";
  isSowing: boolean = false;
  isTransplanting: boolean = false;
  message: string = "";
  crop: string = "";

  constructor(private cropService: CropService) { }

  isNewCrop(): boolean {
    return this.selectedCropId === Constants.NO_SELECTED_CROP_ID;
  }

  addCrop(): void {
  }

  showMessage(message: string): void {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
