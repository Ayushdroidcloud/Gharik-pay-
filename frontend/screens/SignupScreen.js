import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    if (!id || !name || !password) return Alert.alert('Error', 'All fields required');
    try {
      const res = await axios.post('https://your-backend-url/signup', { id, name, password });
      if (res.data.success) {
        Alert.alert('Success', 'Account created! Please login');
        navigation.navigate('Login');
      } else {
        Alert.alert('Failed', res.data.message);
      }
    } catch (err) {
      Alert.alert('Error', 'Server error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Gharik Pay Account</Text>
      <TextInput placeholder="Email or Phone" style={styles.input} onChangeText={setId} />
      <TextInput placeholder="Your Name" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword} />
      <Button title="Sign Up" onPress={signup} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 }
});
