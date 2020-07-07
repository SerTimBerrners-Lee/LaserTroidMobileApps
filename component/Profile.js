import React from 'react';
import { 
  	Text,
  	Spinner
			} from '@ui-kitten/components';
import { StyleSheet, View, ScrollView, Image, TouchableHighlight } from 'react-native'; 
import { getUser } from './getObjectUser';
import { Linking } from 'expo';
import { RangsObject } from './jsonAPI/RangObject';
import { ursServer } from './jsonAPI/urlServer';
import axios from 'axios';
import { Inform } from './ProfileComponent/Inform';
import { Headers } from './ProfileComponent/Headers';

const openLink = (url) => {
	Linking.openURL(url)
}

export const Profile = ({ navigation }) => {
	const [user, setUser] = React.useState(false);
	const [content, setContent] = React.useState(null)
	const [Rang, setRang] = React.useState(null)
	const [tails, setTails] = React.useState(null);
	const [raiting, setRaiting] = React.useState({});

	React.useEffect(() => {
		let res = axios.get(`${ursServer}/api/get-statistic-raiting/user-raiting`);
		res.then((e) => {
			setRaiting(e.data);
		})
	}, [])

	if(!user) {
		getUser().then((el) => {
			Object.values(RangsObject).map(rang => {
				if(rang.Experience <= el.glasses - 1) {
					setRang(rang)
				}
			});

			Object.values(raiting).reverse().map((element, index) => {
				if(el.user_login == element.user_login) {
					setTails(index++)
				}
					
			});

			setUser(el);
			setContent(true);
		
		}).catch((err) => {
			console.log(err)
		})
	}

	return (
		<ScrollView vertical style={styles.globLauoyt}>
			{content ? 
			<>
				<Headers user={user} navigation={navigation} screen="profile" />
				<Rank navigation={navigation} rang={Rang} user={user.glasses} />
				<Reiting navigation={navigation} user={user.user_login} id={user.ID} glasses={user.glasses} tails={tails} />
				<Inform screen="profile" user={user} navigation={navigation} />
			</> :
			<Spinner />
			}
		</ScrollView> 
	)
}

const Rank = (props) => {
	let navigate = () => {
		props.navigation.navigate('Rangs', {glasses: props.user})
	}
	return (
		<TouchableHighlight onPress={() => navigate()}>
			<View style={styles.Rank}>
				<Text style={styles.RankTitle}> ЗВАНИЕ </Text>
			</View>
		</TouchableHighlight>
	);
}

const Reiting = (props) => {
	let navigate = () => {
		props.navigation.navigate('Reiting', { user: props.user, glasses: props.glasses, id: props.id})
	}
	return (
		<TouchableHighlight onPress={() => navigate()}>
			<View style={styles.Reiting}>
		<Text style={styles.ReitingTitle}> Рейтинг среди игроков: {props.tails} </Text>
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	globLauoyt: {
		padding: 10
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
