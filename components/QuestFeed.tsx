import React, { useState, BaseSyntheticEvent } from 'react'; // Add the import statement for useState and NativeSyntheticEvent
import { TextInputKeyPressEventData } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { Quest } from '../types/Quest';

interface QuestFeedProps{
    quests: Array<Quest>;
}
const QuestFeed: React.FC<QuestFeedProps> = ({quests}) => {
    return (
        <FlatList

            horizontal={true}
            data={quests}
            
            renderItem={({item}) => 
            <TouchableOpacity>
            <View style={styles.questContainer}>
                <Text>{"Title: " + item.title}</Text>
                <Text>{"Difficulty: " + item.difficulty}</Text>
                <Text>{"Time needed: " + item.time_needed}</Text>
                <Text>{"Popularity: " + item.popularity}</Text>
                <Text>{"Latitude: " + item.latitude}</Text>
                <Text>{"Longitude: " + item.longitude}</Text>
            </View></TouchableOpacity>}
            keyExtractor={(item) => item.title}
            contentContainerStyle={styles.container}
        />
    )
};

export default QuestFeed;


const styles = StyleSheet.create({
    container: {
        textAlign : "center",
        alignContent: "center",
        justifyContent: "center",
    },
    questContainer: {
        backgroundColor: "blue",
        height: "100%",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    text: {
        color: "yellow",

    }
});