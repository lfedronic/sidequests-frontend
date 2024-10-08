import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { API } from '../config';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { handleLogin } from '../helpers/AuthHelper';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;


type LoginPageProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Add error state

  const onSubmit = async () => {
    try {
      const data = await handleLogin(email, password);
      // Handle success, e.g., navigate to another page
      navigation.navigate("Main"); // Adjust the route as needed
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error("Login failed: ", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Username/Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username/Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username or email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => {console.log('Forgot password'); navigation.navigate('ForgotPassword')}}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Create Account */}
      <TouchableOpacity onPress={() => {console.log('Create account'); navigation.navigate('CreateAccount')}}>
        <Text style={styles.createAccountText}>
          Don't have an account? <Text style={styles.linkText}>Create an account</Text>
        </Text>
      </TouchableOpacity>
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

export default LoginPage;