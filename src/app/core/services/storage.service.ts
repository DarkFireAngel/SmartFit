import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    /**
     * Save data to localStorage
     */
    setItem<T>(key: string, value: T): void {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
        } catch (error) {
            console.error(`Error saving to localStorage (key: ${key}):`, error);
        }
    }

    /**
     * Get data from localStorage
     */
    getItem<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;
            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Error reading from localStorage (key: ${key}):`, error);
            return null;
        }
    }

    /**
     * Remove item from localStorage
     */
    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing from localStorage (key: ${key}):`, error);
        }
    }

    /**
     * Clear all localStorage data
     */
    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }

    /**
     * Export all SmartFit data as JSON
     */
    exportAllData(): string {
        const allData: { [key: string]: any } = {};

        // Get all keys that start with 'smartfit_'
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('smartfit_')) {
                const value = localStorage.getItem(key);
                if (value) {
                    try {
                        allData[key] = JSON.parse(value);
                    } catch {
                        allData[key] = value;
                    }
                }
            }
        }

        return JSON.stringify(allData, null, 2);
    }

    /**
     * Import data from JSON string
     */
    importData(jsonString: string): boolean {
        try {
            const data = JSON.parse(jsonString);

            // Clear existing SmartFit data
            const keysToRemove: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('smartfit_')) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));

            // Import new data
            Object.keys(data).forEach(key => {
                localStorage.setItem(key, JSON.stringify(data[key]));
            });

            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    /**
     * Download data as JSON file
     */
    downloadDataAsFile(): void {
        const jsonData = this.exportAllData();
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `smartfit-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Upload and import data from JSON file
     */
    uploadDataFromFile(file: File): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    const success = this.importData(content);
                    resolve(success);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }
}
