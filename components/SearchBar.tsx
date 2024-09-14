import React, { useState, BaseSyntheticEvent } from 'react'; // Add the import statement for useState and NativeSyntheticEvent
import { TextInputKeyPressEventData } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { ViewStyle } from 'react-native';

interface SearchBarProps {
    getText: (text: string) => void;
    placeholderText : string;
}


const SearchBar: React.FC<SearchBarProps> = ({getText, placeholderText}) => {
    const [searchText, setSearchText] = useState(''); 

    const handleSearch = () => {
        getText(searchText);
    }



    return (
        <View style={styles.container}>
            <TextInput placeholder={placeholderText} onChangeText={(text) => setSearchText(text)} onSubmitEditing={() => handleSearch()}style={styles.bar}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //backgroundColor: "green",
        flexDirection: "row",
        justifyContent: "center",
    },
    bar: {
        fontSize: 20,
        width: "90%",
        borderRadius: 10,
        borderWidth: 1,
        //borderColor: "red",
        padding: 10,
    },
});


export default SearchBar; 