import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'smartfit_theme';
    private isDarkMode = false;

    constructor() {
        this.initTheme();
    }

    /**
     * Initialize theme from localStorage or system preference
     */
    private initTheme(): void {
        const savedTheme = localStorage.getItem(this.THEME_KEY);

        if (savedTheme) {
            this.isDarkMode = savedTheme === 'dark';
        } else {
            // Check system preference
            this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        this.applyTheme();
    }

    /**
     * Apply theme to document
     */
    private applyTheme(): void {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    /**
     * Toggle dark mode
     */
    toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        localStorage.setItem(this.THEME_KEY, this.isDarkMode ? 'dark' : 'light');
    }

    /**
     * Get current theme
     */
    isDark(): boolean {
        return this.isDarkMode;
    }

    /**
     * Set theme
     */
    setDarkMode(isDark: boolean): void {
        this.isDarkMode = isDark;
        this.applyTheme();
        localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
    }
}
