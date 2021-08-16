import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, Text, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {POPULAR_TABS, THEME} from '../../config/constants';
import actions from '../store/action';

const Tab = createMaterialTopTabNavigator();

const PopularTab = ({tab}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>{tab}</Text>
      <Button
        title="Change Blue"
        onPress={() => {
          dispatch(actions.onThemeChange(THEME.blue));
        }}
      />
      <Button
        title="Change Tomato"
        onPress={() => {
          dispatch(actions.onThemeChange(THEME.tomato));
        }}
      />
      <Button
        title="Change Black"
        onPress={() => {
          dispatch(actions.onThemeChange(THEME.black));
        }}
      />
    </View>
  );
};

export default () => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <Tab.Navigator
      initialRouteName={POPULAR_TABS[0]}
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: theme},
        tabBarItemStyle: {width: 'auto'},
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {textTransform: 'none'},
      }}>
      {POPULAR_TABS.map(tab => (
        <Tab.Screen name={tab} component={() => <PopularTab tab={tab} />} />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
