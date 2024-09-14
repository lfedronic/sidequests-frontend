import React from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';

// Get the window dimensions
const { width, height } = Dimensions.get('window');

interface ModalExampleProps {
  visible: boolean;
  onClose: () => void;
}

const ModalExample: React.FC<ModalExampleProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}  // Handle back button close on Android
    >
      {/* Pressable to close the modal when background is pressed */}
      <Pressable style={styles.modalContainer} onPress={onClose}>
        {/* Prevent modal content from closing when it's pressed */}
        <Pressable style={styles.modalView} onPress={() => {}}>
          <Text style={styles.modalText}>This is the Quest Modal!</Text>
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
    height: height * 0.5, // 50% of the screen's height
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
  modalText: {
    fontSize: 18,
    color: 'black',
  },
});

export default ModalExample;
