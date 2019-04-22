import React,{Component} from 'react'
import {View,Text} from 'react-native'
import Icon from "react-native-vector-icons/EvilIcons";
import {connect} from 'react-redux';
import Style from '../style/Styles';

class NotificationButton extends Component
{
  render(){
    return(
      <View>
      <Icon size={36} color={"white"} name="cart" style={Style.rightlastIcon}>
      </Icon>
      {this.props.totalcount>0?
      <View style={{alignItems: "center",
      justifyContent: "center",
      backgroundColor: "green",
      position: "absolute",
      top: 0,
      marginRight: 0,
      width: 18,
      height: 18,
      borderRadius: 9}}>
      <Text style={{fontSize: 13,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center"
        }}>{this.props.totalcount}
    </Text>
      </View>:null }
    </View>
    )
  }
}
const mapStateToProps=(state)=>({
  totalcount:state.cart.cartTotalCount,
})

export default connect(mapStateToProps,null)(NotificationButton);
                  