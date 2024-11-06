// App.js
import React from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import Header from '@/scripts/Header';
import Home from '@/scripts/Home';
import Footer from '@/scripts/Footer';
import Tarjeta from '@/scripts/Tarjeta';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Home   />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3CB371', 
    
    
  },
});

export default App;
