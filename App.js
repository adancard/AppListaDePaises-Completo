import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import CadastrarPaisScreen from './screen/CadastrarPaisScreen';
import PaisesScreen from './screen/PaisesScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Página Inicial' }}
        />
        <Stack.Screen
          name="CadastrarPais"
          component={CadastrarPaisScreen}
          options={{ title: 'Cadastrar País' }}
        />
        <Stack.Screen
          name="Paises"
          component={PaisesScreen}
          options={{ title: 'Paises Cadastrados' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Botão Cadastrar País */}
      <TouchableOpacity
        style={styles.cadastrarButton}
        onPress={() => navigation.navigate('CadastrarPais')}
      >
        <Text style={styles.buttonText}>Cadastrar País</Text>
      </TouchableOpacity>

      {/* Espaço entre o botão e PaisesScreen */}
      <View style={styles.space}></View>

      {/* Componente PaisesScreen */}
      <PaisesScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cadastrarButton: {
    backgroundColor: 'red',
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  space: {
    height: 20,
  },
});

export default App;
