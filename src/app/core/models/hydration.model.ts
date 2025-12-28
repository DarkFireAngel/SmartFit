export interface HydrationEntry {
    id: string;
    amount: number; // in ml
    date: string; // YYYY-MM-DD
    timestamp: Date;
}

export interface DailyHydration {
    date: string; // YYYY-MM-DD format
    entries: HydrationEntry[];
    totalLiters: number;
    goalLiters: number;
}
