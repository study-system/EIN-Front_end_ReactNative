import {Navigation} from 'react-native-navigation';

import detail from './detail';

export function registerScreens() {
  Navigation.registerComponent('studysytem.detail', () => detail);
}
