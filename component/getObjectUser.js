import * as SQLite from 'expo-sqlite';
import axios from 'axios';
import { ursServer } from './jsonAPI/urlServer'

const db = SQLite.openDatabase("U.db");
// db.transaction(tx => {
// 	tx.executeSql(`delete from users`, [], (_) => { })
// })	
export const getUser = () => {
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql("select * from users", [], (_, { rows }) => {
				if(rows.length < 1) return reject()
				for (const iterator of Object.values(rows)) {
					axios.get(`${ursServer}/api/users/${iterator[0].url}`).then((res) => {
						resolve(res.data[0])
					}).catch((err) => {
						reject(err)
					})
					break;
				} 
			}, err => {
				reject(err)
			})
		}) 
	})
}

export const ExitUser = (navigation) => {
	db.transaction(tx => {
		tx.executeSql(`delete from users`, [], (err) => {
			return navigation.navigate('Sign')
		})
	})	
}


