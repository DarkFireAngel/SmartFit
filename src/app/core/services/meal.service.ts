import { Injectable } from '@angular/core';
import { DailyMeals, Meal, MealType, Food } from '../models/meal.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class MealService {
    private readonly MEALS_KEY = 'smartfit_meals';

    constructor(private storage: StorageService) { }

    /**
     * Get meals for a specific date
     */
    getMealsForDate(date: string): DailyMeals {
        const allMeals = this.storage.getItem<{ [date: string]: DailyMeals }>(this.MEALS_KEY) || {};
        return allMeals[date] || this.createEmptyDayMeals(date);
    }

    /**
     * Add food to a meal
     */
    addFoodToMeal(date: string, mealType: MealType, food: Food): void {
        const dailyMeals = this.getMealsForDate(date);
        let meal = dailyMeals.meals.find(m => m.type === mealType);

        if (!meal) {
            meal = {
                id: this.generateId(),
                type: mealType,
                foods: [],
                date,
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFats: 0
            };
            dailyMeals.meals.push(meal);
        }

        meal.foods.push(food);
        this.recalculateMealTotals(meal);
        this.recalculateDailyTotals(dailyMeals);
        this.saveMeals(date, dailyMeals);
    }

    /**
     * Remove food from a meal
     */
    removeFoodFromMeal(date: string, mealType: MealType, foodId: string): void {
        const dailyMeals = this.getMealsForDate(date);
        const meal = dailyMeals.meals.find(m => m.type === mealType);

        if (meal) {
            meal.foods = meal.foods.filter(f => f.id !== foodId);
            this.recalculateMealTotals(meal);
            this.recalculateDailyTotals(dailyMeals);
            this.saveMeals(date, dailyMeals);
        }
    }

    /**
     * Recalculate meal totals
     */
    private recalculateMealTotals(meal: Meal): void {
        meal.totalCalories = meal.foods.reduce((sum, f) => sum + f.calories, 0);
        meal.totalProtein = meal.foods.reduce((sum, f) => sum + f.protein, 0);
        meal.totalCarbs = meal.foods.reduce((sum, f) => sum + f.carbs, 0);
        meal.totalFats = meal.foods.reduce((sum, f) => sum + f.fats, 0);
    }

    /**
     * Recalculate daily totals
     */
    private recalculateDailyTotals(dailyMeals: DailyMeals): void {
        dailyMeals.totalCalories = dailyMeals.meals.reduce((sum, m) => sum + m.totalCalories, 0);
        dailyMeals.totalProtein = dailyMeals.meals.reduce((sum, m) => sum + m.totalProtein, 0);
        dailyMeals.totalCarbs = dailyMeals.meals.reduce((sum, m) => sum + m.totalCarbs, 0);
        dailyMeals.totalFats = dailyMeals.meals.reduce((sum, m) => sum + m.totalFats, 0);
    }

    /**
     * Save meals to storage
     */
    private saveMeals(date: string, dailyMeals: DailyMeals): void {
        const allMeals = this.storage.getItem<{ [date: string]: DailyMeals }>(this.MEALS_KEY) || {};
        allMeals[date] = dailyMeals;
        this.storage.setItem(this.MEALS_KEY, allMeals);
    }

    /**
     * Create empty day meals structure
     */
    private createEmptyDayMeals(date: string): DailyMeals {
        return {
            date,
            meals: [],
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFats: 0
        };
    }

    /**
     * Generate unique ID
     */
    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get current date string (YYYY-MM-DD)
     */
    getCurrentDate(): string {
        return new Date().toISOString().split('T')[0];
    }
}
