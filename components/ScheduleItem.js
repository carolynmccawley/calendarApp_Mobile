import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';


const styles = StyleSheet.create({
    button: {
        flex:1,
        alignItems:'flex-end',
        paddingRight:10,
        justifyContent:'center'
        
    },
    listItem: {
        flex:1,
        paddingLeft:20,
        flexDirection:'row'
    },
    text: {
        color:'black',
        fontSize:20
    },
    delButtonView: {
    }
})

class ScheduleItem extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            title:'',
            calDay:'',
            calMonth:'',
            calYear:'',
            startTime: '',
            endTime:'',
            deleteStatus:''
        };
        
    }
    render() {
      let button;
      if (!this.props.deleteStatus){
        button = <IconButton style={{alignItems:'flex-end'}}size={30} icon="delete" color='black' onPress ={this.props.handleDelete.bind(null,this.props.title,this.props.calYear,this.props.calMonth,this.props.calDay)} />
      } else {button = null}

      let timeMsg;
      if (this.props.startTime == '' && this.props.endTime==''){
          timeMsg = <Text style={styles.text}>All Day</Text>
      }else {
         timeMsg = <Text style={styles.text}>{this.props.startTime} - {this.props.endTime}</Text>
      }

        return (
            <View style={{borderRadius:4,borderColor:'black',borderWidth:'0.5',margin:10,padding:4,flexDirection:'row'}}>
            
                <View style={{flexDirection:'column'}}>
                
                    <Text style={styles.text}>{this.props.title}</Text>
                    {timeMsg}
                </View>
                <View style={{position:'absolute',right:0}}>
                {button}
                </View>
          

            </View>
        )
    }    
}

export default ScheduleItem;