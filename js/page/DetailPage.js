import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import {getMargins, layout, sizes} from '../styles/app';
import {GITHUB_SITE, STYLES} from '../config/constants';

export default ({route, navigation}) => {
  const {projectModel} = route.params;
  console.log('>>> params', route.params, projectModel);
  const projectUrl =
    projectModel.html_url || `${GITHUB_SITE}/${projectModel.fullName}`;
  console.log('>>> projectUrl', projectUrl);
  const title = projectModel.full_name || projectModel.fullName;
  console.log('>>> title', title);
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [url, setUrl] = useState();

  const getRightButton = () => {
    return (
      <View style={layout.rowCenterCenter}>
        <TouchableOpacity>
          <Ionicons name={'star-outline'} size={sizes.xl} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...getMargins(STYLES.margins.ml, STYLES.sizes.md),
            width: 40,
          }}>
          <Ionicons
            name={'share-social-outline'}
            size={sizes.xl}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
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

  const onBack = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
    } else {
      // go back
      navigation.goBack();
    }
  };

  const onNavigationStateChange = navState => {
    setCanGoBack(navState.canGoBack);
    setUrl(navState.url);
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        title={title}
        leftButton={getLeftButton(onBack)}
        rightButton={getRightButton()}
      />
      <WebView
        ref={webViewRef}
        startInLoadingState={true}
        onNavigationStateChange={onNavigationStateChange}
        source={{uri: projectUrl}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
