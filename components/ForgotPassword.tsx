import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const ForgotPassword: React.FC = () => {


  return (
    <View style={styles.container}>
      <Text>Good luck pal we cant help you</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  }
});

export default ForgotPassword;


// page1 main login page -> username/email box, password box, forgot password link, create account button
// case1 normal authentication -> username/email and password are sent to java, token is sent back and stored in js, go to rest of app
// case2 create account -> boxes for username email, password, etc, create user in java then login with user and store token that is returned, go to rest of app
// case3 forgot password -> boxes for username/email, lets skip this case for now
