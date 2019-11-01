import React from "react";
import { Text, View, FlatList } from "react-native";

import AssignmentItem from '../components/assignmentItem'

import store from '../store'


class AssignmentsArchive extends React.Component {
    static navigationOptions = {
        title: 'Archives',
        headerStyle: {
            backgroundColor: 'black'
        },
        headerTitleStyle: {
            color: 'white',
        },headerTintColor:'white'
      };
    constructor(props){
        super(props)
    }

    render(){
        let completeAssignments;
        if (this.props.store.state.assignments){
            completeAssignments = <FlatList
                    data={this.props.store.state.assignments.filter(item => item.completeStatus == true)}
                    renderItem = {(props) => <AssignmentItem navigation={this.props.navigation} key ={props.item.title} title={props.item.title} class={props.item.class} dueDate={props.item.dueDate} completeStatus={props.item.completeStatus} />}
                    keyExtractor = {item => item.title}
            />
            
        } else {
            completeAssignments = null
        }
        // console.log("archives: ", completeAssignments)
        let msg;
        if (completeAssignments.props.data.length == 0){
            msg = <Text style={{alignSelf:'center',fontSize:20,color:'red'}}>you have completed zero assignments</Text>
        } else {msg = null}
        return(
            <View style={{padding:10}}>
                {msg}
                <View>
                    {completeAssignments}
                </View>
                
            </View>
        )
    }
}

AssignmentsArchive = store.connect(AssignmentsArchive)
export default AssignmentsArchive;