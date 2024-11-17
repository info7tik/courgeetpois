import { Component } from '@angular/core';
import { SeedService } from '../seed.service';

@Component({
    selector: 'app-seed-editor',
    templateUrl: './seed-editor.component.html',
    styleUrl: './seed-editor.component.css'
})
export class SeedEditorComponent {
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
