import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import {
  Text,
  Button,
  Icon,
  Spinner,
} from '@ui-kitten/components';
import { ursServer } from './jsonAPI/urlServer'
import { CARTs } from './jsonAPI/apiCart'
import { getUser } from './getObjectUser';
import axios from 'axios';
const LoadinContent = () => (
    <Text category="h3" style={{ textAlign: 'center' }}> Ничего не найдено... </Text>
)


export const Cart = (props) => {
    const [content, setContent] = React.useState(<Spinner />);
    const [price, setPrice] = React.useState(0)
    let pric = 0; 
    const [toCart, setToCart] = React.useState([])
    const [coin, setCoin] = React.useState(CARTs.returnArray().length)
    let uset = props.set;

    const deletesProduct = (id) => {
        CARTs.deleteProduct(id)
        setCoin(coin + 1)
    }

    const Purchase = () => {
        getUser().then(e => {
            if(e.user_ball < price) {
                alert('недостаточно средств')
            } else {
                if(CARTs.returnArray().length > 0) {
                   let products = JSON.stringify(CARTs.returnArray())
                    axios.post(`${ursServer}/api/new-product-message`, {products, id: e.ID, login: e.user_login, ball_user: e.user_ball - price, price: price}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }})
                    .then((res) => {
                        setCoin(0);
                        CARTs.deleteCart();
                        props.navigation.navigate('QRcode', {qrcode: res.data})
                    }).catch((err) => {
                        console.log(err)
                    })
                }                   
            }
        })
    }

    const RenderItemAccessory = (props) => (
        <TouchableHighlight onPress={() => deletesProduct(props.id)}>
            <Icon 
            name='close-square-outline'
            width={32} 
            height={32}
            fill='#3366FF'
            />
        </TouchableHighlight>
    );
    
    const Content = (props) => {
        return (
            <View style={styles.renderListComponent}> 
            <View style={styles.imagesBlock}>
                <Image  style={styles.img} source={{uri: `${ursServer}${props.image}`}} />
            </View>
            <View style={styles.informations}>
                <View style={styles.contenters}>
                <Text style={styles.titleText}> {props.name} </Text>
                <Text style={ styles.contentText}> {props.price} баллов </Text>
                </View>
            </View>  
            <View style={styles.deleters}>
                <RenderItemAccessory id={props.id}/>
            </View>      
        </View>
        )
    } 

    React.useEffect(() => {
        if(CARTs.returnArray().length >= 1) {
            let cartArr = []
                CARTs.returnArray().map((e, index, arr) => {
                    pric = pric + e.price;
                    cartArr.push({ image: e.image, name: e.name, price: e.price, id: e.idProduct})
                    if(index === arr.length - 1) {
                        setPrice(pric)
                        setToCart(cartArr)
                        setContent()
                    }
                })
        } else {
            setPrice()
            setToCart([])
            setContent(<LoadinContent />)
        }

        uset(CARTs.returnArray().length)
    }, [coin] )
    return (
        <>
        <ScrollView style={styles.Scrols}>
        <View style={styles.layourHome}>
            <Button style={{ marginBottom: 10}} appearance='ghost' appearance='outline' status='basic'> {price} </Button>
           {content}
           { toCart.length > 0 ? toCart.map((el, index, arr) => {
               return <Content image={el.image} name={el.name} price={el.price} id={el.id} key={index} /> 
           }) : <Text> </Text>}

        </View>
        
        </ScrollView>
        <Button style={{ marginBottom: 10}} appearance='ghost' appearance='outline' status='success' onPress={() => Purchase()}> Купить </Button>
        </>
    )
    
}

const styles = StyleSheet.create({
    renderListComponent: {
        width: '100%',
        backgroundColor: 'rgb(22,29,39)',
        flexDirection: 'row',
    },
    imagesBlock: {
        flex: 2
    },
    contenters: {
        justifyContent: 'space-between',
        padding: 10
    },
    informations: {
        flexDirection: 'row',
        flex: 4
    },
    deleters: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 113,
        height: 110
    },
    titleText: {
        fontSize: 17,
        padding: 10
    },
    contentText: {
        paddingLeft: 12
    }

});