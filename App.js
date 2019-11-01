import React from 'react';
import { AsyncStorage,StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import store from './store'
import actions from './actions'

//import screens
import CalendarScreen from './screens/CalendarScreen';
import AssignmentScreen from './screens/AssignmentScreen'
import TodoListScreen from './screens/TodoListScreen'
import TodoArchive from './screens/TodoArchive'
import DailySchedule from './screens/DailySchedule'
import AssignmentsArchive from './screens/AssignmentsArchive'


// Hydrate state from async storage
AsyncStorage.getItem('@CAM1010_STATE')
  .then(state => store.dispatch(actions.HYDRATE, JSON.parse(state)))
  .catch(error=> console.log("error in promise"))

const RootStack = createStackNavigator(
  {
    CalendarScreen: {screen: CalendarScreen},
    AssignmentScreen: {screen:AssignmentScreen},
    TodoListScreen: {screen: TodoListScreen},
    TodoArchive: {screen: TodoArchive},
    DailySchedule: {screen:DailySchedule},
    AssignmentsArchive: {screen:AssignmentsArchive}
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <store.Provider>
        <AppContainer />
      </store.Provider>
    )}
}


