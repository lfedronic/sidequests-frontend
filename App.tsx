// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LocationTracking from './components/LocationTracking';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LocationTracking />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default App;
