import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MealsComponent } from './features/meals/meals.component';
import { HydrationWorkoutComponent } from './features/hydration-workout/hydration-workout.component';
import { ReportsComponent } from './features/reports/reports.component';
import { ProfileComponent } from './features/profile/profile.component';
import { WorkoutDetailsComponent } from './features/workout-details/workout-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'meals', component: MealsComponent },
  { path: 'hydration', component: HydrationWorkoutComponent },
  { path: 'workout', component: HydrationWorkoutComponent },
  { path: 'workout-details', component: WorkoutDetailsComponent },
  { path: 'workout-details/:id', component: WorkoutDetailsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
