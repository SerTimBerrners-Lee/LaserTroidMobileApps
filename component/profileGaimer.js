import React from 'react';
import axios from 'axios';
import { Text, Icon, Button, TopNavigation, TopNavigationAction, Spinner } from '@ui-kitten/components';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ursServer } from './jsonAPI/urlServer';
import { Inform } from './ProfileComponent/Inform';  
import { Headers } from './ProfileComponent/Headers';

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

export const profileGaimer = ({ navigation }) => {
    const ID = navigation.getParam("id");
    const [user, setUser] = React.useState(null);
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );
    const navigateBack = () => {
        navigation.goBack();
    };

    React.useEffect(() => {
        axios.get(`${ursServer}/api/users/${ID}`)
        .then(user => {
            setUser(user.data[0]);
            console.log(user.data[0])
        })
    }, [])

    return (
        <LinearGradient
            colors={['#14191f', '#14191f', '#14191f', '#11466e']}
            style={styles.Linear} >
            <TopNavigation style={styles.TopNav} title='В профиль' leftControl={BackAction()} />
            <ScrollView style={styles.scrolls} key={1} nativeEvent={{ contentOffset: { y: 0 } }} onScroll={(scroll) => scrollMoment(scroll)}
                showsVerticalScrollIndicator={false}>
                {!user || 
                    <>
                        <View style={{ marginTop: 30 }}>
                        </View>
                        <Headers user={user}  />
                        <View style={{ marginTop: 30 }}>
                        </View>
                        <Inform user={user} />
                    </>
                 }
                
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
})