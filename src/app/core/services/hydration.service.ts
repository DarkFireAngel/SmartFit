import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DailyHydration, HydrationEntry } from '../models/hydration.model';

@Injectable({
    providedIn: 'root'
})
export class HydrationService {
    private readonly STORAGE_KEY_PREFIX = 'smartfit_hydration_';

    constructor(private storageService: StorageService) { }

    getHydrationForDate(date: string): DailyHydration {
        const key = this.getStorageKey(date);
        const stored = this.storageService.getItem<DailyHydration>(key);

        if (stored) {
            // Ensure totalLiters is calculated
            if (!stored.totalLiters) {
                stored.totalLiters = this.calculateTotalLiters(stored.entries);
            }
            if (!stored.goalLiters) {
                stored.goalLiters = 2.5;
            }
            return stored;
        }

        return {
            date,
            entries: [],
            totalLiters: 0,
            goalLiters: 2.5
        };
    }

    addWater(date: string, milliliters: number): void {
        const dailyHydration = this.getHydrationForDate(date);

        const entry: HydrationEntry = {
            id: this.generateId(),
            amount: milliliters,
            date,
            timestamp: new Date()
        };

        dailyHydration.entries.push(entry);
        dailyHydration.totalLiters = this.calculateTotalLiters(dailyHydration.entries);

        this.saveDailyHydration(date, dailyHydration);
    }

    removeWater(date: string, milliliters: number): void {
        const dailyHydration = this.getHydrationForDate(date);

        if (dailyHydration.entries.length > 0) {
            const lastEntry = dailyHydration.entries[dailyHydration.entries.length - 1];

            if (lastEntry.amount <= milliliters) {
                dailyHydration.entries.pop();
            } else {
                lastEntry.amount -= milliliters;
            }

            dailyHydration.totalLiters = this.calculateTotalLiters(dailyHydration.entries);
            this.saveDailyHydration(date, dailyHydration);
        }
    }

    deleteEntry(date: string, entryId: string): void {
        const dailyHydration = this.getHydrationForDate(date);
        dailyHydration.entries = dailyHydration.entries.filter(e => e.id !== entryId);
        dailyHydration.totalLiters = this.calculateTotalLiters(dailyHydration.entries);
        this.saveDailyHydration(date, dailyHydration);
    }

    private calculateTotalLiters(entries: HydrationEntry[]): number {
        const totalMl = entries.reduce((sum, entry) => sum + entry.amount, 0);
        return totalMl / 1000;
    }

    private saveDailyHydration(date: string, data: DailyHydration): void {
        const key = this.getStorageKey(date);
        this.storageService.setItem(key, data);
    }

    private getStorageKey(date: string): string {
        return `${this.STORAGE_KEY_PREFIX}${date}`;
    }

    private generateId(): string {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }
}
