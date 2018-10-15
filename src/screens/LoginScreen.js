import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { Feather as Icon } from '@expo/vector-icons';

var g = require('../global-styles');

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'user1',
            password: 'user1',
            loginPending: false,
        }
    }

    login = () => {
        console.log('calling api..');
        this.setState({loginPending: true})
        fetch('https://at-checkin-app.herokuapp.com/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('api returned', response.token, response.error);
                if(response.token){
                    this.setState({ username: '', password: '', loginPending: false });
                    this.props.navigation.navigate('ScanTicket', { token: response.token });
                }else{
                    console.warn("Invalid credentials");
                    this.setState({ username: '', password: '', loginPending: false });
                }
            })
            .catch((err) => {
                console.log('fetch error', err);
                this.setState({ username: '', password: '', loginPending: false });
            });
    }

    render() {
        const {loginPending} = this.state;
        return (
            <View style={[g.container, { padding: 20 }]}>
                <View style={{ paddingTop: 50, alignSelf: 'flex-start' }}>
                    <Text style={[g.h1, g.bold, g.blackcolor]}>Session Check-In</Text>
                    <View style={g.underline}>&nbsp;</View>
                </View>
                <KeyboardAvoidingView style={[g.content, g.justifyCenter]} behavior="padding" enabled>
                    <View style={g.input}>
                        <Icon name="user" style={[g.inputIcon, g.greycolor, { marginRight: 10 }]} />
                        <TextInput
                            name='username'
                            value={this.state.username}
                            autoCapitalize='none'
                            keyboardType='default'
                            style={g.inputText}
                            placeholder="johndoe"
                            onChangeText={(username) => this.setState({ username })}
                        />
                    </View>
                    <View style={g.input}>
                        <Icon name="lock" style={[g.inputIcon, g.greycolor, { marginRight: 10 }]} />
                        <TextInput
                            name='password'
                            value={this.state.password}
                            secureTextEntry
                            style={g.inputText}
                            placeholder="Password"
                            returnKeyType="done"
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                    <View style={[g.row, g.justifyBetween, { marginTop: 10}]}>
                       {
                            loginPending?
                            <React.Fragment>
                                <View style={[g.row, g.alignCenter]}>
                                    <ActivityIndicator size="small" color='#4392F1' />
                                    <Text style={[g.h3, g.greycolor, g.normal, {marginLeft: 5}]}>
                                        Please wait...
                                    </Text>
                                </View>
                                <View style={[{ width: 120 }, g.button, g.greybackground,]}>
                                    <Text style={[g.h3, g.bold, g.blackcolor]}>Login</Text>
                                </View>
                            </React.Fragment>:
                            <React.Fragment>
                                <View/>
                                <TouchableOpacity style={[{ width: 120 }, g.button, g.bluebackground,]}
                                    onPress={this.login}>
                                    <Text style={[g.h3, g.bold, g.whitecolor]}>Login</Text>
                                </TouchableOpacity>
                            </React.Fragment>
                        }
                        
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
