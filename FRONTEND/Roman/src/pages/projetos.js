import React, { Component } from 'react';
import { StyleSheet, View, Text,FlatList, AsyncStorage, Picker } from 'react-native';

class Projetos extends Component {

  constructor() {
    super();
    this.state = {
      projetos: [],
      TemaSelecionado: "",
      temas: [],
    };
  }

  componentDidMount() {
    this._carregarProjetos();

    this._carregarTemas();
  }

  _carregarTemas = async () => {
    await fetch('http://192.168.4.203:5000/api/temas', {
      method: 'GET',   
      headers: {
        'Accept': 'application/json',
        "Authorization":"Bearer " + await AsyncStorage.getItem('@roman:token')
    }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({temas: data}))
      .catch(erro => console.warn(erro));
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
  };

  _filtrar = async (itemValue) =>{
    
    if(itemValue == "Temas"){
      await this._carregarProjetos;
      
    }
    else{
      
      await this.setState({TemaSelecionado: itemValue});
      await this._carregarProjetos;
      
      var listaProjetosFiltrado = [];
      await this.state.projetos.forEach(e => {
        if(e.tema == this.state.TemaSelecionado) listaProjetosFiltrado.push(e)
      });
      
      await this.setState({projetos: listaProjetosFiltrado});
      
      console.warn(this.state.TemaSelecionado);
    }
}

  render() {
    return (
      <View>

        <Picker selectedValue={this.state.TemaSelecionado} onValueChange={(itemValue) => this._filtrar(itemValue)}>
            <Picker.item label="Temas" value="Temas"/>
            {this.state.temas.map(e => {
                return( <Picker.item label={e.nome} value={e.nome}/>
                    )})}
        </Picker>

        <View style={styles.organizador}>
          <Text>Nome</Text>
          <Text>Tema</Text>
          <Text>Descrição</Text>
          <Text>Professor</Text>
        </View>

        <FlatList
          data={this.state.projetos}
          keyExtractor={item => item.idProjeto}
          renderItem={({item}) => (
            <View style={styles.borda}>
              <Text >{item.nome}</Text>
              <Text >{item.tema}</Text>
              <Text >{item.descricao == null ? "Nula" : item.descricao}</Text>
              <Text >{item.professor}</Text>
            </View>
          )}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  borda:
  {
      flexDirection: "row",
      justifyContent: "space-between",
      borderColor:'black',
      borderBottomWidth:1,
      borderTopWidth:1,
      padding: 10,
      marginBottom: 5,
  },
  organizador:{
      flexDirection: "row",
      justifyContent: "space-between"
  }

});

export default Projetos;