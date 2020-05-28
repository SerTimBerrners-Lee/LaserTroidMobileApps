import React from 'react';
import { Text, Icon,Avatar, Button, TopNavigation, TopNavigationAction, Spinner  } from '@ui-kitten/components';
import { StyleSheet, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ursServer } from './jsonAPI/urlServer';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);


const StarIcon = (style) => (
  <Icon {...style} name='arrowhead-right-outline'/>
);

const getBatl = (id, nav) => {
  nav.navigate('Batl', {id: id}) 
}

const BatleComponent = (props) => {
  let id = props.batl.id;
  return ( 
    <View  style={styles.battleComponent}> 
        <View style={styles.ImageLogo}>
        <Avatar style={styles.avatar} size='giant' source={require('../assets/images/batl_avatar.jpeg')}/>
            
        </View>

        <View style={styles.discriptionBattle}>
        <Text category="h4" > {props.batl.location_name} </Text>
        <Text style={styles.textBattl}> Занято Мест: {props.batl.current_places}/{props.batl.col_places} </Text>
        <Text style={styles.textBattl}> День: {props.batl.date.split('-')[2]}</Text>
        <Text style={styles.textBattl}> Месяц: {props.batl.date.split('-')[1]}</Text>
        <Text style={styles.textBattl}> Год: {props.batl.date.split('-')[0]} в {props.batl.time}  </Text>

        </View>
        <Button style={styles.button} appearance='ghost' status='danger' icon={StarIcon} onPress={() => getBatl(id, props.navigation)}/>
    </View>
  )
}
  

export const BattleSchedule = ({ navigation }) => {
  const [battlList, setBattlList] = React.useState([])
  React.useEffect(() => {
    let listBattle = axios.get(`${ursServer}/api/battle/true`);
    listBattle.then((batls) => {
      setBattlList(batls.data)
    }).catch(err => setBattlList(err))
  }, [])


  const navigateBack = () => { 
    navigation.goBack();
  };
    
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <LinearGradient  
          colors={['#14191f', '#14191f', '#14191f', '#11466e']} 
          style={styles.Linear} >
          <TopNavigation  style={ styles.TopNav}  title='На главную'  leftControl={BackAction()}/>
          <Text category="h4" style={styles.title}> Расписание боёв </Text>
          <ScrollView  style={styles.scrolls}>
            {!battlList ? <Spinner /> : battlList.map((el, index) => {
              return <BatleComponent batl={el} key={index} navigation={navigation} />
            })}
      </ScrollView>
    </LinearGradient>
  );
} 

const styles = StyleSheet.create({
  Linear: {
    flexDirection: 'column',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  TopNav: {
    backgroundColor: '#14191f',
    width: '100%',
    paddingTop: 50,
  },
  textBattl: {
    marginLeft: 5
  },
  battleComponent: {
    width: '100%',
    backgroundColor: 'rgb(22,29,39)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    marginTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  ImageLogo: {
    flexDirection: 'column',

  },
  title: {
    textAlign: 'center',
    padding: 10,
  },
  discriptionBattle: {
    flex: 2,
    marginLeft: 10
  },
  button: {
    flex: 1,
    height: '100%'
  },
})