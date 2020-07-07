import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SignComponent } from './sign.component';
import { DetailsScreen } from './details.component';
import { Registration } from './registration';
import { Profile } from './Profile';
import { BattleSchedule } from './battleSchedule'; 
import { Shop } from './Shop';
import { HomePage } from './HomePage1';
import { Producte } from './product';
import { Cart } from './cart';
import { Batl } from './batl';
import { QRcode } from './qrcode';
import { Settings } from './Settings';
import { Weaponser } from './Weaponser';
import { Rangs } from './Rangs';
import { News } from './new';
import { Post } from './Post'; 
import { Poezdki } from './poezdki';
import { Turnir } from './turnir';
import { Reiting } from './Reiting';
import { profileGaimer } from './profileGaimer';

const HomeNavigator = createStackNavigator({
  Home: HomePage, 
  Details: DetailsScreen,
  Registration: Registration,
  Profile: Profile,
  BattleSchedule: BattleSchedule,
  Shop: Shop,
  Sign: SignComponent,
  Producte: Producte,
  Cart: Cart,
  Batl: Batl,
  QRcode: QRcode,
  Settings: Settings,
  Weaponser: Weaponser,
  Rangs: Rangs,
  News: News,
  Post: Post,
  Poezdki: Poezdki,
  Turnir: Turnir,
  Reiting: Reiting,
  profileGaimer: profileGaimer
}, {
  headerMode: 'none',
});

export const AppNavigator = createAppContainer(HomeNavigator);