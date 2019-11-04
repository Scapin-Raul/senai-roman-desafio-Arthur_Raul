import React, { Component } from 'react';
import { StyleSheet, View, Text,FlatList, AsyncStorage } from 'react-native';

class Projetos extends Component {

  constructor() {
    super();
    this.state = {
      projetos: [],
    };
  }

  componentDidMount() {
    this._carregarProjetos();
  }

  _carregarProjetos = async () => {
    await fetch('http://192.168.4.203:5000/api/projetos', {
      method: 'GET',   
      headers: {
        'Accept': 'application/json',
        "Authorization":"Bearer " + await AsyncStorage.getItem('@roman:token')
    }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({projetos: data}))
      .catch(erro => console.warn(erro));

      console.warn(this.state.projetos);
  };

  render() {
    return (
      <FlatList
        data={this.state.projetos}
        keyExtractor={item => item.idProjeto}
        renderItem={({item}) => (
          <View>
            <Text >{item.nome}</Text>
            <Text >{item.tema}</Text>
            <Text >{item.professor}</Text>
          </View>
        )}
      />
    )
  }
}

export default Projetos;