import { Injectable } from '@angular/core';
import { SimpleWorkout, Workout } from '../models/workout.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {
    private readonly WORKOUTS_KEY = 'smartfit_workouts';

    constructor(private storage: StorageService) { }

    /**
     * Get workouts for a specific date
     */
    getWorkoutsForDate(date: string): SimpleWorkout[] {
        const allWorkouts = this.storage.getItem<{ [date: string]: SimpleWorkout[] }>(this.WORKOUTS_KEY) || {};
        return allWorkouts[date] || [];
    }

    /**
     * Add workout
     */
    addWorkout(date: string, workout: SimpleWorkout): void {
        const workouts = this.getWorkoutsForDate(date);
        workouts.push(workout);
        this.saveWorkouts(date, workouts);
    }

    /**
     * Toggle workout completion
     */
    toggleWorkoutCompletion(date: string, workoutId: string): void {
        const workouts = this.getWorkoutsForDate(date);
        const workout = workouts.find(w => w.id === workoutId);

        if (workout) {
            workout.completed = !workout.completed;
            this.saveWorkouts(date, workouts);
        }
    }

    /**
     * Remove workout
     */
    removeWorkout(date: string, workoutId: string): void {
        const workouts = this.getWorkoutsForDate(date);
        const filtered = workouts.filter(w => w.id !== workoutId);
        this.saveWorkouts(date, filtered);
    }

    /**
     * Save workouts to storage
     */
    private saveWorkouts(date: string, workouts: SimpleWorkout[]): void {
        const allWorkouts = this.storage.getItem<{ [date: string]: SimpleWorkout[] }>(this.WORKOUTS_KEY) || {};
        allWorkouts[date] = workouts;
        this.storage.setItem(this.WORKOUTS_KEY, allWorkouts);
    }

    /**
     * Generate unique ID
     */
    generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get current date string (YYYY-MM-DD)
     */
    getCurrentDate(): string {
        return new Date().toISOString().split('T')[0];
    }
}
