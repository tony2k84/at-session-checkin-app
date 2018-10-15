import React from 'react';
import { Image, Text, View, StatusBar, StyleSheet } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import ScanTicketScreen from './src/screens/ScanTicketScreen';
import { Font, AppLoading, Asset, Permissions } from 'expo';
import LoginScreen from './src/screens/LoginScreen';

var g = require('./src/global-styles');

const RootStack = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  ScanTicket: { screen: ScanTicketScreen },
}, {
    headerMode: 'none',
    initialRouteName: 'LoginScreen'
  });

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      hasCameraPermission: false,
    }
  }

  async _loadAssetsAsync() {

    console.log('loading assets');

    const imageAssets = cacheImages([
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      require('./assets/qr-code.png'),
    ]);

    const fontAssets = cacheFonts([
      {'open-sans': require('./assets/OpenSans-Regular.ttf')},
      {'open-sans-bold': require('./assets/OpenSans-Bold.ttf')},
    ]);
    const permissions = Permissions.askAsync(Permissions.CAMERA);

    await Promise.all([...imageAssets, ...fontAssets, ...permissions]);
  }

  render() {
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={g.statusbar}>
          <StatusBar/>
        </View>
        <RootStack />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});