import React from "react";
import { Text, View, FlatList } from "react-native";

import TodoItem from '../components/todoItem'

import store from '../store'


class TodoArchive extends React.Component {
    static navigationOptions = {
        title: 'Archive',
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
        let completeItems;
        if (this.props.store.state.todos){
            completeItems = <FlatList
                    data={this.props.store.state.todos.filter(item => item.completeStatus == true)}
                    renderItem = {(props) => <TodoItem navigation={this.props.navigation} key ={props.item.title} title={props.item.title} completeStatus={props.item.completeStatus} />}
                    keyExtractor = {item => item.title}
            />
            
        } else {
            completeItems = null
        }
        let msg;
        if (completeItems.props.data.length == 0){
            msg = <Text style={{alignSelf:'center',fontSize:20,color:'red'}}>you have completed zero items</Text>
        } else {msg = null}
        return(
            <View style={{padding:10}}>
                {msg}
                {completeItems}
                
            </View>
        )
    }
}
TodoArchive = store.connect(TodoArchive)
export default TodoArchive;