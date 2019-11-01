import React, {createContext, useContext, useReducer} from 'react'

export default class Store {
    constructor(reducer, initialState, key = 'store') {
        this.reducer = reducer
        this.initialState = initialState
        this.key = key

        this.context = React.createContext();
    }

    dispatch = (type, props) => this._dispatch({type, props})

    static ASYNC = {
        FETCHING: 'FETCHING',
        DONE: 'DONE',
        ERROR: 'ERROR'
    }

    dispatchAsync = (type, props, promise) => {

        this._dispatch({type, props, asyncType: Store.ASYNC.FETCHING })

        promise            
            .then(result => setTimeout(this._dispatch({type, props: result, asyncType: Store.ASYNC.DONE })))
            .catch(error => setTimeout(this._dispatch({type, props: error, asyncType: Store.ASYNC.ERROR })))
    }

    mapStore = ([state, dispatch]) => {
      this._dispatch = dispatch
      return { state, dispatch: this.dispatch, dispatchAsync: this.dispatchAsync }
    }

    connect = (Component) => {
        const StoreContext = this.context
 
        return (props) => (
            <StoreContext.Consumer>
                {store => (
                    <Component {...props} store={store} />
                )}
            </StoreContext.Consumer>
        )
    };

    provide = (Component) => {
        const StoreContext = this.context

        return (
            <StoreContext.Provider value={
              this.mapStore(useReducer(this.reducer, this.initialState))
            }>
                <Component />
            </ StoreContext.Provider>
        )
    }

    // The provider is a top-level component that initializes a context root
    // All components rendered under the provider will be able to access the context using the connect() method 
    Provider = ({ reducer, initialState, children }) => {
        const StoreContext = this.context

        return (
            <StoreContext.Provider value={
              this.mapStore(useReducer(this.reducer, this.initialState))
            }>
                {children}
            </ StoreContext.Provider>
        )
    }
}