const { createStore } = require('redux');
const uuid = require('uuid/v4');

// #1 write an example/default version of my state
const defaultState = {
    //count: 0
    counters: [
        {
            id: uuid(),
            count: 0
        }
    ]
};

// #2a - Describe the ways the state can change
//  - count can go up by one
//  - count can go down by one
// #2b - find single words or short phrases for those changes
//  - increment
//  - decrement
// #2c - translate those into objects

// Also good to all-cap the variables for an action
const ACTION_INC = {type: 'INCREMENT'};
const ACTION_DEC = {type: 'DECREMENT'};
const ACTION_ADD = {type: 'ADD_COUNTER'};
const ACTION_DEL = {type: 'DEL_COUNTER'};

// 'Action Creators'
//when you need to configure an action, write a function
const incrementCounter = (id) => {
    return {
        ...ACTION_INC,
        id
    }};

//ex: for id afadg-adc-2ergwrg-vwg:
// store.dispatch(incrementCounter('afadg-adc-2ergwrg-vwg'))

const decrementCounter = (id) => {
    return {
        ...ACTION_DEC,
        id
    }};

const addCounter = () => {
    return {
        ...ACTION_ADD
    }};

const delCounter = (id) => {
    return {
        ...ACTION_DEL,
        id
    }};

// #3 - Create Reducer: Write a pure function that accepts the current state
// and an action, then returns the new version state

const counter = (state=defaultState, action) => {
    // check the action.type
    // if it's 'INCREMENT', return a new state object with the count++
    // if it's 'DECREMENT', return a new state object with the count--
    // else return the state as-is
    switch(action.type) {
        case ACTION_INC.type:
            return {
                // count: state.count + 1

                // we want to return the array of counters but
                // we want to modify the one where its id === action.id
                counters: state.counters.map(oneCounter => {
                    if (oneCounter.id === action.id) {
                        // update this one
                        return {
                            ...oneCounter,
                            count: oneCounter.count + 1
                        }

                    } else {
                        // don't change these
                        return oneCounter;
                    }
                })
            };
        case ACTION_DEC.type:
            return {
                // count: state.count - 1

                counters: state.counters.map(oneCounter => {
                    if (oneCounter.id === action.id) {
                        // update this one
                        return {
                            ...oneCounter,
                            count: oneCounter.count - 1
                        }

                    } else {
                        // don't change these
                        return oneCounter;
                    }
                })
            };
        case ACTION_ADD.type:
            // return all the existing counters, but also a new one!
            return {
                counters: [
                    ...state.counters,
                    {
                        id: uuid(),
                        count: 0   
                    }
                ]
            }
        case ACTION_DEL.type:
            return {
                // we want all the counters, except the one
                // whose id matches action.id
                counters: state.counters.filter(oneCounter => {
                    const keepThisCounter = oneCounter.id !== action.id;
                    return keepThisCounter;
                })
            }
        default:
            return state;
    }
};

// #4 create your store that knows how to use your Reducer
const store = createStore(counter);

// you can subscribe to notifications of any changes to state
store.subscribe(() => {
    const theState = store.getState();
    console.log(`The state is now:`);
    console.log(theState);
});

module.exports = {
    store,
    incrementCounter,
    decrementCounter,
    addCounter,
    delCounter
};

// enter in cmd line: const {store, ACTION_INC, ACTION_DEC} = require('./index')
// enter in cmd line: const {store, incrementCounter} = require('./index')
