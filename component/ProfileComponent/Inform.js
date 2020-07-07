import React from 'react';
import {
    Icon,
    Button,
    Text,
    Spinner
} from '@ui-kitten/components';
import { StyleSheet, View, ScrollView, Image, TouchableHighlight } from 'react-native'; 
import { ursServer } from '../jsonAPI/urlServer';
import axios from 'axios';

export const Inform = props => {
    if(props.user) {
        return (
            <View style={styles.inform}>
                <View style={styles.blockInform}>
                    <Text category="h4"> {props.user.glasses ? props.user.glasses : 0} </Text>
                    <Text style={styles.descriptionInform}> Очки </Text>
                </View>
                <View style={styles.blockInform}>
                    <Text category="h4"> {props.user.plays ? props.user.plays : 0} </Text>
                    <Text style={styles.descriptionInform}> Игры </Text>
                </View>
                <View style={styles.blockInform}>
                    <Text category="h4"> {props.user.hit ? props.user.hit : 0} </Text>
                    <Text style={styles.descriptionInform}> Попадания </Text>
                </View>
                <View style={styles.blockInform}>
                    <Text category="h4"> {props.user.hit ? props.user.killed : 0} </Text>
                    <Text style={styles.descriptionInform}> Убил </Text>
                </View>
                <View style={styles.blockInform}>
                    <Text category="h4"> {props.user.hit ? props.user.was_killed : 0} </Text>
                    <Text style={styles.descriptionInform}> Был Убит </Text>
                </View>
                <View style={styles.blockInform}>
                    <Text category="h4"> {props.user.accuracy ? props.user.accuracy : 0} </Text>
                    <Text style={styles.descriptionInform}> Точность </Text>
                </View>
                <View style={styles.blockInformBalls}>
                    <Text category="h4"> {props.user.user_ball ? props.user.user_ball : 0} </Text>
                    <Text style={styles.descriptionInform}> Баллов </Text>
                </View>
                {props.screen == 'profile' ?
                    <>
                        <View style={styles.blockInformDisctiption}>
                            <Text category="h4"> Биография </Text>
                            <Text style={styles.descriptionInformBio}>
                                {props.user.user_discription == '' ? 'Биография пуста, отредактируйте свой профиль перейдя в настройки ' : props.user.user_discription}
                            </Text>
                        </View>

                        <SubscribeBattl user={props.user.user_login} nav={props.navigation} />
                    </>
                    : <Text> </Text>
                }

            </View>
        )
    } else {

        return (
            <Spinner />
        )
    
    }
}

const SubscribeBattl = (props) => {
    let user = props.user;
    const [subscribe, setSubscribe] = React.useState(null)
    React.useEffect(() => {
        axios.get(`${ursServer}/api/battle/true`).then((res) => {
            let dataPush = []
            res.data.map((el, index, arr) => {
                let loginObj;
                if (el.login_player) {
                    loginObj = JSON.parse(el.login_player)
                    Object.keys(loginObj).map(us => {
                        if (us == user) {
                            dataPush.push(el)
                        }
                    })
                }
                if (index === arr.length - 1) {
                    if (dataPush.length > 0) {
                        setSubscribe(dataPush)
                    } else {
                        setSubscribe(null)
                    }
                }
            })
        })
    }, [])
    return (
        <>
            {subscribe ?
                <>
                    <Text style={{ fontSize: 18, marginTop: 27, marginBottom: 30 }}> Вы записались на следующие бои: </Text>
                    {subscribe.map((el, index) => {
                        return (
                            <BloclBattls batl={el} key={index} nav={props.nav} />
                        )
                    })}
                </>
                :
                <Button style={styles.button} size='large' onPress={() => props.nav.navigate('BattleSchedule')}> Записаться на бой </Button>
            }
        </>
    )
}

const BloclBattls = (props) => {
    let batl = props.batl
    return (
        <View style={styles.blockInformBalls}>
            <Text category="h4" style={styles.discriptBatl}> Название: </Text>
            <Text style={styles.descriptionInform}> {batl.location_adress} </Text>
            <Text category="h4" style={styles.discriptBatl}> Дата: </Text>
            <Text style={styles.descriptionInform}> {batl.date} </Text>
            <Text category="h4" style={styles.discriptBatl}> Время: </Text>
            <Text style={styles.descriptionInform}> {batl.time} </Text>

            <Button style={styles.button} appearance='ghost' status='info' size='giant' onPress={() => props.nav.navigate('Batl', { id: batl.id })}> Подробнее </Button>
        </View>)
}


const styles = StyleSheet.create({
    inform: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    blockInform: {
        width: '45%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgb(22,29,39)',
        margin: 5
    },
    blockInformBalls: {
        width: '93%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgb(22,29,39)',
        margin: 5

    },
    blockInformDisctiption: {
        width: '93%',
        padding: 10,
        backgroundColor: 'rgb(22,29,39)',
        margin: 5
    },
    descriptionInformBio: {
        padding: 8
    },
    button: {
        marginTop: 25,
        marginBottom: 20
    },
    discriptBatl: {
        marginTop: 19,
        marginBottom: 19
    }
});
