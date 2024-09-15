type SearchFilter = {
    ascending: boolean;
    weight: number;
  };

type SearchFilters = {
  [key: string]: SearchFilter;
};

export type { SearchFilter, SearchFilters };