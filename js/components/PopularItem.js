import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Text, Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../config/constants';
import {THEMES} from '../config/themes';
import {
  rowBetweenCenter,
  sizes,
  fontSizes,
  getMargins,
  getSquare,
} from '../styles/app';

const PopularItem = ({item, onSelect}) => {
  const theme = useSelector(state => state.theme.theme);

  if (!item || !item.owner) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.container}>
        <Text style={styles.title}>{item.full_name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={rowBetweenCenter}>
          <View style={rowBetweenCenter}>
            <Image
              style={getSquare(4, {round: true})}
              source={{uri: item.owner.avatar_url}}
            />
            <Text style={getMargins(STYLES.margins.ml, STYLES.sizes.sx)}>
              Author
            </Text>
          </View>
          <TouchableOpacity style={rowBetweenCenter}>
            <Ionicons
              name={'star-outline'}
              size={sizes.lg}
              color={THEMES[theme].primary}
            />
            <Text style={getMargins(STYLES.margins.ml, STYLES.sizes.sx)}>
              {item.stargazers_count}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

PopularItem.propTypes = {
  item: PropTypes.shape().isRequired,
  onSelect: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: sizes.md,
    ...getMargins(STYLES.margins.mx, STYLES.sizes.md),
    marginVertical: sizes.sm,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: '#ddd',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: fontSizes.lg,
    marginBottom: sizes.sm,
    color: '#212121',
  },
  description: {
    fontSize: fontSizes.sm,
    marginBottom: sizes.sm,
    color: '#757575',
  },
});

export default PopularItem;
