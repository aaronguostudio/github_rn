import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {POPULAR_TABS, GITHUB, STYLES} from '../config/constants';
import actions from '../store/action';
import PopularItem from '../components/PopularItem';
import NavigationBar from '../components/NavigationBar';
import {layout, getMargins, sizes} from '../styles/app';
import {THEMES} from '../config/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();
const DEFAULT_PAGE_SIZE = 10;

const PopularTab = ({route}) => {
  const storeName = route.name;
  const theme = useSelector(state => state.theme.theme);
  const popular = useSelector(state => state.popular[storeName]) || {
    items: [],
    isLoading: false,
    projectModels: [],
    hideLoadingMore: true,
  };
  const dispatch = useDispatch();
  const url = `${GITHUB.repos}${storeName}${GITHUB.queryStr}`;
  const toastRef = useRef(null);
  const [canLoadMore, setCanLoadMore] = useState(false);

  useEffect(() => {
    dispatch(actions.onLoadPopularData(storeName, url, DEFAULT_PAGE_SIZE));
  }, [dispatch, url, storeName]);

  const renderItem = data => {
    const item = data.item;
    return <PopularItem item={item} onSelect={() => {}} />;
  };

  const getFooter = () => {
    if (popular.hideLoadingMore) {
      return null;
    }

    return (
      <View style={layout.rowCenterCenter}>
        <ActivityIndicator
          style={{
            color: THEMES[theme].primary,
            ...getMargins(STYLES.margins.ma, STYLES.sizes.lg),
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={popular.projectModels}
        renderItem={renderItem}
        keyExtractor={item => '' + item.id}
        refreshControl={
          <RefreshControl
            title="Loading"
            titleColor={THEMES[theme].primary}
            colors={[THEMES[theme].primary]}
            refreshing={popular.isLoading}
            onRefresh={() => {
              dispatch(
                actions.onLoadPopularData(storeName, url, DEFAULT_PAGE_SIZE),
              );
            }}
          />
        }
        ListFooterComponent={getFooter}
        onEndReached={() => {
          setTimeout(() => {
            if (canLoadMore) {
              setCanLoadMore(false);
              dispatch(
                actions.onLoadMorePopular(
                  storeName,
                  ++popular.pageIndex,
                  DEFAULT_PAGE_SIZE,
                  popular.items,
                  () => {
                    toastRef.current.show('no more');
                  },
                ),
              );
            }
          }, 100);
        }}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          setCanLoadMore(true);
        }}
      />
      <Toast ref={toastRef} position={'center'} />
    </View>
  );
};

export default ({route}) => {
  const theme = useSelector(state => state.theme.theme);

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
          <Ionicons name={'star-outline'} size={sizes.xl} color={'white'} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <NavigationBar
        title={'Popular'}
        leftButton={getLeftButton()}
        rightButton={getRightButton()}
      />
      <Tab.Navigator
        initialRouteName={POPULAR_TABS[0]}
        screenOptions={{
          tabBarIndicatorStyle: {backgroundColor: THEMES[theme].primary},
          tabBarItemStyle: {width: 'auto'},
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {textTransform: 'none'},
          tabBarStyle: {backgroundColor: 'white'},
        }}>
        {POPULAR_TABS.map(tab => (
          <Tab.Screen name={tab} component={PopularTab} key={tab} />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: sizes.sm,
  },
});
