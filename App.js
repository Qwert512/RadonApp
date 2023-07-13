import React from 'react';
import { StyleSheet, Text, View, StatusBar, Linking  } from 'react-native';
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
    //this.getStatus()
    //setInterval(this.getStatus, 30000)
  } 

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusbar}></View>
        <View style={styles.github}>
          <Text style={{flex: 1, textAlign: 'left', color: 'blue', fontSize: windowHeight * 0.04}}
            onPress={() => Linking.openURL('https://github.com/Onuphrius')}>Onuphrius 
          </Text>
          <Text style={{flex: 1, textAlign: 'right', color: 'blue', fontSize: windowHeight * 0.04}}
            onPress={() => Linking.openURL('https://github.com/Qwert512')}>Qwert512
          </Text>
        </View>
        <View style={styles.graph}></View>
        <View style={styles.time_button}></View>
        <View style={styles.status_button}></View>
        <View style={styles.text}></View>
        <View style={styles.guide}></View>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  statusbar: {
    height: StatusBar.currentHeight
  },
  github: {
    height: windowHeight * 0.05,
    flexDirection: 'row',
  },
  graph: {
    minHeight: windowWidth,
    backgroundColor: 'green'
  },
  time_button: {
    minHeight: windowHeight * 0.05,
    backgroundColor: 'red'
  },
  status_button: {
    minHeight: windowHeight * 0.175,
    backgroundColor: 'black'
  },
  text: {
    minHeight: windowHeight * 0.05,
    backgroundColor: 'yellow'
  },
  guide: {
    minHeight: windowHeight * 0.175,
    backgroundColor: 'brown'
  }

});
