import { Component } from '@angular/core';
import { SeedService } from '../seed.service';

@Component({
  selector: 'app-crop-editor',
  templateUrl: './crop-editor.component.html',
  styleUrl: './crop-editor.component.css'
})
export class CropEditorComponent {
  seed: string = '';
  message: string = '';

  constructor(private seedService: SeedService) { }

  onSubmit(): void {
    if (this.seed.trim()) {
      this.seedService.addSeed(this.seed);
      this.seed = '';
      this.showMessage('Graine ajoutée avec succès !');
    }
  }

  showMessage(message: string): void {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
