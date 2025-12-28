import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    private currentDate: Date = new Date();

    constructor() { }

    getCurrentDate(): Date {
        return new Date(this.currentDate);
    }

    setCurrentDate(date: Date): void {
        this.currentDate = new Date(date);
    }

    getDateString(): string {
        return this.currentDate.toISOString().split('T')[0];
    }

    getFormattedDate(): string {
        const day = this.currentDate.getDate();
        const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
            'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
        return `${day} ${months[this.currentDate.getMonth()]}`;
    }

    getShortFormattedDate(): string {
        const day = this.currentDate.getDate();
        const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
            'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
        return `${day} ${months[this.currentDate.getMonth()]}`;
    }

    previousDay(): void {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
    }

    nextDay(): void {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
    }

    goToToday(): void {
        this.currentDate = new Date();
    }

    isToday(): boolean {
        const today = new Date();
        return this.currentDate.toDateString() === today.toDateString();
    }

    getDayOfWeek(): string {
        const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        return days[this.currentDate.getDay()];
    }
}
