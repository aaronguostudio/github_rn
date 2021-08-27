import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getMargins, layout, sizes, separater} from '../styles/app';
import {MY_MENUS, STYLES} from '../config/constants';

export default () => {
  const getRightButton = () => {
    return (
      <TouchableOpacity>
        <Ionicons name={'star-outline'} size={sizes.xl} color={'white'} />
      </TouchableOpacity>
    );
  };

  const getLeftButton = callback => {
    return (
      <TouchableOpacity onPress={callback}>
        <View>
          <Ionicons
            name={'chevron-back-outline'}
            size={sizes.xl}
            color={'white'}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const onSelect = menu => {
    console.log('> ', menu);
  };

  const getSettingItem = ({menu, callback, expandable}) => {
    return (
      <TouchableOpacity
        onPress={callback}
        style={[layout.rowBetweenCenter, styles.settingItemContainer]}>
        <View style={layout.rowCenterCenter}>
          {menu && menu.icon ? (
            <Ionicons
              name={menu.icon}
              size={sizes.xl}
              style={getMargins(STYLES.margins.mr, STYLES.sizes.md)}
            />
          ) : (
            <View
              style={{opacity: 1, width: 16, height: 16, marginRight: 10}}
            />
          )}
          <Text>{menu.name}</Text>
        </View>
        <Ionicons
          name={expandable ? 'chevron-down-outline' : 'chevron-forward-outline'}
          size={sizes.xl}
          style={{
            marginRight: 10,
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'Popular'}
        leftButton={getLeftButton()}
        rightButton={getRightButton()}
      />
      <ScrollView>
        <TouchableOpacity
          style={[styles.menuContainer, layout.rowBetweenCenter]}
          onPress={() => onSelect(MY_MENUS.about)}>
          <View style={styles.left}>
            <Ionicons
              name={MY_MENUS.about.icon}
              size={sizes.xl}
              style={getMargins(STYLES.margins.mr, STYLES.sizes.md)}
            />
            <Text>Popular Page</Text>
          </View>
          <Ionicons
            name={'chevron-forward-outline'}
            size={sizes.xl}
            style={{
              marginRight: 10,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
        <View style={separater} />
        {getSettingItem({menu: MY_MENUS.tutorial, callback: onSelect})}
        <View style={separater} />
        <Text style={styles.group}>Trending</Text>
        {getSettingItem({menu: MY_MENUS.tutorial, callback: onSelect})}
        <View style={separater} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    padding: sizes.md,
    height: 80,
    backgroundColor: 'white',
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  settingItemContainer: {
    backgroundColor: 'white',
    padding: sizes.md,
    height: 50,
  },
  group: {
    padding: sizes.md,
    paddingTop: sizes.xl,
    fontSize: sizes.md,
    backgroundColor: '#e8e8e8',
  },
});
