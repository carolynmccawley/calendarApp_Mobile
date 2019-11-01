import React from "react";
import { Text, View, Button,StyleSheet } from "react-native";
import { Calendar, CalendarList } from 'react-native-calendars';


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    bottomBtn:{
        flexDirection:'row',
        marginLeft:25,
        position:'absolute',
        bottom:40,
        backgroundColor:'black',
        padding:3,
        borderRadius:10,
        opacity:0.8
    }
})

class CalendarScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
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
            <View style={styles.container}>
                <CalendarList
                    theme ={{
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: 'red',
                        textMonthFontSize: 20,
                    }}
                    onDayPress={(day) => {this.props.navigation.navigate('DailySchedule',{day: day})}}
                />
                <View style={styles.bottomBtn}> 
                    <Button
                        color='white'
                        title="To do List"
                        onPress ={()=> {
                            this.props.navigation.navigate('TodoListScreen')
                        }}
                    />
                </View>
                <View style={[{right:25},styles.bottomBtn]}>
                    <Button
                        color='white'
                        title="Assignments"
                        onPress ={()=> {
                            this.props.navigation.navigate('AssignmentScreen')
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default CalendarScreen;