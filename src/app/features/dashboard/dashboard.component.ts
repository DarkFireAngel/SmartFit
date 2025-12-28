import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MealService } from '../../core/services/meal.service';
import { HydrationService } from '../../core/services/hydration.service';
import { DateService } from '../../core/services/date.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = 'Angelo';

  // Calorie data
  caloriesConsumed = 1200;
  calorieGoal = 2000;
  caloriesRemaining = 0;
  calorieProgress = 0;

  // Macros
  proteinConsumed = 85;
  proteinGoal = 140;
  proteinProgress = 0;

  carbsConsumed = 120;
  carbsGoal = 260;
  carbsProgress = 0;

  fatsConsumed = 40;
  fatsGoal = 130;
  fatsProgress = 0;

  // Hydration
  waterConsumed = 1.5; // liters
  waterGoal = 2.5;
  waterProgress = 0;

  // Sample meals
  meals = [
    {
      icon: 'wb_sunny',
      iconColor: 'yellow',
      name: 'Colazione',
      description: 'Avena e Frutti di Bosco',
      calories: 350
    },
    {
      icon: 'restaurant',
      iconColor: 'orange',
      name: 'Pranzo',
      description: 'Pollo grigliato e riso',
      calories: 520
    }
  ];

  // Sample workout
  todayWorkout = {
    name: 'Corsa Leggera',
    duration: 30,
    calories: 300
  };

  constructor(
    private router: Router,
    private mealService: MealService,
    private hydrationService: HydrationService,
    public dateService: DateService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.calculateProgress();
  }

  loadData(): void {
    const dateString = this.dateService.getDateString();

    // Load hydration data
    const hydrationData = this.hydrationService.getHydrationForDate(dateString);
    if (hydrationData) {
      this.waterConsumed = hydrationData.totalLiters;
    }

    // Load meal data (would need MealService integration)
    // For now keeping mock data
  }

  calculateProgress(): void {
    this.caloriesRemaining = this.calorieGoal - this.caloriesConsumed;
    this.calorieProgress = (this.caloriesConsumed / this.calorieGoal) * 100;

    this.proteinProgress = (this.proteinConsumed / this.proteinGoal) * 100;
    this.carbsProgress = (this.carbsConsumed / this.carbsGoal) * 100;
    this.fatsProgress = (this.fatsConsumed / this.fatsGoal) * 100;
    this.waterProgress = (this.waterConsumed / this.waterGoal) * 100;
  }

  addWater(amount: number): void {
    const dateString = this.dateService.getDateString();
    this.hydrationService.addWater(dateString, amount);
    this.waterConsumed = Math.min(this.waterConsumed + amount / 1000, this.waterGoal);
    this.calculateProgress();
  }

  removeWater(amount: number): void {
    const dateString = this.dateService.getDateString();
    if (this.waterConsumed > 0) {
      this.hydrationService.removeWater(dateString, amount);
      this.waterConsumed = Math.max(0, this.waterConsumed - amount / 1000);
      this.calculateProgress();
    }
  }

  get dashOffset(): number {
    const circumference = 2 * Math.PI * 40;
    return circumference - (this.calorieProgress / 100) * circumference;
  }

  formatDate(): string {
    return this.dateService.getFormattedDate();
  }

  previousDay(): void {
    this.dateService.previousDay();
    this.loadData();
  }

  nextDay(): void {
    this.dateService.nextDay();
    this.loadData();
  }

  goToToday(): void {
    this.dateService.goToToday();
    this.loadData();
  }

  get isToday(): boolean {
    return this.dateService.isToday();
  }
}
