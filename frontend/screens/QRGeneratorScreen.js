import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRGeneratorScreen = ({ route }) => {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Gharik QR</Text>
      <QRCode value={id} size={250} />
      <Text style={styles.idText}>{id}</Text>
    </View>
  );
};

export default QRGeneratorScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  idText: { marginTop: 15, fontSize: 16 }
});
