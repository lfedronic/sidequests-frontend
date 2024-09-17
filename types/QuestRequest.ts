export type QuestRequest = {
    latitude: number;
    longitude: number;
    radius: number;  
    search_query: string;           
    search_filters: {filter: string, ascending: boolean, weight: number}[];
}
