import React, {memo, useCallback, useEffect, useState} from 'react';
import './App.css';

const initialCounts = [0,0];

const useParentState = () =>{
    const [parentState, setState] =useState(initialCounts);
    const setParentState = (state, index)=>{
        parentState && setState([...parentState.slice(0, index), state, ...parentState.slice(index+1)]);
    }
    return [parentState, setParentState];
}
const useCustom = (initialState, index)=>{
    const [state, _setState] = useState(initialState);
    const setParentState = useParentState()[1];
    const setState = (_state)=>{
        _setState(_state);
        setParentState(_state, index);
    }
    return [state, setState];
}

const Child = ({index}) => {
    console.log("render: "+index);
    const [count, setCount] = useCustom(initialCounts[index]);
    return <pre>
    Child{index + 1} count: {count}
        <button onClick={()=>setCount(count+1)}> + </button>
    <button onClick={()=>setCount(count -1)}> - </button>
  </pre>;
};

function AppWithProps() {
    const [counts] = useParentState();
    return (
        <>
            Total Count = {counts.reduce((s, c) => s + c, 0)}
            {counts.map((count, i) =>
                <Child
                    count={count}
                    index={i}
                    key={`child-${i}`}
                />)}
        </>
    );
}

export default AppWithProps;
