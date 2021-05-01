import * as React from 'react';
import {useState} from 'react';
import { Button, View, CheckBox, Text, StyleSheet, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';



export default function Principal({ navigation }) {

  const  [ toggleCheckBox ,  setToggleCheckBox ]  =  useState ( false )

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>



                  <Image 
                    source={require('./livro3.jpg')}
                  />
              


        
      </View>
    );
  }

 