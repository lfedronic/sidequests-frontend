import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Quest } from '../types/Quest';
import colors from '../aesthetics/Colors';

const width = Dimensions.get('window').width;
const questWidth = width * 0.8; // Adjust width as per your design
const questMargin = 10; // Margin around each quest card
const snapInterval = questWidth + questMargin * 2; // Calculate total width for snapping

interface QuestFeedProps {
    quests: Array<Quest>;
    getQuestForMap: (quest: Quest) => void;
    getQuestForView: (quest: Quest) => void;
}

const QuestFeed: React.FC<QuestFeedProps> = ({ quests, getQuestForMap, getQuestForView }) => {
    const [currentQuestIndex, setCurrentQuestIndex] = useState<number>(0); // Track the current snapped quest index
    const flatListRef = useRef<FlatList>(null);

    const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / snapInterval); // Calculate the index of the snapped quest
        setCurrentQuestIndex(index);

        // Trigger any additional actions here based on the snapped quest
        console.log("Snapped to quest: ", quests[index].title);
        getQuestForMap(quests[index]);

        // You can add any other actions, such as updating other UI elements or fetching data
    };

    const snapToQuest = (quest: Quest) => {
        const index = quests.findIndex((q) => q.id === quest.id);
        if (index >= 0) {
            flatListRef.current?.scrollToIndex({ index: index, animated: true });
        }
    };

    return (
        <FlatList
            ref={flatListRef}
            horizontal={true}
            data={quests}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {getQuestForMap(item); snapToQuest(item); getQuestForView(item)}}>
                    <View style={styles.questContainer}>
                        <Text style={styles.questTitle}>{item.title}</Text>
                        <Text style={styles.questDetail}>{"Difficulty: " + item.difficulty}</Text>
                        <Text style={styles.questDetail}>{"Time needed: " + (item.time_needed || "N/A")}</Text>
                        <Text style={styles.questDetail}>{"Popularity: " + (item.popularity || "N/A")}</Text>
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
        backgroundColor: colors.Cornsilk, // Use Cornsilk background for the card
        opacity: 0.85, // Add some transparency
        height: "100%",
        width: questWidth,
        marginHorizontal: questMargin,
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000', // Add a shadow effect
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "center",
    },
    questTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "black", // Use Cinnabar for the title
        marginBottom: 10,
        textAlign: 'center',
    },
    questDetail: {
        fontSize: 14,
        color: "black", // Use FrenchGray for text
        marginBottom: 5,
    },
});
