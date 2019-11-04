import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';


import ProjetosScreen from './pages/projetos';
import ProfileScreen from './pages/profile';
import LoginScreen from './pages/login';

const AuthStack = createStackNavigator({
  Sign: {screen: LoginScreen}
})

const MainNavigator = createBottomTabNavigator({
    Projetos: {
      screen: ProjetosScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName:'Projetos',
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      inactiveBackgroundColor: '#eeeeee',
      activeBackgroundColor: '#dddddd',
    }
  }
  
);

// export default createAppContainer(MainNavigator);

export default createAppContainer(
  createSwitchNavigator(
    {
      MainNavigator,
      AuthStack
    },{
      initialRouteName : 'AuthStack',
    },
  )
);
