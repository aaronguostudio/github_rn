import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class TrendingPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Trending Page</Text>
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
