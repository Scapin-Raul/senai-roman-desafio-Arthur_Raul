import React, { Component } from 'react';
import { AsyncStorage, View, Text } from 'react-native';

import jwt from 'jwt-decode'

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      token: '',
      nome: ''
    };
  }

  componentDidMount() {
    this._buscarDadosDoStorage()
  }

  _buscarDadosDoStorage = async () => {
    try {
      const tokenDoStorage = await AsyncStorage.getItem('@roman:token');

      if (tokenDoStorage != null) { 
        this.setState({ token: tokenDoStorage });
        // console.warn(jwt(tokenDoStorage).email)
        this.setState({ nome: jwt(tokenDoStorage).given_name });
      };
    } catch (error) { }
  }

  render() {
    return (
      <View>
        <Text>Nome: {this.state.nome}</Text>
      </View>
    )
  }
}


export default Profile;