import React from 'react';
import PropTypes from 'prop-types';
import {
  StatusBar,
  Text,
  View,
  ViewPropTypes,
  StyleSheet,
  Platform,
} from 'react-native';

const NavigationBar = ({
  style,
  statusBarStyles,
  title,
  hide,
  titleView,
  leftButton,
  rightButton,
  titleLayoutStyle,
}) => {
  const statusBar = statusBarStyles.hidden ? null : (
    <View style={styles.statusBar}>
      <StatusBar {...statusBarStyles} />
    </View>
  );

  const titleComponent = titleView ? (
    titleView
  ) : (
    <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
      {title}
    </Text>
  );

  const content = hide ? null : (
    <View style={styles.navBar}>
      <View style={styles.navBarBtn}>{leftButton}</View>
      <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
        {titleComponent}
      </View>
      <View style={styles.navBarBtn}>{rightButton}</View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      {statusBar}
      {content}
    </View>
  );
};

NavigationBar.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
  titleView: PropTypes.element,
  titleLayoutStyle: ViewPropTypes.style,
  hide: PropTypes.bool,
  statusBarStyles: PropTypes.shape({
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hide: PropTypes.bool,
    backgroundColor: PropTypes.string,
  }),
  leftButton: PropTypes.element,
  rightButton: PropTypes.element,
};

NavigationBar.defaultProps = {
  statusBarStyles: {
    barStyle: 'light-content',
    hidden: false,
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196f3',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? 44 : 50,
  },
  navBarBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 0 : 20,
  },
});

export default NavigationBar;
