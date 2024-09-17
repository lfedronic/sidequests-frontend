import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.6;
const DOCK_WIDTH = CARD_WIDTH * 0.5;

const SlidableMinicard = ({ onDock }) => {
  const [docked, setDocked] = useState<null | 'solo' | 'team'>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        let toValue = 0;

        if (dx < -DOCK_WIDTH / 2) {
          toValue = -DOCK_WIDTH;
          setDocked('solo');
        } else if (dx > DOCK_WIDTH / 2) {
          toValue = DOCK_WIDTH;
          setDocked('team');
        } else {
          setDocked(null);
        }

        Animated.spring(pan, {
          toValue: { x: toValue, y: 0 },
          useNativeDriver: false,
          friction: 7,
          tension: 40,
        }).start(() => {
          if (docked) {
            onDock(docked);
          }
        });
      },
    })
  ).current;

  const cardStyle = {
    transform: [{ translateX: pan.x }],
  };

  const leftTrackOpacity = pan.x.interpolate({
    inputRange: [-DOCK_WIDTH, 0, DOCK_WIDTH],
    outputRange: [0, 1, 0],
  });

  const rightTrackOpacity = pan.x.interpolate({
    inputRange: [-DOCK_WIDTH, 0, DOCK_WIDTH],
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.track, styles.leftTrack, { opacity: leftTrackOpacity }]}>
        <AntDesign name="arrowleft" size={20} color="#E74C3C" />
        <Text style={styles.trackText}>Solo</Text>
      </Animated.View>
      <Animated.View style={[styles.track, styles.rightTrack, { opacity: rightTrackOpacity }]}>
        <Text style={styles.trackText}>Team up</Text>
        <AntDesign name="arrowright" size={20} color="#E74C3C" />
      </Animated.View>
      <Animated.View
        style={[styles.card, cardStyle]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.cardText}>Embark!</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: 50,
    backgroundColor: '#E74C3C',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    color: '#FFF8DC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  track: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: DOCK_WIDTH,
  },
  leftTrack: {
    left: (width - CARD_WIDTH) / 2 - DOCK_WIDTH / 2,
  },
  rightTrack: {
    right: (width - CARD_WIDTH) / 2 - DOCK_WIDTH / 2,
  },
  trackText: {
    color: '#E74C3C',
    fontSize: 14,
    marginHorizontal: 4,
  },
});

export default SlidableMinicard;