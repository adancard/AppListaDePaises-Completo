import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Você pode escolher outros ícones conforme sua preferência

const PaisesScreen = () => {
  const [paises, setPaises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPais, setSelectedPais] = useState(null);
  const [editedNome, setEditedNome] = useState('');
  const [editedCapital, setEditedCapital] = useState('');

  useEffect(() => {
    //const apiUrl = 'http://192.168.15.81:8080/pais';
    const apiUrl = 'http://localhost:8080/pais';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setPaises(data);
        console.error('Sucesso:', data);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  }, []);

  const handleEditar = (id, nome, capital) => {
    setSelectedPais({ id, nome, capital });
    setEditedNome(nome);
    setEditedCapital(capital);
    setModalVisible(true);
  };

  const handleSalvarEdicao = () => {
    var url = `http://localhost:8080/pais/${selectedPais.id}`;

    // Dados a serem enviados no corpo da requisição
    var data = {
      nome: editedNome,
      capital: editedCapital
      // Adicione outros campos conforme necessário
    };

    // Configuração da solicitação
    var requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Adicione outros cabeçalhos conforme necessário
      },
      body: JSON.stringify(data)
    };

    // Fazendo a solicitação PUT
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Falha ao atualizar o país. Código de status: ${response.status}`);
        }
      })

    console.log(`Salvar alterações para o país com ID ${selectedPais.id}`);
    setModalVisible(false);
  };

  const apagar = (id) => {

    setSelectedPais({ id });

    const url = `http://localhost:8080/pais/${id}`;

    // Configuração da solicitação
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Adicione outros cabeçalhos conforme necessário
      },
    };

    // Fazendo a solicitação DELETE
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Falha ao excluir o país. Código de status: ${response.status}`);
        }
      });
}

  return (
    <View style={styles.container}>
      <Text style={styles.rowText}>Bloco de Países Cadastrados</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Nome</Text>
        <Text style={styles.headerText}>Capital</Text>
        <Text style={styles.headerText}>Ações</Text>
      </View>
      <FlatList
        data={paises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.rowText}>{item.nome}</Text>
            <Text style={styles.rowText}>{item.capital}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => handleEditar(item.id, item.nome, item.capital)}>
                <Icon name="edit" size={24} color="red" />
              </TouchableOpacity>

              <View><Text>&nbsp;</Text></View>

              <TouchableOpacity onPress={() => apagar(item.id)}>
                <Icon name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de Edição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar País</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={editedNome}
              onChangeText={text => setEditedNome(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Capital"
              value={editedCapital}
              onChangeText={text => setEditedCapital(text)}
            />
            <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(false)}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleSalvarEdicao}>
              <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",

    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    padding:20
  },
  tableRow: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rowText: {
    fontSize: 16,
    padding:20,
    textAlign:'center'
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
    backgroundColor: '#dcdcdc',
    padding: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 8,
  },
  btn: {
    backgroundColor: '#808080', // Cor de fundo cinza
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
  btnText: {
    color: 'white', // Cor do texto em branco
    fontWeight: 'bold', // Texto em negrito
  },
});

export default PaisesScreen;
