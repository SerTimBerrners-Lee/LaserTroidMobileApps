import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Icon, Button, TopNavigation, TopNavigationAction  } from '@ui-kitten/components';
import { StyleSheet, View, Image} from 'react-native';
import { ursServer } from './jsonAPI/urlServer';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);


export const QRcode = (props) => {
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );
    const navigateBack = () => { 
        props.navigation.goBack();
    };
    let qrcode = props.navigation.getParam('qrcode')
    return (
        <LinearGradient  
        colors={['#14191f', '#14191f', '#14191f', '#11466e']} 
        style={styles.Linear} >
        <TopNavigation  style={ styles.TopNav}  title='На главную'  leftControl={BackAction()}/>
        <Text category="h4" style={styles.title}> Сделайте скриншот чтобы показать при получении товара.</Text>
        <View style={styles.views}>
            <Image style={styles.qrCodes} source={{uri: `${ursServer}${qrcode}`}} />
        </View>
        <Button style={styles.button}  appearance='ghost' status='success' size='giant'>СДЕЛАЙТЕ СКРИНШОТ</Button>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    Linear: {
      flexDirection: 'column',
      flex: 1,
      flexWrap: 'wrap',
    },
    TopNav: {
      backgroundColor: '#14191f',
      width: '100%',
      paddingTop: 50,
    },
    title: {
        textAlign: 'center',
        padding: 20,
        width:'100%'
    },
    qrCodes: {
        width: 200,
        height: 200
    },
    views: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})