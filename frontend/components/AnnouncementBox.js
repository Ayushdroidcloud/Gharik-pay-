import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnnouncementBox = ({ message }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>📢 Announcement</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default AnnouncementBox;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffeeba',
    padding: 15,
    borderRadius: 8,
    margin: 15,
    borderWidth: 1,
    borderColor: '#ffc107'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16
  },
  message: {
    fontSize: 14
  }
});
