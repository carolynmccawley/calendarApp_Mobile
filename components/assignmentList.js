import React from 'react';
import { FlatList, StyleSheet, View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-datepicker'
import AssignmentItem from './assignmentItem' 

import store from '../store'
import actions from '../actions'



const styles = StyleSheet.create({
    inputField: {
        flexGrow:2,
        height:30,
        fontSize: 20,
        color:'black',
        marginBottom:2,
        marginTop:2,
        paddingLeft:20
        
    },
    addButton: {
        marginBottom:15,
        flexGrow:1
    },
    archiveBtn:{
        flexDirection:'row',
        alignSelf:'flex-end',
        marginBottom:-10
    }
})

class AssignmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            class:'',
            dueDate:'',
            assignments: [], 
            completeAssignments: [],
            completeStatus:''
        }

        this.onBoundButtonPress = this.onButtonPress.bind(this)
    }

    onTitleChange(text) {
        this.setState({ title: text })
    }
    onClassChange(text) {
        this.setState({ class: text })
    }    
    onDueDateChange(text) {
        this.setState({ dueDate: text })
    }
    
    handleDelete(itemDelTitle){
      this.props.store.dispatch(actions.DELETE_ASSIGNMENT,{value: itemDelTitle})
      
    }

    onButtonPress() {
        const assignments = this.state.assignments.slice(0)
        //items.push(this.state.title)
        const newAssignment = {
            title: this.state.title,
            class: this.state.class,
            dueDate: this.state.dueDate,
            completeStatus:false
        }
        assignments.push(newAssignment);
        this.setState({ title: '', class: '', dueDate:'', completeStatus:'', assignments: assignments })
        this.props.store.dispatch(actions.ADD_ASSIGNMENT, {title: this.state.title, class: this.state.class, dueDate: this.state.dueDate})
    }

    render() {
        return (
            <View>
                <View style={styles.archiveBtn}>
                    <Button
                        color='red'
                        title="view archives"
                        onPress ={()=> {
                            this.props.navigation.navigate('AssignmentsArchive')
                                //completeAssignments:this.state.completeAssignments
                            //})
                        }}
                    />
                </View>


                <View>
                  <TextInput
                    value={this.state.title}
                    style={styles.inputField}
                    onChangeText={this.onTitleChange.bind(this)}
                    placeholder="title"
                  />
                  <TextInput
                    value={this.state.class}
                    style={styles.inputField}
                    onChangeText={this.onClassChange.bind(this)}
                    placeholder="class"
                  />
                <View style={{alignSelf:'center'}}>
                    <DatePicker
                        date={this.state.dueDate}
                        format="YYYY-MM-DD"
                        mode="date"
                        placeholder="select date"
                        confirmBtnText="Done"
                        cancelBtnText="Cancel"
                        onDateChange={this.onDueDateChange.bind(this)}
                    />
                </View>
                </View>

                <View style={styles.addButton}> 
                    <Button
                        onPress={this.onBoundButtonPress}
                        title="ADD"
                        disabled={this.state.title === ''}
                        color='red'
                    />
                </View>


                <FlatList
                        data={this.props.store.state.assignments.filter(item => item.completeStatus == false)}
                        renderItem = {(props) => <AssignmentItem handleDelete={this.handleDelete.bind(this)} navigation={this.props.navigation} key ={props.item.title} title={props.item.title} dueDate={props.item.dueDate} class={props.item.class} completeStatus={props.item.completeStatus} />}
                        keyExtractor = {item => item.title}
                    />
            </View>

        )
    }    
}
AssignmentList = store.connect(AssignmentList)
export default AssignmentList;