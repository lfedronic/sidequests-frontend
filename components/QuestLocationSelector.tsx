import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';


// Define the props interface
interface QuestLocationSelectorProps {
    region: { latitude: number; longitude: number } | null;
    defaultLocation: [number, number];
    setMarkerPosition: (position: { latitude: number; longitude: number }) => void;
    handleLocationLock: () => void;
    handleCancel: () => void;  
}

const QuestLocationSelector: React.FC<QuestLocationSelectorProps> = ({ 
    region, 
    defaultLocation, 
    setMarkerPosition, 
    handleLocationLock,
    handleCancel,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Select Quest Location
            </Text>
            <Text style={styles.instructionText}>
                Drag the pin to your quest's location. You can move the map to refine the position.
            </Text>

            <TouchableOpacity 
                style={styles.snapButton} 
                onPress={() => setMarkerPosition({
                    latitude: region ? region.latitude : defaultLocation[0], 
                    longitude: region ? region.longitude : defaultLocation[1]
                })}
            >
                <Text style={styles.snapButtonText}>Snap Pin to Center</Text>
            </TouchableOpacity>

            <Text style={styles.instructionText}>
                Once you're happy with the pin's position, lock in the location.
            </Text>

            <TouchableOpacity 
                style={styles.lockButton} 
                onPress = {handleLocationLock}
            >
                <Text style={styles.lockButtonText}>Lock Location</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 5,
        flex: 1,
        flexGrow: 2,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    instructionText: {
        fontSize: 14,
        marginBottom: 20,
    },
    snapButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    snapButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    lockButton: {
        backgroundColor: '#FF5722',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    lockButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#FF5722',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        position: 'absolute',
        right: 5,
        top: 5,


    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
    }
});

export default QuestLocationSelector;
