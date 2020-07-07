import React from 'react';
import { Text, Icon, TopNavigation, TopNavigationAction, Spinner } from '@ui-kitten/components';
import { StyleSheet, ScrollView, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ursServer } from './jsonAPI/urlServer';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);


export const Reiting = ({ navigation }) => {
    const [reiting, useReiting] = React.useState(null);
    const [scroll, setScroll] = React.useState({});
    const [avatar, setAvatar] = React.useState(null);
    const navigateBack = () => {
        navigation.goBack();
    };

    const user = navigation.getParam('user');
    const glasses = navigation.getParam('glasses');
    const ID_USER = navigation.getParam('id');

    React.useEffect(() => {
        let res = axios.get(`${ursServer}/api/get-statistic-raiting/user-raiting`);
        res.then((e) => {
            useReiting(e.data);
        });
        axios.get(`${ursServer}/api/users/${ID_USER}`).then(res => {
            if (res.data) {
                setAvatar(res.data[0].avatar_uri);
            }
        })
    }, [])

    const scrollMoment = scroll => {
        setScroll({
            y: scroll.nativeEvent.contentOffset.y,
            height: scroll.nativeEvent.contentSize.height
        })
    }

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );
    return (
        <LinearGradient
            colors={['#14191f', '#14191f', '#14191f', '#11466e']}
            style={styles.Linear} >
            <TopNavigation style={styles.TopNav} title='В профиль' leftControl={BackAction()} />
            <Text category="h4" style={styles.title}> Рейтинг Игроков </Text>
            <ScrollView style={styles.scrolls} key={1} nativeEvent={{contentOffset:{ y: 0} }}onScroll={(scroll) => scrollMoment(scroll)}
                showsVerticalScrollIndicator={false}>
                {reiting ? <Content navigation={navigation} reiting={reiting} scroll={scroll} user={user} avatar={avatar} glasses={glasses} /> : <Spinner /> }
            </ScrollView>
        </LinearGradient>
    );
}

const Content = (props) => {
   const [count, setCount] = React.useState(10);
    const [oneTab, setOneTab] = React.useState(styles.buttonCountCurrent);
    const [twoTab, setTwoTab] = React.useState(styles.buttonCount);
    const [threeTab, setThreeTab] = React.useState(styles.buttonCount);
    const [tails, setTails] = React.useState(0);
    const [currentScroll, setCurrentScroll] = React.useState(10);

   const tabClick = number => {
    if(number == 10) {
        setOneTab(styles.buttonCountCurrent)
        setTwoTab(styles.buttonCount)
        setThreeTab(styles.buttonCount)
    } else if(number == 100) {
        setOneTab(styles.buttonCount)
        setTwoTab(styles.buttonCountCurrent)
        setThreeTab(styles.buttonCount)
    } else {
        setOneTab(styles.buttonCount)
        setTwoTab(styles.buttonCount)
        setThreeTab(styles.buttonCountCurrent)
    }
       setTimeout(() => {
           setCount(number)
           setCurrentScroll(10);
        }, 1000)
    }

    if(props.scroll.height - props.scroll.y < props.scroll.y) {
        // Увеличиваем стейт на 10
        setTimeout(() => setCurrentScroll(currentScroll + 10), 500);
    }

    return (
        <View>
            <View style={styles.viewMain}>
                <View style={styles.currentUser}>
                    {
                        props.avatar ?
                        <Image style={styles.avatarImage} source={{uri: `${ursServer}/${props.avatar}`}} />
                        :
                        <Image style={styles.avatarImage} source={require('../assets/images/avatar.jpg')} />
                    }
                    <View style={{marginLeft: 10}}>
                        <Text> {props.user} </Text>
                        <Text> Очки: {props.glasses || 0} </Text>
                        <Text> Вы на {tails} месте в рейтинге</Text>
                    </View>

                </View>
                <View style={styles.mainChecked}>
                    <TouchableHighlight onPress={() => tabClick(10)} style={oneTab}><Text> Топ 10</Text></TouchableHighlight>
                    <TouchableHighlight onPress={() => tabClick(100)} style={twoTab}><Text> Топ 100</Text></TouchableHighlight>
                    <TouchableHighlight onPress={() => tabClick(Object.values(props.reiting).length)} style={threeTab}><Text> Все </Text></TouchableHighlight>
                </View>
            </View>
            {Object.values(props.reiting).reverse().map((el, index) => {
                    if (index > count - 1 || index > currentScroll) {
                        return;
                    }
                return <ViewBlockUser navigation={props.navigation} data={el} key={index + 10} index={index} user={props.user} />
                    }   
                )
            }
        </View>
    )
}

const ViewBlockUser = (props) => {
    let isUser = props.user == props.data.user_login;
     return (
        <TouchableOpacity onPress={() => props.navigation.navigate('profileGaimer', {id: props.data.ID})}>
        <View  style={isUser ? styles.blockCurrentUser : styles.block}>
            <View style={styles.blockContent}><Text></Text></View>
            <View style={styles.blockContent}>
                {
                    props.data.avatar_uri ? 
                             <Image style={styles.avatarImage} source={{ uri: `${ursServer}/${props.data.avatar_uri}`}} />
                    :
                    <Image style={styles.avatarImage} source={require('../assets/images/avatar.jpg')} />
                }
                
                <Text > {props.data.user_login} </Text>
                <Text  style={isUser ?  styles.isUserText  : styles.glasses}> Очки: {props.data.glasses} </Text>
            </View>
            <View style={styles.blockContent}><Text style={props.index + 1 == 1 ? styles.divVinTitle : styles.divTitle}> #{props.index + 1} </Text></View>
         </View>
         </TouchableOpacity>
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
    block: {
        width : '90%',
        padding: 10,
        margin: 10,
        borderLeftColor: 'red',
        backgroundColor: 'rgb(22,29,39)',
        elevation: 10,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    blockCurrentUser: {
        width: '90%',
        padding: 10,
        margin: 10,
        borderLeftColor: 'rgb(22,29,39)',
        backgroundColor: '#e1b641',
        elevation: 10,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    glasses: {
        backgroundColor: 'black',
        marginTop: 10
    },
    blockContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    divVinTitle: {
        color: '#e1b641',
        fontSize: 20,
        fontWeight: 'bold'
    },
    divTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    viewMain: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    currentUser: {
        flex: 2,
        backgroundColor: 'rgb(22,29,39)',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainChecked: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonCount: {
        margin: 5,
        padding: 10,
        flex: 1,
        backgroundColor: 'rgb(22,29,39)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },
    buttonCountCurrent: {
        margin: 5,
        padding: 10,
        flex: 1,
        backgroundColor: '#e1b641',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },
    isUserText: {
        fontWeight: 'bold'
    }
})