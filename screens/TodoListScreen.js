import React from "react";
import { View } from "react-native";
import TodoList from '../components/todoList'

class TodoListScreen extends React.Component {
    static navigationOptions = {
        title: 'To Do List',
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
                <TodoList navigation={this.props.navigation} />
            </View>
        )
    }
}

export default TodoListScreen;