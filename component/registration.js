import React, {useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Button, Text, Input, Icon, Spinner } from '@ui-kitten/components';
import { TextInput,StyleSheet, Platform, View, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export const Registration = ({ navigation }) => {

    const useInputChange = (initialValue = '') => {
        const [value, setValue] = React.useState(initialValue);
        return {
            value,
            onChangeText: setValue,
        };
    };

    const inputNikName = useInputChange();
    const inputName = useInputChange();
    const inputSurName = useInputChange();
    const inputEmail = useInputChange();
    const [message, setMessage] = React.useState('Регистрация')

    const navigateBack = () => { 
        navigation.goBack();
    };

    const registerUser = () => {
        if(inputNikName.value == '' || inputName.value == '' || inputSurName.value == '' || inputEmail.value == '') {
            return setMessage('Заполните все поля')
        } else {
            setMessage(<Spinner size='giant'/>);
            fetch();
            return Keyboard.dismiss()
        }
    }
    const fetch = () => {
        let result = axios.post('https://lasertroid.ru/wp-admin/admin-ajax.php', {
            action: 'registerUserLtMobile',
            login_user_mobile_register: inputNikName.value,
            name_user_mobile_register: inputName.value,
            surname_user_mobile_register: inputSurName.value,
            email_user_mobile_register: inputEmail.value,
        });
        result.then(res => {
            if(res.data.data !== 'error') {
                if(res.data.apbct.blocked) {
                    setMessage('Проверьте почту')
                    return 0
                }
                setMessage('' + res.data.message);
                inputNikName.onChangeText('');
                inputName.onChangeText('');
                inputSurName.onChangeText('');
                inputEmail.onChangeText('');

            } else {
                setMessage(res.data.message);
                return 0
            }
        }).catch(err => {
            setMessage('Проверьте почту')
            return 0
        });
    }
    return (

        <KeyboardAvoidingView
          behavior={"padding"}
          style={{ flex: 1 }}
      >
          <LinearGradient  
            colors={['#14191f', '#14191f', '#14191f', '#14191f', '#14191f', '#14191f', '#14191f','#14191f','#14191f', '#11466e']} 
            style={styles.Linear} >
              <TouchableWithoutFeedback >
                <>
                <View style={styles.ImageBlock}>
                <Image style={styles.ImageLogo} source={{uri: 'https://lasertroid.ru/wp-content/uploads/2018/03/Kalashy_Gerb_LaserTroid_Flag15600px.png'}}/>
                <Text category='h4' style={styles.ImageContent}> {message} </Text>
                </View>
                  <View style={styles.inner}>
                      <TextInput
                        placeholder="Введите Ник"
                        style={styles.input}
                        {...inputNikName}
                      />
                      <TextInput
                        placeholder="Введите Фамилию"
                        style={styles.input}
                        {...inputName}
                      />
                      <TextInput
                        placeholder="Введите Имя"
                        style={styles.input}
                        {...inputSurName}
                      />
                      <TextInput
                        placeholder="Введите Почту"
                        style={styles.input}
                        {...inputEmail}
                      />

                    <View style={styles.buttons}>
                      <Text style={styles.buttonText} onPress={registerUser}> Зарегистрироваться </Text>
                    </View>
                    <View style={styles.buttons} >
                      <Text style={styles.buttonText} onPress={navigateBack}>Войти</Text>
                      </View>
                    
                  </View>
                  </>
              </TouchableWithoutFeedback>
          </LinearGradient>
      </KeyboardAvoidingView>
    )
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
        width: '100%',
        textAlign: 'center',
        color: 'rgb(143,139,140)'
      },
      ImageLogo: {
        width: "40%",
        height: 90,
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
        height: 45,
        fontSize: 17,
        paddingLeft: 12,
        color: '#c1cad9',
        backgroundColor: 'rgb(22,29,39)',
        marginBottom: 10,
        borderRadius: 10,
        borderBottomWidth: 1,    
    },
      buttonText: {
        width: '100%',
        textAlign: 'center',
        padding: 15
      }
});