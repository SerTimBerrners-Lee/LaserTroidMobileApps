import React, {useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Button, Text, Input, Icon, Spinner } from '@ui-kitten/components';
import { TextInput,StyleSheet, Platform,  View, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { ursServer } from './jsonAPI/urlServer'
import Constants from 'expo-constants';
const db = SQLite.openDatabase('U.db');

const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
      );
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    
    return token;

  } else {
    alert('Must use physical device for Push Notifications');
  }
};



export const SignComponent = ({ navigation }) =>{

  const [nicname, setNicname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [token, setToken] = useState(null);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((res) => {
      setToken(res)
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const navigateRegistration = () => {
    navigation.navigate('Registration');
  }

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'}/>
  );

  const [message, setMessage] = React.useState('Вход')
  const [load, setLoad] = React.useState()

  const SignIn = () => {
    if(nicname == '' || password == '') {
      return setMessage('Введите имя и пароль')
    }
    Keyboard.dismiss()
    setLoad(<Spinner size='giant'/>);

    let result = axios.post('https://lasertroid.ru/wp-admin/admin-ajax.php', 
      { 
        action: 'autoficationUserLtMobile',
        login_user_mobile: nicname,
        password_user_mobile: password //CzJWQ4zB
      });

    result.then(res => {
      if(res.data.data == 'error') {
        setMessage(res.data.message);
      } else {
          setMessage('Здравствуй ' + res.data.data.user_login)
          setLoad(<Spinner size='giant'/>);
          const promis = new Promise((result, reject ) => {
            db.transaction(tx => {
              tx.executeSql('select * from users', [], (_, {rows}) => {
                  result(res.data.data )
              }, err => reject(res.data.data))
            })
          })
          promis.then(obj => {createTableFunction(obj, true); console.log('delete')}).catch(err => {createTableFunction(err); console.log('create')})
      
          setNicname('')
        }
    }).catch(err => console.log(err))
  }

  const createTableFunction = (obj, drop = false) => {
    if(drop) { 
      db.transaction( tx => {
      tx.executeSql(`delete from users`, [], (_) => { 
        tx.executeSql(`create table if not exists users (id integer primary key not null, login text, nicename text, email text, url text, display_name text, token text, ball int);`, [], (_) => {
          tx.executeSql(`insert into users  (login, nicename, email, url, display_name, token, ball) values (?, ?, ?, ?, ?, ?, ?)`, [obj.user_login, obj.user_nicename, obj.user_email, obj.ID, obj.display_name, token, obj.user_ball], (_) => {
              console.log(`Successful drop and create`)
              pushTokenPost(token, obj.ID);
              navigation.navigate('Home', {sign: true});
            }, error => console.log('error insert'));
          }, error => console.log('error create'))
        }, error => console.log('error delete'));
      })
    } else {
      db.transaction(tx => {
        tx.executeSql(`create table if not exists users (id integer primary key not null, login text, nicename text, email text, url text, display_name text, token text, ball int);`, [], (_) => {
          tx.executeSql(`insert into users  (login, nicename, email, url, display_name, token, ball) values (?, ?, ?, ?, ?, ?, ?)`, [obj.user_login, obj.user_nicename, obj.user_email, obj.ID, obj.display_name, token, obj.user_ball], (_) => {
            console.log(`Successful create new table and uset object`)
            pushTokenPost(token, obj.ID);
            navigation.navigate('Home', {sign: true});
          });
        })
      })
    }
  }

  const pushTokenPost = (data, id) => {
    axios.post(`${ursServer}/api/user/token`, {data, id},  { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }})
  }

   return(
      <KeyboardAvoidingView
          behavior={"padding"}
          style={{ flex: 1 }}
      >
          <LinearGradient  
            colors={['#14191f', '#14191f', '#14191f', '#14191f', '#14191f', '#14191f', '#14191f','#14191f','#14191f', '#11466e']} 
            style={styles.Linear} >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <View style={styles.ImageBlock}>
                <Image style={styles.ImageLogo} source={{uri: 'https://lasertroid.ru/wp-content/uploads/2018/03/Kalashy_Gerb_LaserTroid_Flag15600px.png'}}/>
                <Text category="h4" style={styles.ImageContent}> {message} </Text>
                <Text style={{position: 'absolute', top: 50, left: 10}}> {load} </Text>
                </View>
                  <View style={styles.inner}>
                      <Input
                           placeholder="Введите Имя или E-mail "
                           value={nicname}
                           onChangeText={setNicname}
                          style={styles.input}
                      />
                      <Input
                          value={password}
                          placeholder="Введите пароль"
                          icon={renderIcon}
                          secureTextEntry={secureTextEntry}
                          onIconPress={onIconPress}
                          onChangeText={setPassword}
                          style={styles.input}
                      />
                    <View style={styles.buttons}>
                      <Text style={styles.buttonText} onPress={SignIn} >Войти</Text>
                      </View>
                    <View style={styles.buttons}>
                      <Text style={styles.buttonText} onPress={navigateRegistration}> Зарегистрироваться </Text>
                    </View>
                    
                  </View>
                  </>
              </TouchableWithoutFeedback>
          </LinearGradient>
      </KeyboardAvoidingView>
   );
}
const styles = StyleSheet.create({
  Linear: {
    height: '105%'
  },
  ImageBlock: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ImageContent: {
    fontSize: 30,
    padding: 20,
    width: '80%',
    textAlign: 'center',
    color: 'rgb(143,139,140)'
  },
  ImageLogo: {
    width: "40%",
    height: 90,
    top: '10%',
  },
  content: {
    marginTop: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '10%'
  },
  input: {
    width: '100%',
  },
  buttons: {
    backgroundColor: 'rgb(22,29,39)',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },  
  input: {
    height: 50,
    backgroundColor: 'rgb(22,29,39)',
    borderColor: "rgb(22,29,39)",
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  buttonText: {
    width: '100%',
    textAlign: 'center',
    padding: 15,
  }
});