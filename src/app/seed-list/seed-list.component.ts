import { Component } from '@angular/core';
import { SeedService } from '../seed.service';

@Component({
    selector: 'app-seed-list',
    templateUrl: './seed-list.component.html',
    styleUrl: './seed-list.component.css'
})
export class SeedListComponent {
    seeds: string[] = [];

    constructor(private seedService: SeedService) {
        this.seeds = this.seedService.getSeeds();
    }
}
