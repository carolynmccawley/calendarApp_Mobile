import React from 'react';
import { FlatList, StyleSheet, View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-datepicker'
import ScheduleItem from './ScheduleItem' 


import store from '../store'
import actions from '../actions'


const styles = StyleSheet.create({
    inputField: {
        height:30,
        fontSize: 20,
        color:'black',
        marginBottom:4,
        marginTop:2,
        paddingLeft:20
        
    },
    addButton: {
        flex:1,
        flexDirection:'row'
    },
    datePicker: {
        flexDirection:'row',
        alignSelf:'center'
    }
})

class ScheduleList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title:'',
            calDay:'',
            calMonth: '',
            calYear:'',
            startTime:'',
            endTime: '',
            schedule: [],
            deleteStatus:''
        }

        this.onBoundButtonPress = this.onButtonPress.bind(this)
    }

    onTitleChange(text) {
        this.setState({ title: text })
    }
    onSetStart(text) {
        this.setState({ startTime: text })
    }    
    onSetEnd(text) {
        this.setState({ endTime: text })
    }
    
    handleDelete(itemDelTitle, itemDelYear, itemDelMonth, itemDelDay){
      this.props.store.dispatch(actions.DELETE_EVENT,{
          delTitle:itemDelTitle,
          delYear: itemDelYear,
          delMonth: itemDelMonth,
          delDay: itemDelDay
      })
      
    }

    onButtonPress() {
        // On button press, add the current value of the input field to the items array
        const schedule = this.state.schedule.slice(0)
        const newItem = {
            title: this.state.title,
            calDay: this.props.navigation.state.params.day.day,
            calMonth: this.props.navigation.state.params.day.month,
            calYear: this.props.navigation.state.params.day.year,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            deleteStatus:false
        }
        schedule.push(newItem);

        this.setState({ title: '', calDay: '', calMonth:'',calYear:'', startTime: '', endTime:'', deleteStatus:'', schedule: schedule })
        this.props.store.dispatch(actions.ADD_EVENT,{
            title: this.state.title, 
            calDay:this.props.navigation.state.params.day.day,
            calMonth: this.props.navigation.state.params.day.month,
            calYear: this.props.navigation.state.params.day.year,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        })
    }

    render() {
        return (
            <View>
                {/* View for text input */}
                <View>
                    <TextInput
                        value={this.state.title}
                        style={styles.inputField}
                        onChangeText={this.onTitleChange.bind(this)}
                        placeholder="title"
                    />
                  </View>

                  {/* datePickers */}
                  <View style={styles.datePicker}>
                        {/* start time */}
                        <DatePicker
                            date={this.state.startTime}
                            style={{marginRight:20}}
                            mode="time"
                            placeholder="start"
                            confirmBtnText="Done"
                            cancelBtnText="Cancel"
                            onDateChange={this.onSetStart.bind(this)}
                        />
                        {/* end time */}
                        <DatePicker
                            date={this.state.endTime}
                            is24Hour={true}
                            //format="YYYY-MM-DD"
                            mode="time"
                            placeholder="end"
                            confirmBtnText="Done"
                            cancelBtnText="Cancel"
                            onDateChange={this.onSetEnd.bind(this)}
                        />
                  </View>
                  <View >
                    <Button
                            onPress={this.onBoundButtonPress}
                            title="ADD"
                            disabled={this.state.title === ''}
                            color='black'
                        />
                    </View>

                <FlatList
                        data={this.props.store.state.schedule.filter(item => item.deleteStatus == false && item.calDay == this.props.navigation.state.params.day.day && item.calMonth == this.props.navigation.state.params.day.month && item.calYear == this.props.navigation.state.params.day.year)}
                        renderItem = {(props) => <ScheduleItem handleDelete={this.handleDelete.bind(this)} navigation={this.props.navigation} key ={props.item.title} title={props.item.title} calDay= {props.item.calDay} calMonth={props.item.calMonth} calYear={props.item.calYear} startTime={props.item.startTime} endTime={props.item.endTime} deleteStatus={props.item.deleteStatus} />}
                        keyExtractor = {item => item.title}
                    />
            </View>

        )
    }    
}

ScheduleList = store.connect(ScheduleList)
export default ScheduleList;