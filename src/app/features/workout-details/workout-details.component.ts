import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

interface ExerciseSet {
  setNumber: number;
  previousWeight?: number;
  previousReps?: number;
  weight?: number;
  reps?: number;
  completed: boolean;
}

interface Exercise {
  name: string;
  targetSets: number;
  targetRepsMin: number;
  targetRepsMax: number;
  sets: ExerciseSet[];
  isActive: boolean;
}

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit, OnDestroy {
  workoutName = 'Push Day - Morning';
  elapsedTime = '00:45:12';

  // Stats
  totalVolume = 4250;
  duration = 45;
  caloriesBurned = 320;

  // Exercises
  exercises: Exercise[] = [
    {
      name: 'Panca Piana (Bench Press)',
      targetSets: 3,
      targetRepsMin: 8,
      targetRepsMax: 12,
      isActive: true,
      sets: [
        { setNumber: 1, previousWeight: 60, previousReps: 10, weight: 60, reps: 10, completed: true },
        { setNumber: 2, previousWeight: 60, previousReps: 10, weight: 60, reps: undefined, completed: false },
        { setNumber: 3, previousWeight: 60, previousReps: 8, weight: undefined, reps: undefined, completed: false }
      ]
    },
    {
      name: 'Croci ai Cavi (Cable Flys)',
      targetSets: 3,
      targetRepsMin: 12,
      targetRepsMax: 15,
      isActive: false,
      sets: [
        { setNumber: 1, previousWeight: 15, previousReps: 15, weight: undefined, reps: undefined, completed: false }
      ]
    }
  ];

  // Rest timer
  restTimerActive = true;
  restTimeElapsed = '00:45';
  restProgress = 45;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Start rest timer simulation
  }

  ngOnDestroy(): void {
    // Clean up timers
  }

  completeSet(exerciseIndex: number, setIndex: number): void {
    const set = this.exercises[exerciseIndex].sets[setIndex];
    if (set.weight && set.reps) {
      set.completed = true;
      // Move to next set or exercise
    }
  }

  addSet(exerciseIndex: number): void {
    const exercise = this.exercises[exerciseIndex];
    const newSetNumber = exercise.sets.length + 1;
    exercise.sets.push({
      setNumber: newSetNumber,
      completed: false
    });
  }

  addExercise(): void {
    console.log('Add new exercise');
  }

  skipRest(): void {
    this.restTimerActive = false;
  }

  addRestTime(): void {
    // Add 30 seconds to rest timer
  }

  finishWorkout(): void {
    this.router.navigate(['dashboard']);
  }
}
