import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground } from 'react-native';
import Base from "../pages/home/Base";
import {
    ResFontSizes
} from "../ui/index";
import { Constants } from '../service/Constants';

export default class MainScreen extends Base {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View style={styles.main}>
                <TouchableOpacity onPress={() => this.moveToLogin()} style={styles.view1}>
                    <ImageBackground
                        source={{ uri: Constants.IMAGEBASE + '/grocery.png' }}
                        style={styles.viewItem}>
                        <Text style={styles.text}>Grocery</Text>
                    </ImageBackground>
                    <ImageBackground
                        source={{ uri: Constants.IMAGEBASE + '/fashion.png' }}
                        style={styles.viewItem}>
                        <Text style={styles.text}>Fashion</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.moveToLogin()} style={styles.view2}>
                    <ImageBackground
                        source={{ uri: Constants.IMAGEBASE + '/health.png' }}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={styles.text}>Healthcare</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.moveToLogin()} style={styles.view1}>
                    <ImageBackground
                        source={{ uri: Constants.IMAGEBASE + '/super_market.png' }}
                        style={styles.viewItem}>

                        <Text style={styles.text}>Supermarket</Text>
                    </ImageBackground>
                    <ImageBackground
                        source={{ uri: Constants.IMAGEBASE + '/electronics.png' }}
                        style={styles.viewItem}>
                        <Text style={styles.text}>Electronics</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    view1: {
        flex: 3.5,
        flexDirection: "row",
    },
    view2: {
        flex: 3,
        flexDirection: "row"
    },
    viewItem: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: "white",
        fontSize: ResFontSizes(3),
        fontWeight: "700",
        textAlign: "center",
        fontFamily: "Montserrat-Regular"
    }
});

