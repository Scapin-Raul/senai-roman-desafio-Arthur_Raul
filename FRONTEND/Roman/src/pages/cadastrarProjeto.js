import React,{Component} from 'React';
import { StyleSheet, View, Text,FlatList, AsyncStorage,TextInput,TouchableOpacity,Picker } from 'react-native';

import jwt from 'jwt-decode'


class CadastrarProjeto extends Component {

    constructor(){
        super();
        this.state = {
            Nome: "",
            Temas: [],
            TemaSelecionado: "",
            Descricao: "",
            Professor: ""
        }
    }

    componentDidMount () {
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
          .then(data => this.setState({Temas: data}))
          .catch(erro => console.warn(erro));
    
        //   console.warn(this.state.Temas);
      };

    _cadastrarProjeto = async() => {

        try {
            const tokenDoStorage = await AsyncStorage.getItem('@roman:token');
      
            if (tokenDoStorage != null) { 
              this.setState({ Professor: jwt(tokenDoStorage).jti });
            //   console.warn(this.state.Professor);
            };
          } catch (error) { }

          console.warn( body = JSON.stringify({
            nome: this.state.Nome,
            descricao: this.state.Descricao,
            Idtema: this.state.TemaSelecionado,
            Idprofessor: this.state.Professor
        }))


        await fetch('http://192.168.4.203:5000/api/projetos', {
            method: 'POST',   
            body: JSON.stringify({
                nome: this.state.Nome,
                descricao: this.state.Descricao,
                Idtema: this.state.TemaSelecionado,
                Idprofessor: this.state.Professor
            }),
            headers: {
                'Authorization':'Bearer ' + await AsyncStorage.getItem('@roman:token'),
              'Content-Type': 'application/json'
            },
        })
        .then(resposta => resposta.json())
        .then(data => data.status == 200 ? console.warn('sucesso') : console.warn('erro'))
        .catch(erro => console.warn(erro));

    }

    render() {
        return (
            <View>
                <TextInput placeholder="Nome" 
                onChangeText={Nome => this.setState({Nome})}
                />

                <TextInput placeholder="Descição" 
                onChangeText={Descricao => this.setState({Descricao})}
                />

                <Picker selectedValue={this.state.TemaSelecionado} onValueChange={(itemValue) => this.setState({TemaSelecionado: itemValue})}>
                    <Picker.item label="Tema" value="0" selectedValue/>
                    {this.state.Temas.map(e => {
                        return( <Picker.item label={e.nome} value={e.idTema}/>
                            )})}
                </Picker>

                <TouchableOpacity onPress={this._cadastrarProjeto}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CadastrarProjeto;