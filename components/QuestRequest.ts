
interface QuestRequest {

    coordinates: [number, number];      
    radius: number;  
    search_query: string;           
    search_filters: {filter: string, ascending: boolean, weight: number}[];
}

export default QuestRequest;