import React, { useState, useEffect } from 'react';

import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const EditarCliente = (props) => {
    const initialClienteState = {
        name: "",
        age: "",
        salary: ""
      };

    const [cliente, setCliente] = useState(initialClienteState);
    const { isOpen, closeModal } = props;

    useEffect(() => {
        // state value is updated by selected employee data
        const data = {
            name: props.selectedCliente.name,
            age: props.selectedCliente.age,
            cpf: props.selectedCliente.cpf
          };
        setCliente(data)
    }, [])

    const handleChange = (value, name) => {
        setCliente({ ...cliente, [name]: value });
    }

    const updateCliente = () => {
        // destructure state
        props.updateCliente({
            name: cliente.name,
            age: cliente.age,
            cpf: cliente.cpf
        });
        props.closeModal();
    }

    return (
        <Modal
            visible={isOpen}
            onRequestClose={closeModal}
            animationType="slide"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Editar Cliente</Text>

                <TextInput
                  placeholder="Digite o nome: "
                  style={styles.textBox}
                  value={cliente.name}
                  onChangeText={(text) => handleChange(text, "name")}
                />

                <TextInput
                  placeholder="Digite o idade: "
                  style={styles.textBox}
                  value={cliente.age}
                  onChangeText={(text) => handleChange(text, "age")}
                  keyboardType="numeric"
                />

                <TextInput
                  placeholder="Digite o cpf: "
                  style={styles.textBox}
                  value={cliente.cpf}
                  onChangeText={(text) => handleChange(text, "cpf")}
                  keyboardType="numeric"
                />
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={updateCliente}
                        style={{ ...styles.button, marginVertical: 0 }}>
                        <Text style={styles.buttonText}>Atualizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={closeModal}
                        style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
    
}



export default EditarCliente;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 15,
        fontSize: 18,
        padding: 10
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
    },
    buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
})