import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  viewMode: 'week' | 'month' = 'week';
  currentWeek = '10 Ott - 16 Ott';

  // Weekly stats
  weeklyCalories = 12900;
  dailyWaterAvg = 2.1;
  activeTime = '4h 30m';

  // Weekly bar chart data (7 days)
  weeklyData = [
    { day: 'L', calories: 1800, percentage: 60 },
    { day: 'M', calories: 2200, percentage: 85 },
    { day: 'M', calories: 1600, percentage: 45 },
    { day: 'G', calories: 2100, percentage: 90 }, // Today
    { day: 'V', calories: 2000, percentage: 75 },
    { day: 'S', calories: 1700, percentage: 50 },
    { day: 'D', calories: 1900, percentage: 65 }
  ];

  // Macro breakdown
  macros = {
    carbs: { value: 50, color: 'bg-emerald-500' },
    protein: { value: 30, color: 'bg-primary' },
    fats: { value: 20, color: 'bg-lime-400' }
  };

  // Hydration weekly data
  hydrationData = [
    { percentage: 40 },
    { percentage: 55 },
    { percentage: 30 },
    { percentage: 75 }, // Today
    { percentage: 60 },
    { percentage: 50 },
    { percentage: 45 }
  ];

  // Workout stats
  workoutStats = {
    distance: 32,
    distanceGrowth: 12,
    timeActive: '4h 30m'
  };

  constructor() { }

  ngOnInit(): void { }

  setViewMode(mode: 'week' | 'month'): void {
    this.viewMode = mode;
  }

  previousPeriod(): void {
    console.log('Previous period');
  }

  nextPeriod(): void {
    console.log('Next period');
  }
}
