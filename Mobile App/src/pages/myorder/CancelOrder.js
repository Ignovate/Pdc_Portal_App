import React from "react";
import {
    View,
    ImageBackground,
    Image,
    Text
} from "react-native";
import Base from "../home/Base";
import { Constants } from "../../service/Constants";
import SInfo from "react-native-sensitive-info";
export default class CancelOrder extends Base {

    static navigationOptions = {
        header: null,
    }
    componentDidMount() {
        setTimeout(() => {
            SInfo.setItem("targetScreen", "true", {});
            this.moveToMyorder();
        }, 2000);
    }
    render() {
        return (
            <ImageBackground
                source={{ uri: Constants.IMAGEBASE + '/background.png' }}
                style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: "column", width: "80%", height: "50%", justifyContent: "center", alignItems: "center" }}>
                    <Image source={{ uri: Constants.IMAGEBASE + '/cancel.png' }} style={{ width: "30%", height: "30%" }} />
                    <Text style={{ marginTop: 20, fontFamily: "Montserrat-Regular", fontSize: 20, textAlign: "center", color: "#000" }}>Order has been Canceled</Text>
                    <Text style={{ marginTop: 20, fontFamily: "Montserrat-Regular", fontSize: 16, textAlign: "center", color: "#000" }}></Text>
                </View>
            </ImageBackground>
        );
    }

}