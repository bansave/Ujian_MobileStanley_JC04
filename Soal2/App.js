import React, { Component } from 'react';
import { ScrollView, Image} from 'react-native';
import { Container, Header, Content, Text,
   Thumbnail, Left, List, ListItem, Body, Item, Icon, Input, Footer, FooterTab, Button, View, Card, CardItem , Right} from 'native-base';

import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {resto: [],textapi:'',linkapi:'https://developers.zomato.com/api/v2.1/search?q='};
  }

  cariresto(){
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.textapi}`;
    this.setState({linkapi: url})
    var config = {
      headers:{'user-key':'be6d64346d476b3bd14c7bca6108c51d'}
    };

    axios.get(url, config).then((ambilData)=>{
      this.setState({
        resto: ambilData.data.restaurants,
      })
      console.log(url);
    })
  }

  render(){

    const data = this.state.resto.map((item,index) => {
      var nama = item.restaurant.name;
      var kota = item.restaurant.location.city;
      var Alamat = item.restaurant.location.address;
      var harga = item.restaurant.average_cost_for_two;
      var gambar = item.restaurant.thumb;
      return (
        <ListItem avatar key={index}>
          <Content>
            <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri:gambar}} />
                <Body> 
                  <Text> {nama} </Text>
                  <Text note> {kota} </Text>  
                </Body> 
              </Left> 
              <Right>
                <Text>Rp. {harga}</Text>
              </Right>
            </CardItem>
            <CardItem>            
              <Body>
                <Image source={{uri:gambar}}style={{height: 200, width: 370, flex: 1}}/>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Icon active name="globe" />
                <Text>{Alamat}</Text>
              </Left>
            </CardItem>
            </Card>
          </Content>
        </ListItem>
      )
    })

    return(
      <Container>
        <Header searchBar rounded style={{backgroundColor:'red'}}>
          <Item>
            <Icon name="search" />
            <Input placeholder="Cari Menu..." onChangeText={(text) => this.setState({textapi: text})}/>
          </Item>
          <Item>
            <Button style={{backgroundColor:'red'}} onPress={()=>{this.cariresto()}}><Text>LIHAT DAFTAR RESTO</Text></Button>
          </Item>                      
        </Header>
        <Content>
          <ScrollView>
            {/* <Text style={{fontSize: 40}}>Daftar Orang</Text> */}
            <List>
              {data}
            </List>
          </ScrollView>
        </Content>
        
      </Container>
    )
  }
}


export default App;

//install axios, install native-base --save, react-native link, react-native log-android
