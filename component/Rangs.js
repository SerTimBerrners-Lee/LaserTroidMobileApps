import React from 'react';
import { Text, Icon, Button, TopNavigation, TopNavigationAction, Spinner  } from '@ui-kitten/components';
import {  StyleSheet, ScrollView, View, Image } from 'react-native';
import { ExitUser, getUser } from './getObjectUser';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ursServer } from './jsonAPI/urlServer';
import { RangsObject } from './jsonAPI/RangObject';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);


export const Rangs = ({ navigation }) => {
    const navigateBack = () => { 
        navigation.goBack();
    };
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );
    let glasses = navigation.getParam('glasses')
    return (
        <LinearGradient  
        colors={['#14191f', '#14191f', '#14191f', '#11466e']} 
        style={styles.Linear} >
        <TopNavigation  style={ styles.TopNav}  title='В профиль'  leftControl={BackAction()}/>
        <Text category="h4" style={styles.title}> Ранги </Text>
        <ScrollView  style={styles.scrolls}>
        <View>
        <View style={glasses >= 0 && glasses < 700? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Новобранец</Text>
                <Text category='h6'>Опыт: 0</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank1.png`)} />
            </View>
        </View>
        <View style={glasses >= 700 && glasses < 1400? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer</Text>
                <Text category='h6'>Опыт: 700</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank2.png`)} />
            </View>
        </View>

        <View style={glasses >= 1400 && glasses < 2400? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Старший Raer</Text>
                <Text category='h6'>Опыт: 1400</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank3.png`)} />
            </View>
        </View>
        <View style={glasses  >= 2400 && glasses < 3900? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Рядовой Raer</Text>
                <Text category='h6'>Опыт: 2400</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank4.png`)} />
            </View>
        </View>

        <View style={glasses >= 3900 && glasses < 5800? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer ефрейтер 1 степени</Text>
                <Text category='h6'>Опыт: 3900</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank5.png`)} />
            </View>
        </View>
        <View style={glasses >= 5800 && glasses < 8100 ? styles.glasses : styles.bodyCart}>
            <View  style={styles.textCart}>
                <Text category='h6'>Raer младший сержант 1-й степени</Text>
                <Text category='h6'>Опыт: 5800</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank6.png`)} />
            </View>
        </View>
        <View style={glasses >= 8100 && glasses < 11100 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer сержант 1-й степени</Text>
                <Text category='h6'>Опыт: 8100</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank7.png`)} />
            </View>
        </View>
        <View style={glasses >= 11100 && glasses < 14600 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer Ефрейтор 2-й степени</Text>
                <Text category='h6'>Опыт: 11100</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank8.png`)} />
            </View>
        </View>
        <View style={glasses >= 14600 && glasses < 18800 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer Младший сержант 2-й степени</Text>
                <Text category='h6'>Опыт: 14600</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank9.png`)} />
            </View>
        </View>
        <View style={glasses >= 18800 && glasses < 23800 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Сержант 2-й степени</Text>
                <Text category='h6'>Опыт: 18800</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank10.png`)} />
            </View>
        </View>
        <View style={glasses >= 23800 && glasses < 29600 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Специалист</Text>
                <Text category='h6'>Опыт: 23800</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank11.png`)} />
            </View>
        </View>
        <View style={glasses >= 29600 && glasses < 36300 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Старший специалист</Text>
                <Text category='h6'>Опыт: 29600</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank12.png`)} />
            </View>
        </View>
        <View style={glasses >= 36300 && glasses < 44100 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-младший лейтенант</Text>
                <Text category='h6'>Опыт: 36300</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank13.png`)} />
            </View>
        </View>
        <View style={glasses >= 44100 && glasses < 53000 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-лейтенант</Text>
                <Text category='h6'>Опыт: 44100</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank14.png`)} />
            </View>
        </View>
        <View style={glasses >= 53000 && glasses < 63000 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Старший лейтенант</Text>
                <Text category='h6'>Опыт: 53000</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank15.png`)} />
            </View>
        </View>
        <View style={glasses >= 63000 && glasses < 74500 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Капитан</Text>
                <Text category='h6'>Опыт: 63000</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank16.png`)} />
            </View>
        </View>
        <View style={glasses >= 74500 && glasses < 87400 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Капитан 2-й степени</Text>
                <Text category='h6'>Опыт: 74500</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank17.png`)} />
            </View>
        </View>
        <View style={glasses >= 87400 && glasses < 102000 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Майор</Text>
                <Text category='h6'>Опыт: 87400</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank18.png`)} />
            </View>
        </View>
        <View style={glasses >= 102000 && glasses < 118400 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-подполковник</Text>
                <Text category='h6'>Опыт: 102000</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank19.png`)} />
            </View>
        </View>
        <View style={glasses >= 118400 && glasses < 136700 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Полковник</Text>
                <Text category='h6'>Опыт: 118400</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank20.png`)} />
            </View>
        </View>
        <View style={glasses >= 136700 && glasses < 157200 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Полковник 2-й степени</Text>
                <Text category='h6'>Опыт: 136700</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/21.png`)} />
            </View>
        </View>
        <View style={glasses >= 157200 && glasses < 180000 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Генерал полковник</Text>
                <Text category='h6'>Опыт: 157200</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/22.png`)} />
            </View>
        </View>
        <View style={glasses >= 180000 && glasses < 205200 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Генерал майор</Text>
                <Text category='h6'>Опыт: 180000</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/24.png`)} />
            </View>
        </View>
        <View style={glasses >= 205200 && glasses < 233300 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Генерал лейтенант</Text>
                <Text category='h6'>Опыт: 205200</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/27.png`)} />
            </View>
        </View>
        <View style={glasses >= 233300 && glasses < 264400 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Маршал</Text>
                <Text category='h6'>Опыт: 233300</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank59.png`)} />
            </View>
        </View>
        <View style={glasses >= 264400 ? styles.glasses : styles.bodyCart}>
            <View style={styles.textCart}>
                <Text category='h6'>Raer-Адмирал</Text>
                <Text category='h6'>Опыт: 264400</Text>
            </View>
            <View style={styles.imgCartView}>
                <Image style={styles.imgs} source={require(`../assets/images/rangs/Rank60.png`)} />
            </View>
        </View>

        </View>

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
    title: {
        textAlign: 'center',
    },
    bodyCart: {
        height: 120,
        elevation: 7,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    glasses: {
        height: 120,
        elevation: 7,
        backgroundColor: '#e1b641',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCart: {
        marginTop: 15,
        width: '75%',
        height: '70%',
        justifyContent: 'space-between',
        paddingLeft: 20
    },
    imgCartView: {
        width: '20%'
    },
    imgs: {
        width: 50,
        height: 50
    }
})