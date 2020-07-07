import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'; 
import {
    Icon,
    Text
} from '@ui-kitten/components';
import { ursServer } from '../jsonAPI/urlServer';
import axios from 'axios';

export const Headers = props => {
    const [avatar, setAvatar] = React.useState(null);
    axios.get(`${ursServer}/api/users/${props.user.ID}`).then(res => {
        if(res.data) {
            setAvatar(res.data[0].avatar_uri);
        }
    })

    return (
        <View style={styles.headers}>
            <View style={styles.avatar}>
                {
                    avatar ? 
                <Image style={styles.avatarImage} source={{uri: `${ursServer}/${avatar}`}} />
                    :
                <Image style={styles.avatarImage} source={require('../../assets/images/avatar.jpg')} />
                }               
            </View>
            <View style={styles.headersContent}>
                <Text category="h5"> {props.user.user_login} </Text>
                <Text style={styles.displayName}> {props.user.display_name} </Text>
            </View>

            {
                props.screen != "profile" ||
                    (<TouchableHighlight onPress={() => props.navigation.navigate('Settings')} style={styles.IconSetting}>
                        <Icon
                            name='settings'
                            width={40}
                            height={40}
                            fill='white'
                        />
                    </TouchableHighlight>)
            }
        
        </View>
    );
}


const styles = StyleSheet.create({
    headers: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    avatarImage: {
        width: 85,
        height: 85,
        borderRadius: 100,
    },
    displayName: {
        paddingLeft: 3
    },
    headersContent: {
        flex: 3,
        paddingLeft: 25,
        justifyContent: 'center',
    },
    avatar: {
        flex: 1,
        paddingLeft: 15,
        height: 70
    },
    IconSetting: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    RangImage: {
        width: 30,
        height: 40,
    },
    Rank: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        padding: 5
    },
    Reiting: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    ReitingTitle: {
        width: '90%',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: '#333336',
        borderRadius: 10,
        margin: 10
    },
    RankTitle: {
        width: '90%',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: '#e1b641',
        borderRadius: 10,
        margin: 10
    }
});
