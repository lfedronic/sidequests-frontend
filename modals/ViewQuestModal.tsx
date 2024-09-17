import React, { useRef } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Dimensions, ScrollView, Animated, PanResponder } from 'react-native';
import { Quest } from '../types';
import colors from '../aesthetics/Colors';

const { width, height } = Dimensions.get('window');

interface ViewQuestModalProps {
  quest: Partial<Quest>;
  onClose: () => void;
  visible: boolean;
}

const SLIDE_WIDTH = width * 0.9;
const DOCK_WIDTH = SLIDE_WIDTH / 2;

const ViewQuestModal: React.FC<ViewQuestModalProps> = ({ visible, quest, onClose }) => {
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        pan.setValue(gestureState.dx);
      },
      onPanResponderRelease: (evt, gestureState) => {
        let dock = 0;
        if (gestureState.dx > DOCK_WIDTH / 2) {
          dock = DOCK_WIDTH;
        } else if (gestureState.dx < -DOCK_WIDTH / 2) {
          dock = -DOCK_WIDTH;
        }
        Animated.spring(pan, {
          toValue: dock,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const slideInterpolation = pan.interpolate({
    inputRange: [-DOCK_WIDTH, DOCK_WIDTH],
    outputRange: [-DOCK_WIDTH, DOCK_WIDTH],
    extrapolate: 'clamp',
  });

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <Pressable style={styles.modalView} onPress={() => {}}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>{quest.title}</Text>
            <Text style={styles.description}>{quest.description}</Text>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Location:</Text>
              <Text style={styles.fieldValue}>{quest.city}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Coordinates:</Text>
              <Text style={styles.fieldValue}>({quest.latitude}, {quest.longitude})</Text>
            </View>
            {quest.time_needed && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Time Needed:</Text>
                <Text style={styles.fieldValue}>{`${quest.time_needed} hours`}</Text>
              </View>
            )}
            {quest.difficulty && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Difficulty:</Text>
                <Text style={styles.fieldValue}>{quest.difficulty}</Text>
              </View>
            )}
            {quest.popularity && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Popularity:</Text>
                <Text style={styles.fieldValue}>{quest.popularity}</Text>
              </View>
            )}
            {quest.points && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Points:</Text>
                <Text style={styles.fieldValue}>{quest.points}</Text>
              </View>
            )}
            {quest.rating && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Rating:</Text>
                <Text style={styles.fieldValue}>{quest.rating}/5</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.slideContainer}>
            <View style={styles.dockContainer}>
              <View style={styles.dockLeft}>
                <Text style={styles.dockText}>Solo</Text>
              </View>
              <View style={styles.dockRight}>
                <Text style={styles.dockText}>Team up</Text>
              </View>
            </View>

            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.slider,
                {
                  transform: [{ translateX: slideInterpolation }],
                }
              ]}
            >
              <Text style={styles.sliderText}>Embark!</Text>
            </Animated.View>
          </View>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: colors.Cornsilk,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.Cinnabar,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.Cinnabar,
  },
  fieldValue: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
  },
  slideContainer: {
    width: SLIDE_WIDTH,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 20,
    zIndex: 1,
  },
  slidingTrack: {
    flexDirection: 'row',
    width: SLIDE_WIDTH,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  slider: {
    position: 'absolute',
    height: 40,
    width: 120,
    backgroundColor: colors.Cinnabar,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Ensures slider is on top
    elevation: 5,
  },
  sliderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dockContainer: {
    flexDirection: 'row',
    width: SLIDE_WIDTH,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dockLeft: {
    width: DOCK_WIDTH - 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: colors.Cornsilk,
  },
  dockRight: {
    width: DOCK_WIDTH - 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.Cornsilk,
  },
  dockText: {
    color: colors.Cinnabar,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: colors.Cinnabar,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ViewQuestModal;