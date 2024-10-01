// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '@/scripts/Header';
import Home from '@/scripts/Home';
import Footer from '@/scripts/Footer'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Home   />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50', 
    
  },
});

export default App;
