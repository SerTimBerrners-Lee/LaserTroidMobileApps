import React from 'react';
import { Text, Icon, Button, TopNavigation, TopNavigationAction, Spinner  } from '@ui-kitten/components';
import { StyleSheet, ScrollView, View, TextInput, Image } from 'react-native';
import { ExitUser, getUser } from './getObjectUser';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ursServer } from './jsonAPI/urlServer';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

const AvatarLoads = () => {
    const [image, setImage] = React.useState(null);
    const [userForAvatar, setUserForAvatar] = React.useState(null);

    const [avatar, setAvatar] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Разрешите доступ для файлов.');
                }
            }
        })();
        getUser().then((user) => {
            setUserForAvatar(user);
            axios.get(`${ursServer}/api/users/${user.ID}`).then(res => {
                if (res.data) {
                    setAvatar(res.data[0].avatar_uri);
                }
            })
        })
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // Делаем запрос на сервер 

        if (!result.cancelled) {
            setImage(result.uri);

            if(!userForAvatar) {
                return;
            }

            const photo = {
                uri: result.uri,
                type: 'image/jpeg',
                name: `${userForAvatar.ID}_photo.jpg`
            }

            const form = new FormData();
            form.append('ProfileImage', photo);

            axios({
                method: 'POST',
                url: `${ursServer}/api/load/avatar/user`,
                data: form
            })
            .catch(err => {
                console.log(err)
            }).then(data => {
                if(data.data == 'true') {
                    // Фото обновилось!
                    // Обновляем локальную базу!
                }
            })
           
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  marginBottom: 15 }}>
            {image ? <Image source={{ uri: image }} style={styles.avatarImage} /> :
                avatar ? 
                <Image style={styles.avatarImage} source={{ uri: `${ursServer}/${avatar}` }} />                 
                :
                <Image style={styles.avatarImage} source={require('../assets/images/avatar.jpg')} />
            }
        <Button style={{ margin: 30 }} onPress={pickImage} > Загрузить Аватар </Button>
    </View>);
}

export const Settings = ({ navigation }) => {
    const navigateBack = () => { 
        navigation.goBack();
    };

    const useChangesInput = (InputValues = '') => {
        const [values, setValues] = React.useState(InputValues);
        return {
            values,
            onChangeText: setValues,
        };
    }

    const OnAuth = () => {
        ExitUser(navigation)
    }
     
    const loginImput = useChangesInput()
    const discriptionInput = useChangesInput()
    const [message, setMessage] = React.useState('')

    // Отправляем логин на проверку
    const SendToChangesLogin = () => {
        let val = loginImput.values
        getUser().then((user) => {
            axios.post(`${ursServer}/api/changes-user/login`, {value: val, user: user.ID, discription: user.user_discription, other_login: user.user_login, other_discription: user.user_discription}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }})
            .then((res) => {
                setMessage(res.data)
            })
        })
    }
        
    // Отправляем описание на проверку
    const SendToChangesDiscription = () => {
        let val  = discriptionInput.values
        getUser().then((user) => {
            axios.post(`${ursServer}/api/changes-user/discription`, {value: val, user: user.ID, login: user.user_login, other_login: user.user_login, other_discription: user.user_discription}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }})
            .then((res) => {
                setMessage(res.data)
            })            
        })
    }
    
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    

    return (
        <LinearGradient  
        colors={['#14191f', '#14191f', '#14191f', '#11466e']} 
        style={styles.Linear} >
        <TopNavigation  style={ styles.TopNav}  title='В профиль'  leftControl={BackAction()}/>
        <Text category="h4" style={styles.title}> Настройки </Text>
        <Text style={styles.titleMessage}> { message } </Text>
        <ScrollView  style={styles.scrolls}>

        <View style={styles.body}>
            <AvatarLoads />
        <View style={styles.form}>
            <Text category="h6" style={{marginTop: 20,}}>Вы можете изменить логин и биографию после одобрения администратором </Text>
        <Text style={{marginTop: 20,}}>Login </Text>
        <View style={styles.textAreaContainer} >
        <TextInput
            style={{paddingLeft: 10, padding: 3, color: 'white'}}
            {...loginImput}
        />
        </View>
        <Button style={{marginTop: 20,}} appearance='outline' onPress={() => SendToChangesLogin()}> Отправить на проверку </Button>

        <Text style={{marginTop: 20,}}> Биография </Text>
        <View style={styles.textAreaContainer} >
        <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            numberOfLines={10}
            multiline={true}
            {...discriptionInput}
            />
        </View>

        <Button style={{marginTop: 20,}} appearance='outline' onPress={() => SendToChangesDiscription()}> Отправить на проверку </Button>
        </View>
        <Button style={{ marginTop: 20 }} size='large' appearance='outline' onPress={() => OnAuth()} status='danger'> Выйти </Button>
        </View>    
        </ScrollView>
  </LinearGradient>
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
    },
    titleMessage: {
        color: '#39e639',
        textAlign: 'center',
        fontSize: 20,
        width: '100%'
    },
    Outh: {
        marginTop: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    form: {
        marginTop: 20,
    },
    textAreaContainer: {
        borderColor: 'black',
        borderWidth: 1,
      },
      textArea: {
        height: 70,
        color: 'white',
        justifyContent: "flex-start",
        paddingLeft: 10,
      },
      body: {
          padding: 10,
      },
    avatarImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderColor: '#11466e',
        borderWidth: 8
    },
})