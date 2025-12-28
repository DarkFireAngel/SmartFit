export interface Food {
    id: string;
    name: string;
    quantity: number; // in grams/ml
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}

export enum MealType {
    BREAKFAST = 'Colazione',
    MORNING_SNACK = 'Spuntino Mattutino',
    LUNCH = 'Pranzo',
    AFTERNOON_SNACK = 'Spuntino Pom.',
    DINNER = 'Cena'
}

export interface Meal {
    id: string;
    type: MealType;
    foods: Food[];
    date: string; // YYYY-MM-DD format
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
}

export interface DailyMeals {
    date: string; // YYYY-MM-DD
    meals: Meal[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
}
