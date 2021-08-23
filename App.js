import React from 'react';
import {useSelector, Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WelcomePage from './js/page/WelcomePage';
import FavoritePage from './js/page/FavoritePage';
import PopularPage from './js/page/PopularPage';
import TrendingPage from './js/page/TrendingPage';
import MyPage from './js/page/MyPage';
import {ROUTES} from './js/config/constants';
import {THEMES} from './js/config/themes';
import store from './js/store';

const WelcomeStack = createNativeStackNavigator();

const WelcomeStackScreen = () => {
  return (
    <WelcomeStack.Navigator initialRouteName="Welcome">
      <WelcomeStack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{header: () => null}}
      />
      <WelcomeStack.Screen
        name="Home"
        component={HomeTabScreen}
        options={{header: () => null}}
      />
    </WelcomeStack.Navigator>
  );
};

const HomeTab = createBottomTabNavigator();

const HomeTabScreen = () => {
  const theme = useSelector(state => state.theme.theme);

  const getTabBarIcon = ({focused, color, size}, route) => {
    let iconName;
    if (route.name === ROUTES.popular) {
      iconName = focused ? 'flame' : 'flame-outline';
    } else if (route.name === ROUTES.trending) {
      iconName = focused ? 'bar-chart' : 'bar-chart-outline';
    } else if (route.name === ROUTES.favorite) {
      iconName = focused ? 'star' : 'star-outline';
    } else if (route.name === ROUTES.my) {
      iconName = focused ? 'person-circle' : 'person-circle-outline';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <HomeTab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: 'white'},
        tabBarIcon: ({focused, color, size}) =>
          getTabBarIcon({focused, color, size}, route),
        tabBarActiveTintColor: THEMES[theme].primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <HomeTab.Screen name={ROUTES.popular} component={PopularPage} />
      <HomeTab.Screen name={ROUTES.trending} component={TrendingPage} />
      <HomeTab.Screen name={ROUTES.favorite} component={FavoritePage} />
      <HomeTab.Screen name={ROUTES.my} component={MyPage} />
    </HomeTab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={THEMES.blueLight}>
          <WelcomeStackScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
