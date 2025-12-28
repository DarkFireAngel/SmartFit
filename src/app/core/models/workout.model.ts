export interface ExerciseSet {
    setNumber: number;
    weight: number; // kg
    reps: number;
    completed: boolean;
    previousWeight?: number;
    previousReps?: number;
}

export interface Exercise {
    id: string;
    name: string;
    targetSets: number;
    targetRepsMin: number;
    targetRepsMax: number;
    sets: ExerciseSet[];
    notes?: string;
}

export enum WorkoutStatus {
    PLANNED = 'planned',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed'
}

export interface Workout {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    startTime?: Date;
    endTime?: Date;
    exercises: Exercise[];
    status: WorkoutStatus;
    totalVolume: number; // kg (weight * reps sum)
    totalDuration: number; // minutes
    caloriesBurned: number;
}

export interface SimpleWorkout {
    id: string;
    name: string;
    description: string;
    duration: number; // minutes
    caloriesBurned: number;
    date: string;
    completed: boolean;
}
