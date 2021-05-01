import React, {useState, useContext} from 'react';
import { Ionicons } from '@expo/vector-icons'
import { Text, ActivityIndicator,  KeyboardAvoidingView, Alert, StyleSheet, TextInput , AsyncStorage, TouchableOpacity, View, Image} from 'react-native';



export default function Cadastro( {navigation, route}) {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [logou, setLogou] = useState(false)
    const [hidePass, setHidePass] = useState(true)
    
      const alunos = {'nome': nome, 'email': email, 'senha': senha, 'logou': logou}
    
    async function insereAluno(){


        if( (nome === '') && (email === '') && (senha === '')){
            Alert.alert('Preencha todos os campos')
        }else{

            const alunos_async_json = await AsyncStorage.getItem ('alunosUS')
    
            let alunos_async = JSON.parse(alunos_async_json);
                if( !alunos_async ){
                    alunos_async = []
                }else{
                  alunos_async.push(alunos)
                }


            await AsyncStorage.setItem('alunosUS', JSON.stringify(alunos_async) ).then( ()=>{
                 Alert.alert('Aluno adicionado com sucesso!')
            } )
            .catch( ()=>{
              Alert.alert('Ocorreu um erro ao salvar o aluno!')
            } )

        }
    
      
          
      }
    
    async function mostraAluno(){

        let dados = ''
    
        const alunos_async_json = await AsyncStorage.getItem ('alunosUS')
    
          let alunos_async = JSON.parse(alunos_async_json);
              if( !alunos_async ){
                  Alert.alert("Sem alunos para mostrar!")
              }else{
                alunos_async.forEach((dado) => {
                   dados += dado.nome + ' - ' + dado.email
                })
    
                Alert.alert(dados)
              }
    
    }


    async function limpaAluno(){
    
        const alunos_async_json = await AsyncStorage.getItem ('alunosUS')

          let alunos_async = JSON.parse(alunos_async_json);
              
                  alunos_async = []
             


          await AsyncStorage.setItem('alunosUS', JSON.stringify(alunos_async) ).then( ()=>{
               Alert.alert('Limpeza feita com sucesso!')
          } )
          .catch( ()=>{
            Alert.alert('Ocorreu um erro ao limpar!')
          } )

    
}
 



    return(

        <KeyboardAvoidingView style={styles.container}>

              <View style={styles.containerImagem}>
                  <Image 
                    source={require('../../img/logo.png')}
                  />
              </View>


            <TextInput
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
            onChangeText={ (text) => setNome(text) }
            />
          
  
          
            <TextInput
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
            onChangeText={ (text) => setEmail(text) }
            />
       
  

            <View style={styles.inputAreaSenha}>

            <TextInput style={styles.inputSenha} autoCapitalize="none" secureTextEntry={hidePass} placeholder='Senha' autoCorrect={false} onChangeText={(text)=> setSenha(text)}/>

            <TouchableOpacity style={styles.iconSenha} onPress={() => setHidePass(!hidePass)}>
              {
                hidePass ? <Ionicons name='eye' size={25} />
                : <Ionicons name='eye-off' size={25} />
              }
            </TouchableOpacity>

            </View>
         


          <TouchableOpacity style={styles.btnSubmit} onPress={insereAluno} >
            <Text style={styles.textSubmit}> Cadastrar </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{...styles.btnSubmit, marginTop: 13, backgroundColor: 'red'}} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textSubmit}> Cancelar </Text>
          </TouchableOpacity>
  
          

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
  },

  containerImagem:{
  
    justifyContent: 'center',
    height: 60,
    marginBottom: 42
  }
  
  
  
  });

