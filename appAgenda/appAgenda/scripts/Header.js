// components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Municipalidad</Text>
      <View style={styles.iconContainer}>
        <Icon name="facebook" size={20} color="#FFFFFF" style={styles.icon} />
        <Icon name="twitter" size={20} color="#FFFFFF" style={styles.icon} />
        <Icon name="instagram" size={20} color="#FFFFFF" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#202020',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
});

export default Header;

