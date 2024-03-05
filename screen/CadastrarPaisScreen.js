// CadastrarPaisScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CadastrarPaisScreen = () => {
  const [nomePais, setNomePais] = useState('');
  const [capital, setCapital] = useState('');

  const criarPais = () => {
    // Lógica para criar o país, você pode implementar o envio para a API ou armazenamento local
    console.log('Nome do País:', nomePais);
    console.log('Capital:', capital);

    const dados ={
      nome:nomePais,
      capital:capital
    }

    const opcoes = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    };

    fetch('http://localhost:8080/pais', opcoes)
		.then(response => {
			if (!response.ok) {
				throw new Error('Erro ao cadastrar país');
			}
		})

    // A linha abaixo redireciona o usuário a tela de início, tire o comentário após implementar a requisição para criar um novo país, usando o endpoint http://localhost:8080/pais (POST)
    //navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>Tela de Cadastro de País</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do País"
        value={nomePais}
        onChangeText={(text) => setNomePais(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Capital"
        value={capital}
        onChangeText={(text) => setCapital(text)}
      />
      <Button style={styles.btn} title="Salvar" onPress={criarPais} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: '#808080',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8, // Espaço entre os botões
  },
});

export default CadastrarPaisScreen;
