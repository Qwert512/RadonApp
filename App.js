import React from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class App extends React.Component {


  state = {
    status: 0,
    status_color: "#fff",
    message: ""
  }

  getStatus = () => {
    fetch("https://goldfisch.tk/status")
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          status: responseJson["status"],
          message: responseJson["message"]
        })

        if (this.state.status == 1) {
          this.setState({
            status_color: "#00ff00"
          })
        } else if (this.state.status == 2) {
          this.setState({
            status_color: "#ffff00"
          })
        } else if (this.state.status == 3) {
          this.setState({
            status_color: "#ff0000"
          })
        } else {
          this.setState({
            status_color: "#fff"
          })
        }

      })
      .catch((error) => {
        console.error(error)
        this.setState({
          status: 0,
          status_color: "#fff"
        })
      });
  }


  componentDidMount = () => {
    this.getStatus()
    setInterval(this.getStatus, 30000)
  } 

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={[styles.status,  {backgroundColor: this.state.status_color}]}></View>
          <View style={styles.message}>
            <Text>{this.state.message}</Text>
          </View>
        </View>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#646464"
  },
  status: {
    height: windowHeight * 0.15 ,
    width: windowWidth * 0.9,
    top: windowHeight * 0.325,
    borderRadius: 10
  },
  message: {
    height: windowHeight * 0.1 ,
    width: windowWidth,
    top: windowHeight,
    backgroundColor: "#0008ff"
  }


});
