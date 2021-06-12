import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Cadastro from './Cadastro'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View, KeyboardAvoidingView , Image, TextInput, TouchableOpacity, Animated, AsyncStorage, Alert} from 'react-native';
import {LoginContext} from './../../ApisContext'
export default function Login( { navigation } ) {

const [email, setEmail] = useState('')
const [senha, setSenha] = useState('')
const [alunos, setAlunos] = useState([])
const [hidePass, setHidePass] = useState(true)
const [login, setLogin] = useContext(LoginContext);




        async function logar(){

        let existe = false
          
          let dados = ''

          if ( (email === '') && (senha === '')){
            Alert.alert('Preencha todos os campos!')
          }else{

            const alunos_async_json = await AsyncStorage.getItem ('alunosUS')

            let alunos_async = JSON.parse(alunos_async_json);
                if(!alunos_async ){
                    Alert.alert("Usuário não existe!")
                }else{
                  let log = false
                  alunos_async.forEach((dado) => {
                    if(dado.email === email){
                      existe = true
                          if(dado.senha === senha){
                            dado.logou = true
                            log = true;
                            setLogin(dado.nome);
                            navigation.navigate('Drower')
                          }else{
                              Alert.alert('Senha incorreta!')
                          }
                    }
                  
                  })

                 if(log){
                  await AsyncStorage.setItem('alunosUS', JSON.stringify(alunos_async) ).then( ()=>{
                     
                            Alert.alert('Bem vindo ' + login)
               } )
               .catch( ()=>{
                 Alert.alert('Não foi possiível alterar o dado de log!')
               } )
                 }
                 

                  if(!existe){
                     Alert.alert('Usuário não existe!')
                  }
                  
                }


          }

          

          }


          return (
            <KeyboardAvoidingView style={styles.container}>
        
              <View style={styles.containerImagem}>
                  <Image 
                    source={require('../../img/logo.png')}
                  />
              </View>
        
              <Animated.View style={styles.containerForm}>
                  <TextInput style={styles.input} placeholder='Email' autoCorrect={false} onChangeText={(text)=> setEmail(text) }/>
              
        
                  <View style={styles.inputAreaSenha}>

                        <TextInput style={styles.inputSenha} secureTextEntry={hidePass} placeholder='Senha' autoCorrect={false} onChangeText={(text)=> setSenha(text)}/>
                        
                        <TouchableOpacity style={styles.iconSenha} onPress={() => setHidePass(!hidePass)}>
                          {
                            hidePass ? <Ionicons name='eye' size={25} />
                            : <Ionicons name='eye-off' size={25} />
                          }
                        </TouchableOpacity>
                        
                  </View>
              
        
                  <TouchableOpacity style={styles.btnSubmit}  onPress={logar}>
                    <Text style={styles.textSubmit}> Acessar </Text>
                  </TouchableOpacity>
        
                  <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('Cadastro',  {alunos})}>
                    <Text style={styles.textRegister}> Criar conta gratuita! </Text>
                  </TouchableOpacity>
        
              </Animated.View>
              
            </KeyboardAvoidingView>
          );
        
  

} 





 
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerImagem:{
    flex: 1,
    justifyContent: 'center'
  },

  containerForm:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width: '90%',
    
  },

  input:{
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    borderRadius: 7,
    fontSize: 17,
    color: '#222',
    height: 50,
    padding: 10
    
  },

  btnSubmit:{
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35AAFF',
    height: 50,
    borderRadius: 7
  },

  textSubmit:{
    color: '#fff',
    fontSize: 18
  },

  btnRegister:{
    marginTop: 13
  },

  textRegister:{
    color: '#fff',
    fontSize: 15
  },

  inputSenha:{
      width: '85%',
      height: 50,
      padding: 10,
      color: '#222',
      fontSize: 17
  },

  inputAreaSenha:{
      flexDirection: 'row',
      width: '90%',
      backgroundColor: '#fff',
      marginBottom: 15,
      borderRadius: 7,
      height: 50,
      alignItems: 'center'
  },

  iconSenha:{
    width: '15%',
    height:50,
    justifyContent: 'center',
    alignItems: 'center'
  }



});
