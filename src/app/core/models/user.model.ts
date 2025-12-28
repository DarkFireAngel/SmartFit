export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
    dailyCalorieGoal: number;
    dailyWaterGoal: number; // in liters
    macroGoals: {
        protein: number; // grams
        carbs: number; // grams
        fats: number; // grams
    };
    createdAt: Date;
}
