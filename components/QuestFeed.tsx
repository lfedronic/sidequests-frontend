import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Quest } from '../types/Quest';

const width = Dimensions.get('window').width;
const questWidth = width * 0.8; // Adjust width as per your design
const questMargin = 10; // Margin around each quest card
const snapInterval = questWidth + questMargin * 2; // Calculate total width for snapping

interface QuestFeedProps {
    quests: Array<Quest>;
    getCurrentQuest: (quest: Quest) => void;
}

const QuestFeed: React.FC<QuestFeedProps> = ({ quests, getCurrentQuest }) => {
    const [currentQuestIndex, setCurrentQuestIndex] = useState<number>(0); // Track the current snapped quest index

    const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / snapInterval); // Calculate the index of the snapped quest
        setCurrentQuestIndex(index);

        // Trigger any additional actions here based on the snapped quest
        console.log("Snapped to quest: ", quests[index].title);
        getCurrentQuest(quests[index]);

        // You can add any other actions, such as updating other UI elements or fetching data
    };

    return (
        <FlatList
            horizontal={true}
            data={quests}
            renderItem={({ item }) => (
                <TouchableOpacity>
                    <View style={styles.questContainer}>
                        <Text>{"Title: " + item.title}</Text>
                        <Text>{"Difficulty: " + item.difficulty}</Text>
                        <Text>{"Time needed: " + item.time_needed}</Text>
                        <Text>{"Popularity: " + item.popularity}</Text>
                        <Text>{"Latitude: " + item.latitude}</Text>
                        <Text>{"Longitude: " + item.longitude}</Text>
                        <Text>{"Id: " + item.id}</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            snapToInterval={snapInterval} // Snap to each quest's position
            decelerationRate="fast" // Makes the scrolling stop faster
            showsHorizontalScrollIndicator={false} // Hides the scrollbar for a cleaner look
            onMomentumScrollEnd={handleMomentumScrollEnd} // Detect snapping
        />
    );
};

export default QuestFeed;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: questMargin, // Add padding for smooth scrolling
    },
    questContainer: {
        backgroundColor: "blue",
        height: "100%",
        width: questWidth,
        marginHorizontal: questMargin,
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "yellow",
    }
});
