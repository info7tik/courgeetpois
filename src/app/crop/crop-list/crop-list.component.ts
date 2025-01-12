import { Component } from '@angular/core';
import { Crop } from '../crop';
import { CropService } from '../crop.service';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrl: './crop-list.component.css'
})
export class CropListComponent {
  crops: Crop[] = [];

  constructor(private cropService: CropService) {
  }
}
