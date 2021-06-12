import * as React from 'react';
import  {useState, useContext} from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from './src/componentes/Cadastro'

import Drower from './src/componentes/Drower';
import Login from './src/componentes/Login';
import {LoginProvider} from './ApisContext';


const Stack = createStackNavigator();



export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="Drower" component={Drower} options={{ headerShown: false }}/>
        
        </Stack.Navigator>
      </NavigationContainer>
    </LoginProvider>
  );
}