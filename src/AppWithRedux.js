import React from 'react';
import './App.css';
import {configureStore, createSlice} from '@reduxjs/toolkit';
import {connect, Provider} from 'react-redux';

const initialCounts = [0, 0, 0, 0, 0];
const {
    actions: {inc, dec},
    reducer,
} = createSlice({
    name: "some name",
    initialState: initialCounts,
    reducers: {
        inc: (state, action) => {
            state[action.payload] += 1;//mutation allowed, like state[action.payload].count +=1;
        },
        dec: (state, action) => {
            state[action.payload] -= 1;
        }
    }
});
const store = configureStore({reducer});

const mapStateChild = (state, props) => ({
    count: state[props.index]
});
const mapDispatch = {
    inc, dec
};
const Child = connect(mapStateChild, mapDispatch)(function Child({index, count, inc, dec}) {
    console.log("render: " + index);
    return <pre>
    Child{index + 1} count: {count}
        <button onClick={() => inc(index)}> + </button>
        <button onClick={() => dec(index)}> - </button>
  </pre>;
});

const mapStateParent = (state) => ({
    counts: state.reduce((s, c) => s + c, 0)
});

const Parent = connect(mapStateParent)(({
                                            counts
                                        }) => {

    return <>
        Total Count: {counts}
        {
            initialCounts.map((_, i) => (
                <Child
                    index={i}
                    key={`child-${i}`}
                />))
        }</>;
});

function AppWithProps() {
    return (
        <>
            <Provider store={store}>
                <Parent/>
            </Provider>
        </>
    );
}

export default AppWithProps;
