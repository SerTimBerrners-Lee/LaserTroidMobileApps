import React from 'react';
import { Text, Icon, TopNavigation, TopNavigationAction, Divider, Spinner  } from '@ui-kitten/components';
import {  StyleSheet, ScrollView, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ursServer } from './jsonAPI/urlServer';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

const ImgContainer = (props) => (
    <View style={styles.contaoner}>
        <Image style={styles.images} source={{uri: `${ursServer}${props.img}`}}/>
    </View>
)

const ContentMap = (props) => {
    return (
    <View style={styles.component}>
        <Text category='h5' style={styles.text}>  { props.article.title}  </Text>
        <Text style={styles.textContent}> {props.article.text} </Text>
        {props.article.image ? props.article.image.map((el, index) => {
            return (
                    <ImgContainer img={el} key={index}/>
                )
        })
    :
    <Text></Text> 
    }
        <Divider style={styles.divider} />
    </View>)
}

export const Turnir = ({ navigation }) => {
    const navigateBack = () => { 
        navigation.goBack();
    };

    const [article, setArticle] = React.useState(null)
    React.useEffect(() => {
        axios.get(`${ursServer}/api/get/restore-sectionturnir`)
        .then((res) => {
            let data = JSON.parse(res.data.articles)
            setArticle(data)
        })
    }, [])


    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    return (
        <LinearGradient  
        colors={['#14191f', '#14191f', '#14191f', '#11466e']} 
        style={styles.Linear} >
        <TopNavigation  style={ styles.TopNav}  title='На главную'  leftControl={BackAction()}/>
        <Text category="h4" style={styles.title}> Турнир </Text>
        <ScrollView  style={styles.scrolls}>
        <View style={styles.body}>
            {article ? <ContentMap article={article} /> : <Spinner />}
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
    },
    images: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        marginTop: 10, 
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
    },
    textContent: {
        fontSize: 18,
        lineHeight: 23
    },
    component: {
        padding: 3
    }

})