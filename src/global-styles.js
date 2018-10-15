'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

    statusbar: {
        backgroundColor: '#FFFFF3',
        height: 30,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFF3',
    },
    header: {
        flexDirection: 'row',
        padding: 10,
    },
    content: {
        flex: 1,
    },
    footer:{
        flexDirection: 'row',
        paddingVertical: 10,
    },
    underline: {
        height: 5,
        borderRadius: 5,
        backgroundColor: '#00009F',
    },
    icon: {
        fontSize: 30,
    },
    inputIcon: {
        fontSize:22,
    },
    largeicon: {
        fontSize: 40,
    },
    h1: {
        fontSize: 20,
    },
    h2: {
        fontSize: 18,
    },
    h3: {
        fontSize: 16,
    },
    text: {
        fontSize: 14,
    },
    normal: {
        fontFamily: 'open-sans',
    },
    bold: {
        fontFamily: 'open-sans-bold',
    },
    whitecolor: {
        color: '#FFFFFF',
    },
    blackcolor: {
        color: '#4C5C68',
    },
    greycolor: {
        color: '#C1C1C1',
    },
    bluecolor: {
        color: '#00009F',
    },
    redcolor: {
        color: '#9F0000',
    },  
    bluebackground: {
        backgroundColor: '#00009F',
    },
    greybackground: {
        backgroundColor: '#C1C1C1',
    },
    lightgreybackground: {
        backgroundColor: '#F5F5F5',
    },
    flex1: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    justifyCenter:{
        justifyContent: 'center',
    },
    alignCenter: {
        alignItems: 'center',
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    button:{
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        shadowOffset:{  width: 3,  height: 3,  },
        shadowColor: '#4C5C68',
        shadowOpacity: 0.3,
    },
    input: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        marginBottom: 25,
        paddingHorizontal: 10,
    },

    inputText: {
        fontFamily: 'open-sans',
        fontSize: 16,
        flex: 1,
    }

});