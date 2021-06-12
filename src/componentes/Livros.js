import * as React from 'react';
import  {useEffect, useContext, Component} from 'react';
import { Button, View, Text, Modal, StyleSheet, TouchableWithoutFeedback, ScrollView, AsyncStorage,TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather as Icon , Entypo} from '@expo/vector-icons';
import { useState } from 'react/cjs/react.development';
import AddLivro from './AddLivro'
import ClienteService from '../../services/ClienteService';
import {ModalContext} from '../../ApisContext';
import Cadastro from './Cadastro'

const Stack2 = createStackNavigator();

export default function Livros({ navigation }, props) {

const [isAddLivroModalOpen, setIsAddLivroModalOpen] = useState(false)
const [isDeleteLivroModalOpen, setIsDeleteLivroModalOpen] = useState(false)
const [selectedLivro, setSelectedLivro] = useState(false)
const [livros, setLivros] = useState([])
const [refresh, setRefresh] = useState(false)
var lista;




const addLivro = (data) =>{
  setLivros([data, ...livros] )

}





const toggleAddLivro = () =>{

  setIsAddLivroModalOpen(!isAddLivroModalOpen)

}

const toggleDeleteLivroModal = () =>{
  setIsDeleteLivroModalOpen(!isDeleteLivroModalOpen)
}



useEffect(()=>{


   let mostraLivro = async () => {
  
      
    
      //const livros_async_json = await AsyncStorage.getItem ('livrosUS')
    
        //let livros_async = JSON.parse(livros_async_json);
    
            //if( !livros_async ){
             // Alert.alert('Nenhum livro encontrado!')
           // }else{
            ClienteService.getAll().then(
               res =>{
                setLivros(...livros, res.data)
               }
             ).catch( ()=>{
                    Alert.alert('Nenhum livro encontrado!')
                  } )

                 
              
            //}
    
    }

 mostraLivro()

},[]);




useEffect(()=>{

  toggleAddLivro
  

},[isAddLivroModalOpen]);



  


let alugar = async ()=> {


  
 
    const aluga_async_json = await AsyncStorage.getItem ('alugasUS')

    let aluga_async = JSON.parse(livros_async_json);
        if( !aluga_async ){
            livros_async = []
        }else{
            var numID = livros_async.length
            addItensLivro((numID+1), 'idLivro')
          livros_async.push(livro)
        }


    await AsyncStorage.setItem('livrosUS', JSON.stringify(livros_async) ).then( ()=>{
         Alert.alert('Livro adicionado com sucesso!')
         addItensLivro('', 'nome')
         addItensLivro('', 'editor')
         addItensLivro('', 'categoria')
    } )
    .catch( ()=>{
      Alert.alert('Ocorreu um erro ao salvar o livro!')
    } )


}


let editarLivro = () =>{

}


    return (

      

            <View style={styles.container}>

                <Text style={styles.titulo}>Livros!</Text>

                

                <TouchableOpacity onPress={toggleAddLivro} style={styles.button}>
                    <Text style={styles.buttonText}>Adicionar Livro</Text>
                </TouchableOpacity>


                <TouchableWithoutFeedback style={[styles.containerBotaoAdd, styles.menu]}>
                            <Entypo nome="livros" size={24} color='#fff' />
                </TouchableWithoutFeedback>
                  
                  {isAddLivroModalOpen ? <AddLivro isOpen={isAddLivroModalOpen} closeModal={toggleAddLivro}
                   addLivro={addLivro.bind(this)}/> : null}

                  
                  {isDeleteLivroModalOpen ? <DeleteLivro
                  isOpen={isDeleteLivroModalOpen} closeModal={toggleDeleteLivroModal}
                  selectedLivro={selectedLivro} deleteLivro={deleteLivro} /> : null
                }

                   

                      

                    {

                      
                        

                                <View style={styles.livroListContainer}>
                                      

                                      <FlatList
                                            data={livros}
                                            nav={ navigation }
                                            extraData={refresh}
                                            keyExtractor={(item) => item.id}
                                            renderItem={ ({item}) => <Livro data={item} /> }
                                      />
                                      
                                </View>

                      
                        
                        }
                   
            </View>
            
    
    );
  }

  const styles = StyleSheet.create({

    titulo:{
      textAlign: 'center',
      fontSize: 30,
      marginTop: 10,
      marginBottom: 20,
      fontWeight: 'bold'
    },
    button:{
      borderRadius: 5,
      marginVertical: 20,
      alignSelf: 'flex-start',
      backgroundColor: 'gray'
  },

  buttonText:{
      color: 'white',
      paddingVertical: 6,
      paddingHorizontal: 10,
      fontSize: 16
  },
  name:{
    fontWeight: 'bold',
    fontSize: 16
  },

  livroListContainer:{
   flex: 1
  },
    container:{
    flex: 1,
    backgroundColor : '#fff',
    paddingHorizontal: 20
}, buttonsContainer: {
  flexDirection: 'row-reverse',
  alignItems: 'flex-end',
  borderBottomWidth: 1,
  borderBottomColor: '#CCC',
  paddingBottom: 10,
  marginTop: 10,
},

deleteButton: {
  marginLeft: 10,
  height: 40,
  width: 40,
  backgroundColor: 'red',
  borderRadius: 10,
  padding: 10,
  fontSize: 12,
  elevation: 10,
  shadowOpacity: 10,
  shadowColor: '#ccc',
  alignItems: 'center'
},

editButton: {
  marginLeft: 10,
  height: 40,
  backgroundColor: '#00BFFF',
  borderRadius: 10,
  padding: 10,
  fontSize: 12,
  elevation: 10,
  shadowOpacity: 10,
  shadowColor: '#ccc',
  alignItems: 'center'
},
areaPessoa:{
  backgroundColor: '#222',
  height: 200,
  marginBottom: 15,
  padding: 10
},
textoPessoa:{
  color: '#FFF',
  fontSize: 20,
},
buttonsContainer: {
  flexDirection: 'row-reverse',
  alignItems: 'flex-end',
  borderBottomWidth: 1,
  borderBottomColor: '#CCC',
  paddingBottom: 10,
  marginTop: 10,
},

butaoADD:{

  height: 70
  
  
  
},
containerBotaoAdd:{
     
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      justifyContent: 'center',
      alignItems: 'center',
      shadowRadius: 10,
      shadowColor: '#00213B',
      shadowOpacity: 0.3,
      shadowOffset:{
        height: 10
      }
      
    },

    menu:{
      backgroundColor: '#00213B'
    }
  
  
  });


  class Livro extends Component{

    constructor(props){
      super(props)

      this.state = {
        editarLivro: false,
        delete_yes: 0
      }
    }



   
    render(){

      

      const ediLivro = () =>{

        this.setState({editarLivro: !editarLivro})
      
      }
      

      const deleteLivro = async (id) => {
        
  
        //const livros_async_json = await AsyncStorage.getItem ('livrosUS')
      
        //var livros_async = JSON.parse(livros_async_json);
      
        
          //const index = await livros_async.findIndex(item => item.idLivro === id);
          //livros_async.splice(index, 1);
          ClienteService.remove(id).then(
            ()=>{
              
              Alert.alert('Livro ' + id + ' deletado com sucesso!')
              
            }
          ).catch( ()=>{
            Alert.alert('Ocorreu um erro ao deletar o livro!')
          } )
          //return AsyncStorage.setItem('livrosUS', JSON.stringify(livros_async));
          
      }


      const editarLivro = async (id) => {

       

       

        //{this.state.modal= !this.state.modal}

        /*<NavigationContainer>
            <Stack2.Navigator>
              
              <Stack2.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
             
            
            </Stack2.Navigator>
      </NavigationContainer>*/
      
        //const livros_async_json = await AsyncStorage.getItem ('livrosUS')
      
        //var livros_async = JSON.parse(livros_async_json);
      
        
          //const index = await livros_async.findIndex(item => item.idLivro === id);

         
          

          //livros_async.splice(index, 1);
          //return AsyncStorage.setItem('livrosUS', JSON.stringify(livros_async));
          
      }

      return(

        
        <View style={styles.areaPessoa}>
          <Text style={styles.textoPessoa}>ID: {this.props.data.id} </Text>
          <Text style={styles.textoPessoa}>Nome: {this.props.data.nome} </Text>
          <Text style={styles.textoPessoa}>Editor(a): {this.props.data.editor} </Text>
          <Text style={styles.textoPessoa}>Categoria: {this.props.data.suspense ? 'Suspense' : ''} {this.props.data.fantasia ? ' Fantasia': ''} {this.props.data.ficcao ? ' Ficção' : ''} </Text>
          <Text style={styles.textoPessoa}>Quantidade: {this.props.data.quantidade} </Text>

        
            
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
                style={styles.deleteButton} onPress={() => {deleteLivro(this.props.data.id)}}> 
                <Icon name="trash" color="white" size={18} />
            </TouchableOpacity> 
            <TouchableOpacity 
                style={styles.editButton} onPress={() => {editarLivro(this.props.data.id)}}> 
                <Icon name="edit" color="white" size={18}/>
            </TouchableOpacity> 
          </View>
          
                
          </View>
        
      );
    }
  }
