import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const SendScreen = ({ route }) => {
  const { id } = route.params;
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');

  const sendMoney = async () => {
    if (!receiver || !amount) return Alert.alert('Error', 'Fill all fields');
    try {
      const res = await axios.post('https://your-backend-url/transfer', {
        sender: id,
        receiver,
        amount: parseInt(amount)
      });
      if (res.data.success) {
        Alert.alert('Success', 'Transfer completed');
      } else {
        Alert.alert('Failed', res.data.message);
      }
    } catch {
      Alert.alert('Error', 'Server error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Gharik</Text>
      <TextInput placeholder="Receiver ID (email or phone)" style={styles.input} onChangeText={setReceiver} />
      <TextInput placeholder="Amount in Gharik" style={styles.input} keyboardType="numeric" onChangeText={setAmount} />
      <Button title="Send" onPress={sendMoney} />
    </View>
  );
};

export default SendScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 }
});
