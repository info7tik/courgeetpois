import { Component } from '@angular/core';
import { SeedService } from '../seed.service';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrl: './crop-list.component.css'
})
export class CropListComponent {
  seeds: string[] = [];

  constructor(private seedService: SeedService) {
    this.seeds = this.seedService.getSeeds();
  }
}
