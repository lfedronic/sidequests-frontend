export type Quest = {
    id: number;
    title: string;
    description: string;
    city: string;
    latitude: number;
    longitude: number;
    time_needed?: number;
    difficulty?: number;
    popularity?: number;
    points?: number;
    rating?: number;
}

