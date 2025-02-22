import { Component } from '@angular/core';
import { StorageService } from '../common/storage.service';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrl: './data-manager.component.css'
})
export class DataManagerComponent {

  constructor(private storageService: StorageService) { }
  file: File | null = null;

  exportJson(): void {
    const jsonData = this.storageService.export();
    if (jsonData) {
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'courgeEtPois.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      alert('No JSON data found in localStorage');
    }
  }

  onFileSelected(event: any): void {
    const input = event.target;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
    }
  }

  saveJSONFile(): void {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const jsonContent = e.target.result;
        try {
          const jsonData = JSON.parse(jsonContent);
          this.storageService.import(jsonData);
          alert('Fichier importé avec succès');
        } catch (error) {
          alert(error);
        }
      };
      reader.readAsText(this.file);
    } else {
      alert('Merci de sélectionner le fichier à importer');
    }
  }

  deleteLocalStorage() {
    this.storageService.deleteAllStoredInformation();
  }
}
