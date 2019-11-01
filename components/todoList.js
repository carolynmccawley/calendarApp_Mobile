import React from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import TodoItem from './todoItem' 

import store from '../store'
import actions from '../actions'


const styles = StyleSheet.create({
    container:{flex:1},
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
    archiveBtn: {
        flexDirection:'row',
        alignSelf:'flex-end',
        marginRight:10
        
    }
})

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            items: [], 
            completeItems: [],
            completeStatus:''
        }
        this.onBoundButtonPress = this.onButtonPress.bind(this)
    }

    onTitleChange(text) {
        this.setState({ title: text })
    }
    
    
    handleDelete(itemDelTitle){
      this.props.store.dispatch(actions.DELETE_TODO, { value: itemDelTitle })


    }

    onButtonPress() {
        // On button press, add the current value of the input field to the items array
        const items = this.state.items.slice(0)
        const newItem = {
            title: this.state.title,
            completeStatus:false
        }
        //console.log("newItem: ", newItem)
        items.push(newItem);
        this.setState({ title: '',completeStatus:'', items: items })
        this.props.store.dispatch(actions.ADD_TODO,{title: this.state.title})
    }

    render() {
        return (
            <View>
                <View style={styles.archiveBtn}>
                    <Button
                        color='red'
                        title="view archives"
                        onPress ={()=> {
                            this.props.navigation.navigate('TodoArchive')
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
                        data = {this.props.store.state.todos.filter(item => item.completeStatus == false)}
                        renderItem = {(props) => <TodoItem handleDelete={this.handleDelete.bind(this)} navigation={this.props.navigation} key ={props.item.title} title={props.item.title} completeStatus={props.item.completeStatus} />}
                        keyExtractor = {item => item.title}
                />
    
            </View>

        )
    }    
}

TodoList = store.connect(TodoList)
export default TodoList;