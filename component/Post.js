import React from 'react';
import { Text, Icon, TopNavigation, TopNavigationAction, Spinner, Divider  } from '@ui-kitten/components';
import {  StyleSheet, ScrollView, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ursServer } from './jsonAPI/urlServer';


const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

export const Post = (props) => {
    let title = props.navigation.getParam('title')
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
      );
    const navigateBack = () => { 
        props.navigation.goBack();
    };

    const [content, setContent] = React.useState(null)
    const [photo, setPhoto] = React.useState(null)

    React.useEffect(() => {
        let id = props.navigation.getParam('id');

        axios.get(`${ursServer}/api/get-post-by/${id}`)
        .then((res) => {
            setContent(res.data)
            res.data.map(e => {
                setPhoto(e.photo)
            })
        })
    }, [])
    return (
        <LinearGradient  
        colors={['#14191f', '#14191f', '#14191f', '#11466e']} 
        style={styles.Linear} >
        <TopNavigation  style={ styles.TopNav}  title=''  leftControl={BackAction()}/>
        <Text category="h4" style={styles.title}> {title}  </Text>
        <ScrollView  style={styles.scrolls}>
            <View style={styles.blockText}>
            {content ? content.map((e, index) => {
                return <Text style={styles.texts}> {e.text} </Text>
            })      
             : <Spinner />}
            </View>
             {photo ? photo.map((e, index) => {
                 return <>
                 <Image style={styles.ImageLogo} key={index} source={{uri: `${e}`}} />
                 <Divider style={styles.divider}/>
                 </>
             }) : <Text> </Text>}
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
        padding: 10,
    }, 
    texts: {
        fontSize: 18,
        color: '#dee0df',
        lineHeight: 30
    },
    blockText: {
        padding: 5,
    },
    scrolls: {
        flex: 1
    },
    ImageLogo: {
        width: '100%',
        height: 260
    },
    divider: {
        margin: 10,
        height: 10,
        borderRadius: 10
    },
})