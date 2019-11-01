import React from "react";
import { Button, View } from "react-native";

import AssignmentList from '../components/assignmentList'

class AssignmentScreen extends React.Component {
    static navigationOptions = {
        title: 'Assignments',
        headerStyle: {
            backgroundColor: 'black'
        },
        headerTitleStyle: {
            color: 'white',
        },headerTintColor:'white'
      };
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <AssignmentList navigation={this.props.navigation}/>
            </View>
        )
    }
}

export default AssignmentScreen;