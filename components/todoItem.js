import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';


// Use this stylesheet to create styles for the TodoItem
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
        marginTop:6,
        color:'black',
        fontSize:20
    }
})

class TodoItem extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            title:'',
            completeStatus:''
        };
        
    }
    render() {

      let button;
      if (!this.props.completeStatus){
        {button = <Checkbox.Android color={"gray"} status = {this.props.completeStatus ? 'checked' : 'unchecked'} onPress ={this.props.handleDelete.bind(null,this.props.title)}/>
      }
      } else {button = null}

        return (
            <View style={{padding:4}}>

                <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:"white"}}>{button}</View>
                  <View>
                    <Text style={styles.text}>{this.props.title}</Text>
                  </View>

                </View>
          

            </View>
        )
    }    
}

export default TodoItem;