import React from 'react';
import { Text, Icon, TopNavigation, TopNavigationAction, Button, Spinner  } from '@ui-kitten/components';
import {  StyleSheet, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ursServer } from './jsonAPI/urlServer';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

const StarIcon = (style) => (
    <Icon {...style} name='arrowhead-right-outline'/>
);

const getPost = (navigation, id, title) => {
    navigation.navigate('Post', {id : id, title: title})
}

const ListNews = (props) => {
    return(
        <View style={styles.Body}>
                <View style={styles.BodyTitle}>
                <Text style={styles.text}> {props.posts.post_title} </Text>
                </View>
                <Button style={styles.Butns} appearance='ghost' status='danger' icon={StarIcon} onPress={() =>  getPost(props.navigation ,props.posts.ID, props.posts.post_title)}/>
            </View>
    )
}

export const News = ({ navigation }) => {
    const navigateBack = () => { 
        navigation.goBack();
    };
    const [listNews, setNews] = React.useState(null);
    React.useEffect(() => {
        let pushData = []
        axios.get(`${ursServer}/api/get-wp-post/${4}`).then((res) => {
            Object.values(res.data).map((el, index, arr) => {
                pushData.push(el)
                if(index === arr.length - 1) {
                    setNews(pushData)
                }
            })
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
        <Text category="h4" style={styles.title}> Новости </Text>
        <ScrollView  style={styles.scrolls}>
        <View style={styles.body}>

        {listNews ? listNews.map((posts, index) => {
           return  <ListNews posts={posts} key={index} navigation={navigation} />
        }) : <Spinner />}


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
    Body: {
        backgroundColor: 'rgb(22,29,39)',
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    BodyTitle: {
        flex: 4,
        
    },
    text: {
        fontSize: 20,
    },
    Butns: {
        flex: 1
    }

})