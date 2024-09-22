import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { API } from '../config';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { handleLogin } from '../helpers/AuthHelper';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;


type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
    </View>
  );
};

// Define some basic styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
  },
  createAccountText: {
    textAlign: 'center',
  },
  linkText: {
    color: '#007bff',
  },
  errorText: {
    color: 'red', // Style for error message
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SearchScreen;