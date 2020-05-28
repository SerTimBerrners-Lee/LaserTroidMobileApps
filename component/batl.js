import React from 'react';
import { Text, Icon,Calendar,  Select, Button, TopNavigation, TopNavigationAction, Spinner  } from '@ui-kitten/components';
import {  StyleSheet, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import MapView from 'react-native-maps';
import call from 'react-native-phone-call';
import { getUser } from './getObjectUser';
import { ursServer } from './jsonAPI/urlServer';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

const callNumber = (num) => {
    call({number: String(num), prompt: false}).catch(err => {console.log()})
}

export const Batl = (props) => {
  const [batl, setBatl] = React.useState(null);
  const [content, setContent] = React.useState(<Spinner />);

  let id = props.navigation.getParam('id')

  React.useEffect(() => {
    axios.get(`${ursServer}/api/battle/get-battl/${id}`).then(res => {
      setBatl(res.data[0].location_name)
      setContent(<ContentComponent batl={res.data[0]} />)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );
  const navigateBack = () => { 
      props.navigation.goBack();
  };
  return (
      <LinearGradient  
      colors={['#14191f', '#14191f', '#14191f', '#11466e']} 
      style={styles.Linear} >
      <TopNavigation  style={ styles.TopNav}  title='Расписание боев'  leftControl={BackAction()}/>
      <Text category="h4" style={styles.title}> {batl ? batl : 'Загрузка...'} </Text>
      <ScrollView  style={styles.scrolls}>
            { content }
      </ScrollView>
      </LinearGradient>
    )
 }

const ContentComponent = (props) => { 
  let latitude = Number(props.batl.locationParametr.split(',')[0]);
  let longitude = Number(props.batl.locationParametr.split(',')[1])
  return (
      <>
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
            initialRegion={{
              latitude: latitude ? latitude: 51.447090,
              longitude: longitude ? longitude : 41.955872,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.000121,
              }}
        />
      </View>
      <CententDiscription batl={props.batl}/>
      </>
  )
}

const CententDiscription = (props) => {
  let batl = props.batl;
  let weapon = 0;
  if(JSON.parse(batl.weaponList)) {
    weapon = JSON.parse(batl.weaponList);
  }
  React.useEffect(() => {
    getUser().then((user) => {
      if(batl.login_player){
        let check_user = JSON.parse(batl.login_player);
        Object.keys(check_user).map((el) => {
          if(el == user.user_login) {
            setsubscrids(true)
          }
        })
      } 
    })
  }, [])

  const [selectedOption, setSelectedOption] = React.useState(null);
  let data = [];
  Object.entries(weapon).map((w) => {
    data.push({text: w[0]})
  })

  const Subscribe = (w, idBattl) => {
    let userObject = getUser().then((user) => {
      let login = user.user_login;
      let idUser = user.ID;
      let weapon = w == null ? null : w.text;
      axios.post(`${ursServer}/api/subscribe-batll`, {login,idUser, idBattl, weapon}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }}).then((result) => {
        if(result.data.type == 'error') {
        } else {
          setsubscrids(true)
        }
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  const OnSubscribe = () => {
    let idBatl = batl.id
    getUser().then(user => {
      axios.post(`${ursServer}/api/on-subscribe-batll`, {login: user.user_login, idBatl: idBatl},{ headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }})
      .then((res) => {
        setsubscrids(null)
      }).catch((err) => {
          console.log(err)
      })
    })
  }

    const [subscrids, setsubscrids] = React.useState(null);

    const [date, setDate] = React.useState(new Date(`${batl.date}T15:00:00`));
    return (
        <View style={styles.Contents}>
            <View style={styles.ContentBlock}>
            <View style={styles.ContentBlockText}>
                <View style={styles.blockOne}>
                    <Text style={styles.textBattls}>{batl.location_adress} </Text>
                    <Text style={styles.textBattlb}>Свободных мест: {batl.col_places - batl.current_places}</Text>
                </View>
                <Button style={styles.textBattl} appearance='outline'  size='giant' status='success' > Начало в {batl.time}  </Button>
                <Calendar
                    style={{alignSelf: 'center', justifySelf: 'center'}}
                    date={date}
                    onSelect={setDate}
                    />  
                 <View>
                <Text style={styles.textBattlTitle}> Описание </Text>
                    <View  style={styles.discriptionText}>
                    <Text>{batl.discription} </Text>
                    </View>
                </View>
            </View>
           
            <View style={styles.discriptionText}>
            <Text  style={styles.textBattlTitle}> Выбрать оружие: </Text>
              <Select
                  style={styles.select}
                  data={data}
                  placeholder='Выбрать оружие'
                  selectedOption={selectedOption}
                  onSelect={setSelectedOption}
              /> 
          </View>

            <View style={styles.discriptionText}>
             <Button style={styles.button} appearance='ghost' status='primary' onPress={() => callNumber(batl.phone)}> { batl.phone } </Button>
            </View>
            </View>
            <View style={{
              backgroundColor: 'rgb(22,29,39)',}}>
              {subscrids == null ?
             <Button style={styles.button} appearance='outline' status='success' size='giant' onPress={() => Subscribe(selectedOption, batl.id)}>Записаться</Button>
            :
            <Button style={styles.button} appearance='outline' status='danger' size='giant' onPress={() => OnSubscribe(batl.id)}>Вы Записались</Button>
          }
            </View>
        </View>
    )
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
    title: {
        textAlign: 'center',
        padding: 10,
        width: '100%'
    },
    maps: {
        backgroundColor: 'red',
        width: '100%',
        height: 300
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      mapStyle: {
        width: '100%',
        height: 360,
        position: 'absolute',
        top: 1
      },
      Contents: {
        paddingLeft: 5,
        paddingRight: 5
      },
      ContentBlock: {
        marginTop: 300,
        backgroundColor: 'rgb(22,29,39)',
        padding: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      discriptionText: {
        margin: 15
      },
      blockOne: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30
      },
      textBattl: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        marginBottom: 40
      },
      textBattls: {
        fontSize: 20,
        marginBottom: 30,
        width: '50%',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,

      },
      textBattlb: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30,
        width: '40%',
        paddingTop: 10,
        paddingBottom: 10,
      },
      textBattlTitle: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
      }
})
