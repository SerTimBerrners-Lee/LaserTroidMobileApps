import React from 'react';
import { StyleSheet, View, ScrollView, Image,  TouchableHighlight } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

const pres = (props) => {
  props.props.navigation.navigate('Shop', {uset: props.props.set});
}

const openNews = (props) => {
  props.props.navigation.navigate('News');
}

const presBattl = (props) => {

  props.navigation.navigate('BattleSchedule');
}

export const GlobalScreen = (props) => {
  return (
    <View style={styles.layourHome}>
      <TopBlockHorisontal navigation={props.navigation}/>
      
      <BlockCenter navigation={props.navigation} />
      <EndBlock props={props}/>
    </View>
  )
}

const TopBlockHorisontal = (props) => {
  const Weaponters = () => {
    props.navigation.navigate('Weaponser')
  }
  const Turnir = () => {
    props.navigation.navigate('Turnir')
  }
  const Poezdki = () => {
    props.navigation.navigate('Poezdki')
  }
  return (
    <View style={ styles.horisoltalBlock }>
    <ScrollView horizontal style={styles.scrolls}>
  
        
      <View  style={styles.viewTop}>
        <Image source={require('../assets/images/weapon.jpg')} 
              style={styles.backgroundImage}/>
          <Text style={styles.textCardTop} onPress={() => Weaponters()}>Оружейка</Text>
      </View>
      <View  style={styles.viewTop}>
        <Image source={require('../assets/images/srazhenie-boi-bitva-voiny-oruzhie.jpg')} 
              style={styles.backgroundImage}/>
          <Text style={styles.textCardTop} onPress={() => Turnir()}>Турнир</Text>
      </View>
      <View  style={styles.viewTop}>
        <Image source={require('../assets/images/poezdki.jpg')} 
              style={styles.backgroundImage}/>
          <Text style={styles.textCardTop} onPress={() => Poezdki()}>Поездки</Text>
      </View>
       
    </ScrollView>
    </View>
  )
}

const BlockCenter = (props) => {
  return (
    <View style={styles.toBattle} >
        <View style={styles.buttonContent} >
        <Image source={require('../assets/images/fontForCenterBlock.jpg')} style={styles.backgroundImage} />
           <Text category='h1' style={styles.TextSendGame} onPress={() => presBattl(props)}>  Записаться на игру  </Text>
           
        </View>
    </View>
  )
}

const EndBlock = (props) => {
  return (
        <View style={styles.buttonGroup} appearance='outline' status='danger'>
          <TouchableHighlight onPress={() => pres(props)} style={styles.buttonEnd}>
            <View>
              <Icon
                name='shopping-cart-outline'
                style={{elevation: 60}}
                width={100}
                height={100}
                fill='#ef4b4c'
              /> 

              <Text style={{color: 'black', elevation: 1, textAlign: 'center'}} >Магазин</Text>
              </View>
              </TouchableHighlight>
            <TouchableHighlight style={styles.buttonEnd} onPress={() => openNews(props)}>
              <View>
                <Icon
                  name='undo-outline'
                  style={{elevation: 60}}
                  width={100}
                  height={100}
                  fill='#ef4b4c'
                />
                <Text style={{color: 'black', elevation: 1,textAlign: 'center'}}>Новости</Text>
              </View>
            </TouchableHighlight>
          </View>

  )
}

const styles = StyleSheet.create({
  layourHome: {
    flex: 1,
    justifyContent: 'space-around',
  },
  horisoltalBlock: {
    flex: 1,
  },
  scrolls: {
    paddingTop: 10
  },
  toBattle: {
    flex: 1,
    marginBottom: 30,
    borderTopLeftRadius: 17,
  },
  viewTop: {
    flex: 1,
    borderRadius: 10,
    width: 130,
    height: '90%',
    marginLeft: 10,
    justifyContent: 'center',
    marginRight: 5
  },
  backgroundImage: {
    borderRadius: 10,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  buttonContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextSendGame: {
    elevation: 90,
    borderRadius: 100,
    fontWeight: 'bold',
  },  
  textCardTop: {
    fontSize: 17,
    textAlign: 'center',
    backgroundColor: '#ef4b4c',
  },
  TextButtonBattle: {
    fontSize: 20,
  },
  buttonGroup: {
    flex:1,
    flexDirection: 'row',
  },
  bottomNavigation: {
    backgroundColor: '#0f10',
  },
  buttonEnd: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '40%',
    elevation: 10,
    margin: 10,
    borderRadius: 7,
    elevation: 60
    
  }
})