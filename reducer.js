import { AsyncStorage } from 'react-native'

function saveToLocalStorage(state) {
    AsyncStorage.setItem("STATE", JSON.stringify(state))
}

export default function reducer(state, action) {
    let newState = {}

    switch (action.type) {
        case 'HYDRATE':
            return {
                ...state,
                ...action.props
            }

        case 'ADD_TODO':
            const uTodos = state.todos.slice(0)
            const newItem = {
                title: action.props.title,
                completeStatus: false
            }
            uTodos.push(newItem);
            newState = {
                ...state, 
                todos: uTodos
            }
            break;
        
        case 'ADD_ASSIGNMENT':
            const uAssignments = state.assignments.slice(0)
            let dueDateCheck;
            if (action.props.dueDate == ""){ dueDateCheck = "Unknown"}
            else {dueDateCheck = action.props.dueDate}
            const newAssignment = {
                title: action.props.title,
                class: action.props.class,
                dueDate: dueDateCheck,
                completeStatus: false
            }
            uAssignments.push(newAssignment);
            newState = {
                ...state, 
                assignments: uAssignments
            }
            break;

        case 'DELETE_TODO':
            let delItem = action.props.value;
            var newItems = state.todos;
            for (var i =0; i < newItems.length; i++){
                if (newItems[i].title == delItem){
                    newItems[i].completeStatus = true;
                    break;
                }
            }
            newState = {
                ...state,
                todos: newItems
            }
            break;
        
        case 'DELETE_ASSIGNMENT':
            let toDelete = action.props.value;
            var newAssignments = state.assignments;
            for (var j = 0; j < newAssignments.length; j ++){
                if (newAssignments[j].title == toDelete){
                    newAssignments[j].completeStatus = true;
                    // console.log("assignment found")
                    break;
                }
            }
            newState = {
                ...state,
                assignments: newAssignments
            }
            break;

        case 'DELETE_EVENT':
            let delTitle = action.props.delTitle
            let delYear = action.props.delYear
            let delMonth = action.props.delMonth
            let delDay = action.props.delDay
            var newSchedule = state.schedule;
            //console.log("schedule: ", state.schedule)
            for (var k = 0; k < newSchedule.length; k++){
                if (newSchedule[k].title == delTitle && newSchedule[k].calYear == delYear && newSchedule[k].calMonth == delMonth && newSchedule[k].calDay == delDay){
                    newSchedule[k].deleteStatus = true
                    break;
                }
            }
            newState = {
                ...state, 
                schedule:newSchedule
            }
            break;
        
        case 'ADD_EVENT':
            const scheduleList = state.schedule.slice(0)
            const newEvent = {
                title: action.props.title,
                calDay: action.props.calDay,
                calMonth: action.props.calMonth,
                calYear: action.props.calYear,
                startTime: action.props.startTime,
                endTime: action.props.endTime,
                deleteStatus: false
            }
            scheduleList.push(newEvent);
            //console.log("added assignment: ", uAssignments)
            newState = {
                ...state, 
                schedule: scheduleList
            }
            break;

        default:
            newState = state
            break;
        
        
    }
    saveToLocalStorage(newState)

    return newState

}