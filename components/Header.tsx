// components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header: React.FC = () => (
  <View style={styles.header}>
    <Ionicons name="chatbubble-ellipses-outline" size={28} color="#ffffff" />
    <Text style={styles.appTitle}>ChitChat</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#333',
    elevation: 4,
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10,
  },
});

export default Header;
