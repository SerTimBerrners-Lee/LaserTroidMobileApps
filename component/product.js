import React from 'react';
import { Text, Button, TopNavigation, Icon, TopNavigationAction, Spinner, Select } from '@ui-kitten/components';
import { 
    Image,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
                         } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CARTs } from './jsonAPI/apiCart';
import axios from 'axios';
import { ursServer } from './jsonAPI/urlServer';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

const ServerFetch = (id, cb) => {
    axios.get(`${ursServer}/api/get-product/${id}`).then((res) => {
        cb(res.data)
    }).catch((err) => {
    })
}

export const Producte = (props) => {
    const [product, setProduct] = React.useState(null)
    let id = props.navigation.getParam('id', 'NO-ID')
    let uset = props.navigation.getParam('uset')

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    const navigateBack = () => { 
        props.navigation.goBack();
    };

    React.useEffect(() => {
        ServerFetch(id, e => {
            setProduct(e[0])
        })
    }, [])

    return(
        <LinearGradient  
        colors={['#14191f', '#14191f', '#14191f', '#11466e']} 
        style={{ flex: 1}} 
        start={[ 0.0, 0.0]}
    >
         <TopNavigation  style={styles.TopNav}  title='Назад в магазин'  leftControl={BackAction()}/>
        
        {product ?  <Content product={product} uset={uset} /> : <Spinner />}
    </LinearGradient>
    )
}

const addCart = (product, image, parametr) => {
    let idProduct = product.id;
    let idSection = product.section_id;
    let price = product.price;
    let name = product.name;
    CARTs.addObject({idProduct, idSection, price, name, image, parametr})
}

const deleteCart = (id) => {
    CARTs.deleteProduct(id)
}
  
const Content = (props) => {
    const [cart, setCart] = React.useState(false);
    let photo = props.product.photo;
    const [url, setUrl] = React.useState(photo.split(' +|+ ')[0]);
    const [selectedOption, setSelectedOption] = React.useState(null);
    let data = [];
    if(props.product.parametr !== 0 ) {
        props.product.parametr.split(']').map((el, index, arr) => {
            if(el.length == 0) return ''
            data.push({ text: el.replace('[', ''), index: index })
        })  
    } 
    React.useEffect(() => {
        Object.values(CARTs.returnArray()).map((el, index, arr) => {
            if(el.idProduct == props.product.id) {
                 setCart(true)
            }
        })
    }, [])
    const toCart = () => {
        setCart(!cart);
        if(!cart) {
            let select;
            if(selectedOption == null) {
                select = data[0].text
                addCart(props.product, url, select)
            } else {
                select = selectedOption.text
                addCart(props.product, url, select)
            }
        } else {
            deleteCart(props.product.id)
        }
        props.uset(CARTs.returnArray().length)
    }
    const press = (el) => {
        setUrl(el);
    }
    return (
        <View style={styles.ViewImg}> 
         <ScrollView style={styles.ViewDescription}>
             <View style={{ height: 350  }} >
            <Image source={{uri: `${ursServer + url}`}} style={styles.ImgeTop}/>
            </View> 
            <View style={styles.ViewText}>
            <View style={styles.ViewTitleRow}> 
            <ScrollView horizontal style={styles.ScrollSlider}>
                {props.product.photo.split(' +|+ ').map((el, index, arr) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => press(el)}> 
                            <Image style={styles.imgSlider} key={index} source={{uri: `${ursServer + el}`}}/>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            </View>

                <Text style={styles.textPrice} category="h2"> { props.product.price } Баллов</Text>
                <Text style={styles.TextDescriptiom}>  {props.product.discription} </Text>
                    {props.product.parametr != 0 ?
                    (
                        <View style={styles.chategorsCheck}>
                    <Text category="h6" style={{marginTop: 10}}> Выберите параметр: </Text>
                    
                    <Select
                        data={data}
                        selectedOption={selectedOption}
                        onSelect={setSelectedOption}
                    />
                    </View>
                     )
                :
                <Text> </Text>
                }
            <Button style={styles.BotoonBottom} onPress={() => toCart()} appearance='outline' status={cart ? 'danger': 'success'} size='giant'> { cart ? 'Удалить из корзины' : 'В корзину' } </Button>
        </View>
    </ScrollView>    
    </View>
    )
}

const styles = StyleSheet.create({
    TopNav: {
        backgroundColor: '#14191f',
        width: '100%',
        paddingTop: 50,
    },
    ImgeTop: {
        height: 350,
    },
    ViewImg: {
        flex: 1,
    },
    ViewText: {
        flex: 1,
    },
    ViewTitleRow: {
        height: 200,
    },
    ViewDescription: {
        flex: 1,
        padding: 5,
        margin: 0
    },
    TextDescriptiom: {
        margin: 1
    },
    BotoonBottom: {
        marginTop: 10,
        height: 100,
        marginBottom: 50
    },
    textPrice: {
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    Price: {
        flex: 1,
        alignContent: 'center',
    },
    container: {
        minHeight: 256,
        padding: 16,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 256,
        padding: 16,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ScrollSlider: {
        height: '28%',
        paddingTop: 1
    },
    imgSlider: {
        width: 100,
        height: 150,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderStyle: 'dashed',
        borderWidth: 1
    },
    globalInage: {
        height: '72%',
    },
})