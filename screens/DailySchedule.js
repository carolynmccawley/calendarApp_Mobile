import React from 'react';
import { StyleSheet, Text, View, Button,Switch } from 'react-native';
import ScheduleList from '../components/ScheduleList'

class DailySchedule extends React.Component {
    static navigationOptions = ({ navigation })=> ({
        title: (navigation.state.params.day.month).toString() + "-" + (navigation.state.params.day.day).toString() + " Schedule",
        headerStyle: {backgroundColor:'black'},
        headerTitleStyle: {color:'white'},
        headerTintColor: 'white'
    });
    constructor(props){
        super(props);
    }
    render() {
      console.log("today is: ", this.props.navigation.state.params.day)
      return (
        <View >
            <ScheduleList navigation={this.props.navigation}
            />
        </View>
      )
    }
  }

  export default DailySchedule;