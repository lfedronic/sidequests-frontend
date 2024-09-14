import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import { SearchFilter } from '../types/SearchFilter';

interface SearchFilterComponentProps {
  filterName: string;
  filterData: SearchFilter;
  getFilter: (filterName: string, updatedFilter: SearchFilter) => void;  // Correct type
}

const SearchFilterComponent: React.FC<SearchFilterComponentProps> = ({
  filterName,
  filterData,
  getFilter
}) => {
  const [filter, setFilter] = useState<SearchFilter>(filterData);

  const toggleAscending = () => {
    const updatedFilter = { ...filter, ascending: !filter.ascending }; // Toggle the ascending field
    setFilter(updatedFilter);
    getFilter(filterName, updatedFilter); // Pass the updated filter back to the parent component
  };

  const removeFilter = () => {
    setFilter({ ascending: false, weight: 0 });
    getFilter(filterName, { ascending: false, weight: 0 }); 
  }

return (
    filter.weight === 0 ? null : (
        <View
            style={{
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: 'center',
                padding: 5,
                backgroundColor: filter.ascending? 'lightgreen' : 'pink',
                opacity: 0.2 + filter.weight * 0.8,
                margin: 5,
            }}
        >
            <TouchableOpacity onPress={toggleAscending}>
                <TouchableOpacity onPress={removeFilter}>
                    <Text>❌</Text>
                </TouchableOpacity>
                <Text>{filterName}</Text>
            </TouchableOpacity>
        </View>
    )
);
};

export default SearchFilterComponent;
