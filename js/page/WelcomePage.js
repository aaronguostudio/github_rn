import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default ({navigation}) => {
  // constructor(props) {
  //   super(props);
  // }

  // componentDidMount() {
  //   this.timer = setTimeout(() => {
  //     console.log('>>', this.props);
  //   }, 2000);
  // }

  // componentWillUnmount() {
  //   this.timer && clearTimeout(this.timer);
  // }

  useEffect(() => {
    const timerAction = () => navigation.navigate('Home');
    const timer = setTimeout(timerAction, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Welcome Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
