import * as React from 'react';
import  {useEffect, Component} from 'react';
import { Button, View, Text, StyleSheet, Modal,CheckBox, TextInput, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useState } from 'react/cjs/react.development';

import ClienteService from '../../services/ClienteService';

export default function AddLivro({ navigation }, props) {

const inicioLivro = 
{
  idLivro: 1,
  nome: "",
  editor: "",
  categoria: "",
  quantidade: 0,
  ficcao: false,
  suspense: false,
  fantasia: false
}


const [livro, setLivro] = useState(inicioLivro)
const [id, setId] = useState(inicioLivro.idLivro)
const {isOpen, closeModal} = props
const [modalVise, setModalVise] = useState(true)
const [fechaModal, setFechaModal] = useState(isOpen)
const  [ suspense ,  setSuspense ]  =  useState ( false )
const  [ ficcao ,  setFiccao ]  =  useState ( false )
const  [ fantasia ,  setFantasia ]  =  useState ( false )
var num;

const addItensLivro = (valor, nome) => {
    setLivro({...livro, [nome] : valor})
}

let teste = () => {
  let vet = [1]
  let t
 
   
 
 t = vet.length
 
   
  Alert.alert(JSON.stringify(t))
}

 const addNome = async () => {
  var n
 
        const livros_async_json = await AsyncStorage.getItem ('livrosUS')

      var livros_async = JSON.parse(livros_async_json);
    
  
  if( !livros_async ){
    n = 0
  }else{

     n = livros_async.length
    n++

  }
  
  addItensLivro(n, 'idLivro')


}


async function insereLivro(){

  


    if( (livro.nome === '') || (livro.editor === '')  || (livro.quantidade === '') || ((livro.suspense === false) && (livro.fantasia === false) && (livro.ficcao === false))){
      
        Alert.alert('Preencha todos os campos e pelo menos um de categoria')
    }else{
        var existe = false
       // const livros_async_json = await AsyncStorage.getItem ('livrosUS')

        //var livros_async = JSON.parse(livros_async_json);
            /*if( !livros_async ){
                livros_async = []
                await AsyncStorage.setItem('livrosUS', JSON.stringify(livros_async) ).then( ()=>{
                  Alert.alert('Livro adicionado com sucesso!' + livro.idLivro)
                 
             } )
             .catch( ()=>{
               Alert.alert('Ocorreu um erro ao salvar o livro!')
             } )
            *///}else{
              /*livros_async.forEach((item) =>{
                if(item.nome === livro.nome){
                    existe = true
                }
              })*/

              //if(existe){
                //Alert.alert("Esse livro já está cadastrado!")
              //}else{



                  ClienteService.create(livro).then(
                    ()=>{
                      Alert.alert('Livro adicionado com sucesso!')
                    }
                  ).catch( ()=>{
                    Alert.alert('Ocorreu um erro ao salvar o livro!')
                  } )
                        /*  livros_async.push(livro)
                          await AsyncStorage.setItem('livrosUS', JSON.stringify(livros_async) ).then( ()=>{
                        Alert.alert('Livro adicionado com sucesso!' + livro.idLivro)
                        
                    } )*/
                    
              //}
             
             
            //}


        

    }

  
      
  }

  useEffect(()=>{

    addNome();
    
  
  },[livro.nome]);


async function mostraLivro(){

    let dados = ''

    const livros_async_json = await AsyncStorage.getItem ('livrosUS')

      let livros_async = JSON.parse(livros_async_json);
          if( !livros_async ){
              Alert.alert("Sem livros para mostrar!")
          }else{
            livros_async.forEach((dado) => {
               dados += dado.nome + ' - ' + dado.editor
            })

            Alert.alert(dados)
          }

}

async function limpaLivro(){
    
    const livros_async_json = await AsyncStorage.getItem ('livrosUS')

      let livros_async = JSON.parse(livros_async_json);
          
              livros_async = []
         


      await AsyncStorage.setItem('livrosUS', JSON.stringify(livros_async) ).then( ()=>{
           Alert.alert('Limpeza feita com sucesso!')
      } )
      .catch( ()=>{
        Alert.alert('Ocorreu um erro ao limpar!')
      } )


}

const addLivro = () => {
    
        props.addLivro(JSON.stringify(livro))
     
}

    return (

      <Modal visible={fechaModal}  onRequestClose={closeModal} animationType='slide' >

            <View style={styles.container}>
                <Text style={styles.titulo}>Adicionar Livro</Text>

                <TextInput 
                
                    placeholder='Digite o nome do livro'
                    style = {styles.textForm}
                    onChangeText={(text) => {addItensLivro(text, 'nome')}}

                />

                <TextInput 
                
                placeholder='Informe o editor(a) do livro'
                style = {styles.textForm}
                onChangeText={(text) => {addItensLivro(text, 'editor')}}
           

                />


              <View style={styles.viewAreaCheckExte}>
                <Text style={styles.textCat}>Categorias</Text>
              <View style={styles.viewCheckBox}>
                <Text style={styles.textCheck}>Suspense</Text>

                < CheckBox 
                    disabled = { false } 
                    value = { livro.suspense } 
                    onValueChange = { (text) => {addItensLivro(text, 'suspense')} } 
                  />
        </View>

        <View style={styles.viewCheckBox}>
                <Text style={styles.textCheck}>Ficção científica</Text>

                < CheckBox 
                    disabled = { false } 
                    value = { livro.ficcao } 
                    onValueChange = { (text) => {addItensLivro(text, 'ficcao')} } 
                  />
        </View>

        <View style={styles.viewCheckBox}>
                <Text style={styles.textCheck}>Fantasia</Text>

                < CheckBox 
                    disabled = { false } 
                    value = { livro.fantasia } 
                    onValueChange = { (text) => {addItensLivro(text, 'fantasia')} } 
                  />
        </View>


              </View>


<TextInput 
                
                placeholder='Digite a quantidade do livro'
                style = {styles.textForm}
                onChangeText={(text) => {addItensLivro(text, 'quantidade')}}

                />

                

                <View style={styles.buttonContainer}>
                    <TouchableOpacity  style={{...styles.button, marginVertical: 0}} onPress={insereLivro}>

                        <Text style={styles.buttonText}>Salvar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity  style={{...styles.button, marginVertical: 0, backgroundColor: 'tomato', marginLeft: 10}} onPress={() => setFechaModal(!fechaModal)}>

                        <Text style={styles.buttonText}>Cancelar</Text>

                    </TouchableOpacity>

                </View>

           

                

            </View>

            

      </Modal>
    );
  }

  const styles = StyleSheet.create({

    container:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    titulo:{
      textAlign: 'center',
      fontSize: 30,
      marginTop: 10,
      marginBottom: 20,
      fontWeight: 'bold'
    },

    textForm:{
        width: '80%',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: 'rgba(0,0,0,0.3)',
        marginBottom: 15,
        fontSize: 18,
        padding: 10
    },

    buttonContainer:{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    button:{
        borderRadius: 5,
        marginVertical: 20,
        backgroundColor: 'gray',
        width: '40%'
    },

    buttonText:{
        color: 'white',
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16,
        textAlign: 'center'
    },

    viewCheckBox:{

      alignItems: 'center',
       flexDirection: 'row',
        
       
   },

   textCheck:{
     fontSize: 18,
     marginRight: 20,
     fontWeight: 'bold',
   },
   viewAreaCheckExte:{
     
     justifyContent: 'flex-start',
     marginRight: 'auto',
     marginLeft: '10%',
     marginBottom: 12
   },
   textCat:{
     fontWeight: 'bold',
     fontSize: 30,
     marginRight: 'auto'
   }

  });