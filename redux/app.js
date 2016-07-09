const { createStore, combineReducers } = require('redux');

function reducerA (state = {}, action) {
    switch (action.type) {
        case 'hello': return { hello: 1 };
        case 'killa': return { }
        default: return state;
    }
}

function reducerB (state = {}, action) {
    switch (action.type) {
        case 'hello': return { world: 1 };
        case 'world': return { foo: 1 }
        case 'killb': return { }
        default: return state;
    }
}

const reducer = combineReducers({ reducerA, reducerB });
const store = createStore(reducer);

store.subscribe(() => {
    console.log('   ');
    console.log(store.getState());
    console.log('   ');
});

store.dispatch({ type: 'hello' });
store.dispatch({ type: 'world' });
store.dispatch({ type: 'killa' });
store.dispatch({ type: 'killb' });
