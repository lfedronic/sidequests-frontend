class SearchWeight {
    time_weight: number;
    difficulty_weight: number;
    popularity_weight: number;
    similarity_weight: number;

    constructor(
        time_weight: number = 1, 
        difficulty_weight: number = 1,
        popularity_weight: number = 1,
        similarity_weight: number = 30
    ) {
        this.time_weight = time_weight;
        this.difficulty_weight = difficulty_weight;
        this.popularity_weight = popularity_weight;
        this.similarity_weight = similarity_weight;
    }
}

export default SearchWeight;
