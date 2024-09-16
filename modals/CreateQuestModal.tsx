import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, Pressable, TextInput, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { Quest } from '../types/Quest';

// Get the window dimensions
const { width, height } = Dimensions.get('window');

interface CreateQuestModalProps {
  coordinates: {latitude: number, longitude: number};
  visible: boolean;
  onClose: () => void;
  onSubmit: (quest: Partial<Quest>) => void;
}


const CreateQuestModal: React.FC<CreateQuestModalProps> = ({ coordinates, visible, onClose, onSubmit }) => {
  // State to store the input values
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [timeNeeded, setTimeNeeded] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(1);

  const handleSubmit = () => {
    // calculate closest city based on latitude and longitude 
    const newQuest: Partial<Quest> = { creator_id: 1, city: "San Francisco", latitude: coordinates.latitude, longitude: coordinates.longitude, title: title, description: description, time_needed: timeNeeded, difficulty: difficulty };
    onSubmit(newQuest);
    onClose(); // Close the modal after submitting
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}  // Handle back button close on Android
    >
      {/* Pressable to close the modal when background is pressed */}
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <Pressable style={styles.modalView} onPress={() => {}}>
          <Text style={styles.modalTitle}>Create a Quest</Text>
          <Text>{coordinates.latitude.toFixed(4)},{coordinates.longitude.toFixed(4)}</Text>
          {/* Input for Title */}
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter quest title"
          />

          {/* Input for Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter quest description"
            multiline={true}
            numberOfLines={4}
          />

          {/* Input for Time Needed */}
          <Text style={styles.label}>Time Needed (hours)</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={24}
            step={0.5}
            value={timeNeeded}
            onValueChange={(value) => setTimeNeeded(value)}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#b9e4c9"
          />
          <Text style={styles.sliderValue}>{timeNeeded} hours</Text>

          {/* Input for Difficulty */}
          <Text style={styles.label}>Difficulty</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={difficulty}
            onValueChange={(value) => setDifficulty(value)}
            minimumTrackTintColor="#ff0000"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#ff6b6b"
          />
          <Text style={styles.sliderValue}>Difficulty: {difficulty}</Text>

          {/* Submit Button */}
          <Button title="Submit" onPress={handleSubmit} color="#841584" />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width * 0.8, // 80% of the screen's width
    height: height * 0.7, // Adjust height for additional inputs
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 80,
  },
  sliderValue: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default CreateQuestModal;