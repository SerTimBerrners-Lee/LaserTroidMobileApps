import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  TopNavigation,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalScreen } from './GlobalScreen';
import { Profile } from './Profile';
import { Cart } from './cart';
import { getUser } from './getObjectUser';
import { Scale } from './Scale';

const PersonIcon = (style) => (
  <Icon {...style} name='person-outline' />
);

const GlobeIcon = (style) => (
  <Icon {...style} name='globe-2-outline' />
); 

const GiftIcon = (style) => (
  <Icon {...style} name='gift-outline' />
); 

const ShoppingIcon = (style, coin) => {
  // Получаем список из корзины и увеличиваем количество 
  return (<>
    {coin > 0 ? <Text style={styles.cartCoin}>{coin}</Text> : <Text style={{position: 'absolute'}}></Text>}
    <Icon  {...style} name='shopping-cart-outline' />
    </>)
};

export const HomePage = ({ navigation }) =>{

  const [bottomSelectedIndex, setBottomSelectedIndex] = React.useState(0);
  const [coin, setCoin] = React.useState(0)

  React.useEffect(() => {
  getUser().then((user) => {
    if(!user) {
      return navigation.navigate('Sign');
      
    }
  }).catch((err) => {
    return navigation.navigate('Sign')
  })  
  }, [])

  let title = 'Главная';
  bottomSelectedIndex == 0 ? title = 'Главная' :
  bottomSelectedIndex == 1 ? title = 'Home' :
  bottomSelectedIndex == 2 ? title = 'Акции' :
  bottomSelectedIndex == 3 ? title = 'Профиль' : title = 'Главная' ;

  return  (
    <>
        <LinearGradient  
            colors={['#14191f', '#14191f', '#14191f', '#11466e']} 
            style={styles.Linear} >
            <TopNavigation  style={ styles.TopNav} title={title}/>
            {bottomSelectedIndex == 0 ?  <GlobalScreen navigation={navigation} set={setCoin} /> : 
              bottomSelectedIndex == 1 ? <Cart navigation={navigation}  set={setCoin} /> : 
                  bottomSelectedIndex == 2 ? <Scale /> :
            bottomSelectedIndex == 3 ? <Profile navigation={navigation} /> :  <GlobalScreen />  }
            
            <BottomNavigation
                style={styles.bottomNavigation}
                selectedIndex={bottomSelectedIndex}
                onSelect={setBottomSelectedIndex}>
                <BottomNavigationTab title='Главная' icon={GlobeIcon}/>
                <BottomNavigationTab title='Корзина' icon={(style) => ShoppingIcon(style, coin)}/>
                <BottomNavigationTab title='Акции' icon={GiftIcon}/>
                <BottomNavigationTab title='Профиль' icon={PersonIcon}/>
            </BottomNavigation>

        </LinearGradient>
        </>
    );
  }

const styles = StyleSheet.create({
    bottomNavigation: {
      backgroundColor: '#0f10',
      width: '100%'
    },
    Linear: {
      flexDirection: 'column',
      flex: 1,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    TopNav: {
      backgroundColor: '#14191f',
      width: '100%',
      paddingTop: 40,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    cartCoin: {
      position: 'absolute',
      backgroundColor: '#39e639',
      borderRadius: 145,
      bottom: 32,
      paddingLeft: 6,
      paddingRight: 6,
      right: 20,
      color: '#dee0df',
      zIndex: 1
    }
  })