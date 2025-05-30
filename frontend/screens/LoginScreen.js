import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (!id || !password) return Alert.alert('Error', 'Please fill all fields');
    try {
      const res = await axios.post('https://your-backend-url/login', { id, password });
      if (res.data.success) {
        if (res.data.isAdmin) {
          navigation.navigate('AdminPanel', { id });
        } else {
          navigation.navigate('Dashboard', { id });
        }
      } else {
        Alert.alert('Failed', res.data.message);
      }
    } catch (err) {
      Alert.alert('Error', 'Server error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gharik Pay</Text>
      <TextInput placeholder="Email or Phone" style={styles.input} onChangeText={setId} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={login} />
      <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Don't have an account? Sign up</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' }
});
