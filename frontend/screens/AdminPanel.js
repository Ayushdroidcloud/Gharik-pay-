import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [target, setTarget] = useState('');
  const [amount, setAmount] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get('https://your-backend-url/admin-data');
      setUsers(res.data.users);
      setTransactions(res.data.transactions);
    } catch {
      Alert.alert('Error', 'Could not load admin data');
    }
  };

  const sendAdminMoney = async () => {
    if (!target || !amount) return Alert.alert('Error', 'Fill all fields');
    try {
      const res = await axios.post('https://your-backend-url/admin-transfer', {
        target,
        amount: parseInt(amount)
      });
      if (res.data.success) {
        Alert.alert('Success', 'Transfer complete');
        fetchData();
      } else {
        Alert.alert('Failed', res.data.message);
      }
    } catch {
      Alert.alert('Error', 'Server error');
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      <Text style={styles.section}>Transfer Gharik</Text>
      <TextInput placeholder="Recipient ID" style={styles.input} onChangeText={setTarget} />
      <TextInput placeholder="Amount" style={styles.input} keyboardType="numeric" onChangeText={setAmount} />
      <Button title="Transfer" onPress={sendAdminMoney} />

      <Text style={styles.section}>Users</Text>
      {users.map((u, i) => (
        <Text key={i}>{u.id} — 𑁍 {u.balance}</Text>
      ))}

      <Text style={styles.section}>Transactions</Text>
      {transactions.map((t, i) => (
        <Text key={i}>{t.sender} → {t.receiver}: 𑁍 {t.amount}</Text>
      ))}
    </ScrollView>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  section: { fontSize: 18, marginVertical: 10, fontWeight: '600' },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 }
});
