import React from 'react';
import { StyleSheet, Text, View, Button,Switch } from 'react-native';
import { IconButton } from 'react-native-paper'


const styles = StyleSheet.create({
    button: {
        flex:1,
        alignItems:'flex-end',
        paddingRight:10,
        justifyContent:'center'
        
    },
    listItem: {
        flex:1,
        paddingLeft:20
    },
    text: {
        color:'black',
        fontSize:20
    }
})

class AssignmentItem extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            title:'',
            dueDate: '',
            class:'',
            completeStatus:''
        };
        
    }
    render() {

        let button;
        if (!this.props.completeStatus){
          button = <IconButton style={{alignItems:'flex-end'}}size={30} icon="delete" color='black' onPress ={this.props.handleDelete.bind(null,this.props.title)} />
        } else {button = null}
  

        return (
            <View style={{flexDirection: 'row', borderRadius:4,margin:10,padding:4, backgroundColor: this.props.completeStatus ? 'rgb(195, 200, 201)' : 'white', color: this.props.completeStatus ? 'white' : 'black'}}>

                <View style={{flexDirection:'column', flex:1}}>
                    <Text style={styles.text}>Assignment: {this.props.title}</Text>
                    <Text style={styles.text}>For: {this.props.class}</Text>
                    <Text style={styles.text}>Due: {this.props.dueDate}</Text>
                </View>
                    <View style={{paddingTop:30,position:'absolute',right:0}}>
                        {button}
                    </View>

                </View>
        )
    }    
}

export default AssignmentItem;