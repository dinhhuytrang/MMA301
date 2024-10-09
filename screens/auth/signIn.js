import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top section with black background, white text, and logo */}
      <View style={styles.topSection}>
      <Image 
        source={{ uri: 'https://www.tennis-point.co.uk/on/demandware.static/-/Library-Sites-TennisPoint/en_GB/dwef851813/webflow/16227/images/Performance_Logo_BWr.png' }} 
        style={styles.logo} 
      />
        <Text style={styles.title}>Log In</Text>
        <Text style={styles.subTitle}>Please sign in to your existing account</Text>
      </View>

      {/* Bottom section with white background and rounded top corners */}
      <View style={styles.bottomSection}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor="#B0B0B0"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#B0B0B0"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.eyeIcon}>
            {/* Add an eye icon component or image here */}
          </TouchableOpacity>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}> SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1C29', // Full dark background
  },
  topSection: {
    backgroundColor: 'black', // Black background
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 200, 
    height: 125,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 10,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: 'white', // White background for the bottom section
    borderTopLeftRadius: 30, // Rounded top corners
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20, // Slight overlap of the white section over the black section
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F1F1F1', // Slightly lighter background for input fields
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#333',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#333',
  },
  forgotPassword: {
    color: 'black',
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#000',
    marginLeft: 5,
  },
});

export default LoginScreen;