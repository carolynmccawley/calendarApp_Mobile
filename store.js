import Store from './flux'
import reducer from './reducer'

// Define initial store state
const initialState = {
    todos: [],
    assignments: [],
    schedule:[]
}


// initialize store
const store = new Store(reducer, initialState)
export default store