import React, {Component} from 'react';

import {
    AsyncStorage,
    View,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';

class Login extends Component {
    
    static navigationOptions = {
        header: null,
    }

    constructor(){
        super();
        this.state = {
            nome: null,
            senha: '12345'
        }
    }

    _realizarLogin = async() => {
        // console.warn(this.state.email + ' - ' + this.state.senha)
        fetch('http://192.168.4.203:5000/api/login',{
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                senha: this.state.senha
            })
        })
        .then(resposta => resposta.json())
        .then(data => this._irParaHome(data.token))
        .catch(erro => console.warn('AAAAA' + erro))
    }

    _irParaHome = async (tokenRecebido) => {
        // console.warn(tokenRecebido)
        if(tokenRecebido != null){
            try {
                await AsyncStorage.setItem('@roman:token',tokenRecebido);
                this.props.navigation.navigate("MainNavigator");

            } catch (error) {
                console.warn(error)
            }
        }
    }

    render() {
        return(
            <View>
                <TextInput placeholder="nome" value={this.state.nome}
                onChangeText={nome => this.setState({nome})}
                />
                
                <TextInput placeholder="senha" 
                onChangeText={senha => this.setState({senha})}
                />

                <TouchableOpacity
                onPress={this._realizarLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Login