import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const DashboardScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`https://your-backend-url/balance/${id}`)
      .then(res => setBalance(res.data.balance))
      .catch(() => setBalance(0));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {id}</Text>
      <Text style={styles.balance}>𑁍 {balance} Gharik</Text>
      <Button title="Send Money" onPress={() => navigation.navigate('Send', { id })} />
      <Button title="Scan QR" onPress={() => navigation.navigate('QRScanner', { id })} />
      <Button title="My QR Code" onPress={() => navigation.navigate('QRGenerator', { id })} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  balance: { fontSize: 20, marginBottom: 20, textAlign: 'center' }
});
