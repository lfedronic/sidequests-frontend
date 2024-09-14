// App.tsx
import React from 'react';
import { View, SafeAreaView, StyleSheet, Button } from 'react-native';
import LocationTracking from './components/LocationTracking';
import LoginPage from './components/LoginPage';
import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';
import MainScreen from './components/MainScreen';
import NavBar from './components/NavBar';


const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainScreen />
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
