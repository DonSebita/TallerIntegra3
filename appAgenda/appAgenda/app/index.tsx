import React from 'react';
import { SafeAreaView, StyleSheet, Button, View, Image } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Header from '@/scripts/Header';
import Home from '@/scripts/Home';
import Footer from '@/scripts/Footer';
import RegisterScreen from './Auth/register';  // Asegúrate de la ruta correcta
import LoginScreen from './Auth/Login';        // Asegúrate de la ruta correcta

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Home />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Registro"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
     
    </SafeAreaView>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3CB371',
  },
  buttonsContainer: {
    position: 'absolute',
    top: 5,   // Ubica los botones en la parte superior
    right: 100, // Ubica los botones a la derecha
    flexDirection: 'row',
  },
  buttonWrapper: {
    marginLeft: 10,  // Espacio entre los botones
    width: 100,       // Ancho de cada botón

  },
});

export default AppStack;
