import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface NavBarProps {
    createQuest: () => void;
}

const SearchBar: React.FC<NavBarProps> = ({createQuest}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>🏠</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{; createQuest()}}>
                <Text style={styles.text}>➕</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>👤</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", // Layout children in a row
        alignItems: "flex-end", // Align children to the bottom
        justifyContent: "space-between", // Distribute space between buttons
        padding: 10, // Add padding around the container
        backgroundColor: "#eee", // Optional: background color for visibility
    },
    button: {
        padding: 10,
        marginHorizontal: 5, // Horizontal margin between buttons
        alignItems: 'center', // Center text within button
        justifyContent: 'center', // Center content vertically within button
    },
    text: {
        fontSize: 20,
    },
});

export default SearchBar;
