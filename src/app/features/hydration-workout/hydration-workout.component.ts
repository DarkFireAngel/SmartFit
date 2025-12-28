import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HydrationService } from '../../core/services/hydration.service';
import { WorkoutService } from '../../core/services/workout.service';
import { DateService } from '../../core/services/date.service';
import { SimpleWorkout } from '../../core/models/workout.model';

@Component({
  selector: 'app-hydration-workout',
  templateUrl: './hydration-workout.component.html',
  styleUrls: ['./hydration-workout.component.css']
})
export class HydrationWorkoutComponent implements OnInit {

  // Hydration
  waterConsumed = 1.2; // liters
  waterGoal = 2.5;
  waterProgress = 0;

  // Workouts
  workouts: SimpleWorkout[] = [
    {
      id: '1',
      name: 'Riscaldamento',
      description: '5 minuti • Cardio leggero',
      duration: 5,
      caloriesBurned: 25,
      date: this.getDateString(),
      completed: true
    },
    {
      id: '2',
      name: 'Jumping Jacks',
      description: '3 serie x 20 reps',
      duration: 10,
      caloriesBurned: 50,
      date: this.getDateString(),
      completed: true
    },
    {
      id: '3',
      name: 'Corsa',
      description: '15 minuti • Passo medio',
      duration: 15,
      caloriesBurned: 150,
      date: this.getDateString(),
      completed: true
    },
    {
      id: '4',
      name: 'Squat',
      description: '4 serie x 12 reps',
      duration: 15,
      caloriesBurned: 80,
      date: this.getDateString(),
      completed: false
    },
    {
      id: '5',
      name: 'Plank',
      description: '3 serie x 45 sec',
      duration: 5,
      caloriesBurned: 30,
      date: this.getDateString(),
      completed: false
    }
  ];

  completedCount = 0;
  totalCount = 0;

  constructor(
    private router: Router,
    private hydrationService: HydrationService,
    private workoutService: WorkoutService,
    public dateService: DateService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.calculateProgress();
    this.updateWorkoutStats();
  }

  loadData(): void {
    const dateString = this.getDateString();

    // Load hydration
    const hydrationData = this.hydrationService.getHydrationForDate(dateString);
    if (hydrationData) {
      this.waterConsumed = hydrationData.totalLiters;
    }

    // Load workouts (keeping mock for now but structure is ready)
  }

  calculateProgress(): void {
    this.waterProgress = (this.waterConsumed / this.waterGoal) * 100;
  }

  updateWorkoutStats(): void {
    this.completedCount = this.workouts.filter(w => w.completed).length;
    this.totalCount = this.workouts.length;
  }

  addWater(amount: number): void {
    const dateString = this.getDateString();
    this.hydrationService.addWater(dateString, amount);
    this.waterConsumed = Math.min(this.waterConsumed + amount / 1000, this.waterGoal);
    this.calculateProgress();
  }

  removeWater(amount: number): void {
    const dateString = this.getDateString();
    if (this.waterConsumed > 0) {
      this.hydrationService.removeWater(dateString, amount);
      this.waterConsumed = Math.max(0, this.waterConsumed - amount / 1000);
      this.calculateProgress();
    }
  }

  toggleWorkout(workoutId: string): void {
    const workout = this.workouts.find(w => w.id === workoutId);
    if (workout) {
      workout.completed = !workout.completed;
      this.updateWorkoutStats();
    }
  }

  navigateToWorkoutDetails(): void {
    this.router.navigate(['/workout-details']);
  }

  getDateString(): string {
    return this.dateService.getDateString();
  }

  formatDate(): string {
    return this.dateService.getFormattedDate();
  }
}
