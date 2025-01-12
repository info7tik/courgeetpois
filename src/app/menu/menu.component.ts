import { Component } from '@angular/core';
import { StorageService } from '../common/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  showMenu = false;

  constructor(private storageService: StorageService) { }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  deleteLocalStorage() {
    this.storageService.deleteAllStoredInformation();
  }
}
