import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo';

var g = require('../global-styles');

export default class ScanTicketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      state: 'SCAN',
      token: props.navigation.getParam('token'),
      name: '',
    }
    console.log(props.navigation.getParam('token'));
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log(this.state.token);
    this.setState({ state: 'PROCESSING' });
    console.log('calling api..');
    fetch("https://at-checkin-app.herokuapp.com/users/check-in", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.state.token
      },
      body: JSON.stringify({
        data
      }),
    })
    .then((response) => response.json())
    .then((response) => {
      console.log('api returned');
      if(response.name){
        this.setState({ state: 'PROCESSED_SUCCESS', name: response.name });
      }else{
        this.setState({ state: 'PROCESSED_FAILURE', error: 'Oops, looks like your ticket has some problems.' });
      }
    })
    .catch((err) => {
      console.log('fetch error', err);
      this.setState({ state: 'PROCESSED_FAILURE', error: 'Oops, looks like your ticket has some problems.' });
    });
  }

  scanAgain = () => {
    this.setState({ state: 'SCAN' });
  }

  logout = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { state, name, error } = this.state;

    return (
      <View style={g.container}>
        <View style={g.header}>
          <TouchableOpacity onPress={this.logout}>
            <Icon name="arrow-left" style={[g.icon, g.blackcolor]} />
          </TouchableOpacity>
        </View>
        <View style={[g.content]}>
          <View style={{ padding: 20 }}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={[g.h1, g.bold, g.blackcolor]}>Session Check-In</Text>
              <View style={g.underline}>&nbsp;</View>
            </View>
            {
              (state === 'SCAN') &&
              <View style={{ paddingTop: 20 }}>
                <Text style={[g.h3, g.normal, g.blackcolor]}>Check In by scanning a ticket...</Text>
              </View>
            }
            {
              (state === 'PROCESSING') &&
              <View style={[g.row, { paddingTop: 20 }]}>
                <ActivityIndicator size="small" color='#4392F1' />
                <Text style={[g.h3, g.normal, g.blackcolor, { marginLeft: 5 }]}>Please wait, validating your ticket...</Text>
              </View>
            }

            {
              (state === 'PROCESSED_FAILURE') &&
              <View style={{ paddingTop: 20, alignItems: 'flex-start' }}>
                <Text style={[g.h3, g.bold, g.redcolor]}>Can't Check-In</Text>
                <Text style={[g.h3, g.normal, g.blackcolor]}>{error}</Text>

                <TouchableOpacity style={[g.button, g.bluebackground, { marginTop: 20 }]}
                  onPress={this.scanAgain}>
                  <Text style={[g.h3, g.bold, g.whitecolor]}>Try Again</Text>
                </TouchableOpacity>
              </View>
            }

            {
              (state === 'PROCESSED_SUCCESS') &&
              <View style={{ paddingTop: 20 }}>
                <View style={[g.row, g.justifyBetween, g.alignCenter]}>
                  <Text style={[g.h2, g.normal, g.blackcolor]}>Become a FullStack Developer</Text>
                  <View style={[g.lightgreybackground, { padding: 5, borderRadius: 5 }]}>
                    <Text style={[g.text, g.bold, , g.bluecolor]}>Webinar</Text>
                  </View>
                </View>
                <Text style={[g.h3, g.normal, g.blackcolor]}>FullStack Modules</Text>
                <Text style={[g.text, g.normal, g.greycolor]}>Amanda Clark</Text>
                <Text style={[g.text, g.normal, g.greycolor]}>08:00 - 10:00</Text>
              </View>
            }
          </View>
          {
            (state === 'PROCESSED_SUCCESS') &&
            <React.Fragment>
              <View style={[g.alignCenter, g.flex1, { paddingTop: 10 }]}>
                <Image
                  style={{ flex: 1 }}
                  resizeMode='contain'
                  source={require('../../assets/qr-code.png')}
                />
              </View>

              <View style={[g.alignCenter, { padding: 20 }]}>
                <Icon name="check-circle" style={[g.largeicon, g.bluecolor]} />
                <Text style={[g.h1, g.bold, g.blackcolor]}>Welcome {name}!</Text>
                <Text style={[g.h3, g.normal, g.bluecolor]}>Enjoy the event</Text>
              </View>
            </React.Fragment>

          }
          {
            (state === 'SCAN') &&
            <BarCodeScanner
              onBarCodeScanned={this.handleBarCodeScanned}
              style={g.flex1}
            />
          }
        </View>
        {
          (state === 'PROCESSED_SUCCESS') &&
          <View style={[g.footer, g.justifyCenter, { paddingVertical: 20, paddingHorizontal: 20 }]}>
            <TouchableOpacity style={[g.button, g.bluebackground]}
              onPress={this.scanAgain}>
              <Text style={[g.h3, g.bold, g.whitecolor]}>New Check-In</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
