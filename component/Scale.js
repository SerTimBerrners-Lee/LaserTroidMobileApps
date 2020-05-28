import React from 'react';
import { StyleSheet, View, ScrollView, Image} from 'react-native';
import {
  Text,
  Icon,
  Spinner
} from '@ui-kitten/components';
import axios from 'axios';
import { Linking } from 'expo';
import { ursServer } from './jsonAPI/urlServer';

const openLink = (url) => {
	Linking.openURL(url)
}

export const Scale = () => {
    const [content, setContent] = React.useState(null)
    React.useEffect(() => {
        axios.get(`${ursServer}/api/get-post/scale/`)
        .then((res) => {
            setContent(res.data[0])
        }).catch((err) => {
            console.log()
        })
    }, [])
    return (
        <ScrollView style={styles.LayoutsScale}>
            {content ? <Image style={styles.scaleIMG} source={{uri: `${ursServer+content.img}`}} /> 
            : <Text> </Text>}
    <Text category="h4" style={styles.titles}> {content ? content.title : 'Load...'} </Text>
        <View style={styles.viewsText}>
                { content ? <Text style={styles.textsContent}> {content.text} </Text> : <Spinner />  }
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    LayoutsScale: {
        flex: 1
    },
    viewsText: {
        padding: 12
    },
    textsContent: {
        fontSize: 17,
        color: '#dee0df',
        margin: 2
    },
    textsContents: {
        fontSize: 17,
        color: '#dee0df',
        margin: 2,
        fontWeight: 'bold'
    },
    titles: {
        textAlign: 'center',
        marginTop: 10,
    },
    scaleIMG: {
        width: '100%',
        height: 250
    }

})