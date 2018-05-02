import React, {Component} from 'react';
import { Container, Header, Content, Footer, Item, Input, Left, Icon, Body,
List,ListItem,Thumbnail,Text, Card, CardItem, Button, Right,
Form, Label, View} 
from 'native-base';
import { TextInput } from 'react-native';



class App extends Component{
  constructor() 
  { 
    super(); 
    this.state = {berat: 0, tinggi: 0, massa:0, diagnosa:'', printText:false}; 
  }
  ubahberat(){
    // this.setState({berat: parseINT(this.refs.berat.value)});
    
  }
  ubahtinggi(){
    // this.setState({tinggi:this.refs.tinggi.value/100});
    
  }
  calculate()
  {
    // this.setState({berat: parseInt(this.refs.berat.value)});
    // this.setState({tinggi:this.refs.tinggi.value/100});
    let hberat = this.state.berat;
    let htinggi = this.state.tinggi/100;
    let IMT = (Number(hberat) / Math.pow(Number(htinggi),2));
    this.setState({massa: IMT});
    if(IMT<18.5){
      this.setState({diagnosa:'Berat Badan Kurang'})
    }
    else if(IMT>=18.5 && IMT<24.9){
      this.setState({diagnosa:'Berat Badan Ideal'})
    }
    else if(IMT>25.0 && IMT<29.9){
      this.setState({diagnosa:'BB Berlebih'})
    }
    else if(IMT>30 && IMT<39.9){
      this.setState({diagnosa:'BB Sangat Berlebih'})
    }
    else if(IMT>=39.9){
      this.setState({diagnosa:'Obesitas'})
    }
    this.setState({printText:true});
  }
  render(){
    const data= ()=>{
      return <Text>{this.state.massa}</Text>
    };
    return(
      <Container>
        <Header>
        <Body><Text style={{fontSize: 20, color: 'white'}}>Indeks Massa Tubuh</Text></Body>
        </Header>
        <Content>
          <Left><Item floatingLabel><Label> Massa(kg) </Label><Input keyboardType="numeric"  onChangeText={(text) => this.setState({berat: parseInt(text)})}/></Item></Left>
          <Right><Item floatingLabel><Label> Tinggi(cm) </Label><Input keyboardType="numeric" onChangeText={(text) => this.setState({tinggi: parseInt(text)})}/></Item></Right>
          <Button primary onPress={()=>{this.calculate()}}><Text>Hitung IMT</Text></Button>
          {this.state.printText && <Text> Massa Tubuh: {this.state.berat} kg</Text>}
          {this.state.printText && <Text> Tinggi Badan: {this.state.tinggi} m</Text>}
          {this.state.printText && <Text> Indeks Massa Tubuh: {this.state.massa}</Text>}
          {this.state.printText && <Text> Diagnosa: {this.state.diagnosa}</Text>}
        </Content>
        <Footer></Footer>
      </Container>
    )
  }
}

export default App;