import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import { API } from '../config';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Add error state

  const handleLogin = () => {
    // Handle login logic here

    var token = "";
    var url = API + "login";
    const loginData = {
      email: email,    // or email, if that's how you handle the field
      password: password,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json(); // for successful login
        } else if (response.status === 400) {
          return response.json().then((data) => {
            throw new Error(data.message); // handle 400 error and extract message from JSON
          });
        } else {
          throw new Error('Unexpected error: ' + response.status);
        }
      })
      .then((data) => {
        console.log("message = " + data.message + " and token = " + data.token);
        token = data; // store the token somewhere
      })
      .catch((error) => {
        setError(error.message);
      });
  }


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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => console.log('Forgot password')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Create Account */}
      <TouchableOpacity onPress={() => console.log('Create account')}>
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