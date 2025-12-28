import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomNavbarComponent } from './shared/components/bottom-navbar/bottom-navbar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MealsComponent } from './features/meals/meals.component';
import { HydrationWorkoutComponent } from './features/hydration-workout/hydration-workout.component';
import { ReportsComponent } from './features/reports/reports.component';
import { ProfileComponent } from './features/profile/profile.component';
import { WorkoutDetailsComponent } from './features/workout-details/workout-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BottomNavbarComponent,
    DashboardComponent,
    MealsComponent,
    HydrationWorkoutComponent,
    ReportsComponent,
    ProfileComponent,
    WorkoutDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
