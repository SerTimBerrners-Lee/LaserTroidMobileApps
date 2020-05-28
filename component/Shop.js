import React from 'react';
import {  Select, Text, Button, TopNavigation, Spinner, TopNavigationAction, Icon } from '@ui-kitten/components';
import { 
  Image,
  View,
  StyleSheet ,ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getUser } from './getObjectUser';
import { ursServer } from './jsonAPI/urlServer';
import axios from 'axios';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back' />
);

const PressProfuct =(props) => {
  props.nav.navigate('Producte', { id: props.id , uset: props.uset})
}

const CustomHeader = (props) => {
  return (
  <React.Fragment>
    <Image
      style={styles.headerImage}
      source={{ uri: `${ursServer+props.header}` }}
    />
    <View style={styles.textContnt}>
    <Text 
      style={styles.headerText}
      category='h6'>
       {props.body}
    </Text>
      <Button status='success' size='giant' appearance='outline' value='asd'
          onPress={() => PressProfuct(props)}> Подробнее </Button>
    </View>
  </React.Fragment> 
)
};

const ViewContains = (props) => {
  return(
      <View style={styles.container} >
          <CustomHeader nav={props.nav} uset={props.uset} header={props.header} body={props.body} id={props.id} /> 
        </View> 
  );
}

// Получает индекс и делает запрос 
const ServerApi = (index, nav, uset, cb) => {
  let productId = Number(index)
  if(index > 0) {
      axios.get(`${ursServer}/api/get-product-list${productId}`).then((res) => {
        let view = [];
        res.data.forEach((product, index, arr) => {
          view.push(<ViewContains key={index} nav={nav} uset={uset} header={product.photo.split(' +|+ ')[0]} body={product.name} id={product.id} />)
          if(index === arr.length - 1) cb(view)
        })
    })
  }
}

export class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uset: this.props.navigation.getParam('uset'), content: <Spinner />, ball: 'load', placements: [{ text: 'Загрузка...', index: 0}]}
    this.navigateBack = this.navigateBack.bind(this)
  }

  componentDidMount() {
    if(this.state.ball == 'load') {
      getUser().then(user => {
        this.setState({ball: user.user_ball})
      })
    }

    axios.get(`${ursServer}/api/get-section-store`).then((res) => {
      let promis = new Promise((resolve, reject) => {
        let newArr = []
        res.data.forEach((el, index, arr) => {
          if(index == 0) this.indx(el.id, this.props.navigation)
          newArr.push({text: el.name, index: el.id})
          if(index === arr.length -1 ) resolve(newArr)
        })
      })
      promis.then((newArr) => {
        this.setState({
          placements: newArr
        })
      })
    })
  }
  indx(index, nav, uset = this.state.uset) {
    ServerApi(index, nav, uset, e => {
      this.setState({
        content: e
      })
    })
  }
  navigateBack() { 
    this.props.navigation.goBack()
  };
  BackAction() {
    return (<TopNavigationAction icon={BackIcon} onPress={this.navigateBack}/>)
  };

  render() {
  return (
    <LinearGradient  
      colors={['#14191f', '#14191f', '#14191f', '#11466e']} 
      style={{ flex: 1}} 
      start={[ 0.0, 0.0]}>
      <TopNavigation  style={{ height: 100, backgroundColor: '#14191f'}} title='Магазин' alignment='center' leftControl={this.BackAction()}/>
      <Text style={{  fontSize: 20 }}> На счету:  {this.state.ball ? this.state.ball : 0} баллов   </Text>
      <ScrollView>

      <View style={styles.controlContainer}>
          <Select
            style={styles.select}
            data={this.state.placements}
            status='control'
            placeholder='Меню'
            onSelect={(e) =>  this.indx(e.index, this.props.navigation)}
          />
        </View>
        <View style={styles.ConteinerContent}>
            {this.state.content } 
        </View>
      </ScrollView>
    </ LinearGradient>
  )}
} 

const styles = StyleSheet.create({
headerText: {
  margin: 5
},
textContnt: {
  flex: 1,
  backgroundColor: '#00000000',
  padding: 10,
},
headerImage: {
  height: 200,
  borderRadius: 5,
},
container: {
  backgroundColor: '#00000000',
  width: '47%',
  marginLeft: 5, 
  marginRight: 5,
  marginTop: 6,
  flexWrap : 'wrap',
},
select: {
  margin: 8,
},
controlContainer: {
  borderRadius: 4,
  margin: 8,
  backgroundColor: '#3366FF',
},
ConteinerContent: {
  flexDirection: 'row',
  flexWrap : 'wrap',
  justifyContent: 'space-between'
}
});