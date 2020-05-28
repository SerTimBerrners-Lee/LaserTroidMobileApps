import React from 'react';
import { Text, Icon, TopNavigation, TopNavigationAction, Divider  } from '@ui-kitten/components';
import {  StyleSheet, ScrollView, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);


export const Weaponser = ({ navigation }) => {
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
        <Text category="h4" style={styles.title}> Оружейка </Text>
        <ScrollView  style={styles.scrolls}>
        <View style={styles.body}>
            <Text category='h3' style={styles.text}> AK74 M </Text>
            <View style={styles.contaoner}>
                <Image style={styles.images} source={require('../assets/images/weapon/AK74.jpg')}/>
            </View>
            <Divider style={styles.divider} />

           <Text category='h3' style={styles.text}> Штурмовая винтовка M4 A1 </Text>
            <View style={styles.contaoner}>
                <Image style={styles.images} source={require('../assets/images/weapon/m16.jpg')}/>
            </View>
            <Divider style={styles.divider} />
           <Text category='h3' style={styles.text}> MP 514 EXTERMINATOR </Text>
            <View style={styles.contaoner}>
                <Image style={styles.images} source={require('../assets/images/weapon/MP514.jpg')}/>
            </View>
            <Divider style={styles.divider} />
           <Text category='h3' style={styles.text}> Пистолет-пулемет Ingram </Text>
            <View style={styles.contaoner}>
                <Image style={styles.images} source={require('../assets/images/weapon/Ingram.jpg')}/>
            </View>
            <Divider style={styles.divider} />
           <Text category='h3' style={styles.text}> Снайперская винтовка МР 512 </Text>
            <View style={styles.contaoner}>
                <Image style={styles.images} source={require('../assets/images/weapon/MP512.jpg')}/>
            </View>
            <Divider style={styles.divider} />
           <Text category='h3' style={styles.text}> Винтовка «Delta» </Text>
            <View style={styles.contaoner}>
                <Image style={styles.images} source={require('../assets/images/weapon/delta.jpg')}/>
            </View>
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
    body: {
        paddingTop: 15,
    },
    contaoner: {
        width: '100%',
        height: 170,
        borderRadius: 10,
        marginBottom: 80
    },
    images: {
        position: 'absolute',
        width: '100%',
        height: '120%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        opacity: 0.9
    },
    text: {
        elevation: 200,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'rgb(22,29,39)',
        
    },
    divider: {
        height: 10,
        backgroundColor:'#943131',
        margin: 20
    }

})