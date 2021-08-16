import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class PopularPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Popular Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// import React from 'react';
// import {StyleSheet, View, Text} from 'react-native';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// const Tab = createMaterialTopTabNavigator();

// const Tab1 = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Popular Tab 1</Text>
//     </View>
//   );
// };

// const Tab2 = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Popular Tab 2</Text>
//     </View>
//   );
// };

// export default () => {
//   return (
//     <Tab.Navigator initialRouteName="Tab1">
//       <Tab.Screen name="Tab1" component={Tab1} />
//       <Tab.Screen name="Tab2" component={Tab2} />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
