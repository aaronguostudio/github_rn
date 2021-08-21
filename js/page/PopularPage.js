import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {POPULAR_TABS, GITHUB, STYLES} from '../../config/constants';
import actions from '../store/action';
import PopularItem from '../components/PopularItem';
import Toast from 'react-native-easy-toast';
import {layout, getMargins} from '../styles/app';

const Tab = createMaterialTopTabNavigator();
const DEFAULT_PAGE_SIZE = 10;

const PopularTab = ({route}) => {
  console.log('>>>>>> route', route.name);
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
            color: theme,
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
            titleColor={theme}
            colors={[theme]}
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
        <Tab.Screen name={tab} component={PopularTab} key={tab} />
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
