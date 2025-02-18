import { Component } from '@angular/core';
import { StorageService } from '../common/storage.service';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrl: './data-manager.component.css'
})
export class DataManagerComponent {

  constructor(private storageService: StorageService) { }

  deleteLocalStorage() {
    this.storageService.deleteAllStoredInformation();
  }
}
