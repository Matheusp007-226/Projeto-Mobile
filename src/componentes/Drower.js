import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CustomDrawer from './CustomDrawer';

import Livros from './Livros';
import Principal from './Principal';


const Drawer = createDrawerNavigator();


export default function Drower({ navigation }) {


    return(

        <Drawer.Navigator initialRouteName="Principal" drawerContent={CustomDrawer} >
                    <Drawer.Screen name="Principal" component={Principal} options={{headerShown: true , 
                    headerStyle:{backgroundColor:'#00BFFF'}, headerTintColor: '#fff'}}/>
                    <Drawer.Screen name="Livros" component={Livros} options={{headerShown: true , 
                    headerStyle:{backgroundColor:'#00BFFF'}, headerTintColor: '#fff'}}/>
        </Drawer.Navigator>

    );
}

