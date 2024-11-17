import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SeedService {
    private seeds: string[] = [];
    private storageKey = 'seeds';

    constructor() {
        this.loadGrainesFromLocalStorage();
    }

    private loadGrainesFromLocalStorage(): void {
        const storedSeeds = localStorage.getItem(this.storageKey);
        if (storedSeeds) {
            this.seeds = JSON.parse(storedSeeds);
        }
    }


    addSeed(seed: string): void {
        this.seeds.push(seed);
        this.saveGrainesToLocalStorage();
    }

    private saveGrainesToLocalStorage(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.seeds));
    }

    getSeeds(): string[] {
        return this.seeds;
    }
}
