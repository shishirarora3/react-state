import React, {createContext, memo, useCallback, useContext, useState} from 'react';
import './App.css';

const initialCounts = [0, 0, 0, 0, 0];
const CountContext = createContext([]);

const Child = memo(function Child({index, count, incCount, decCount}){
    console.log("render: " + index);
    return <pre>
    Child{index + 1} count: {count}
        <button onClick={()=>incCount(index)}> + </button>
        <button onClick={()=>decCount(index)}> - </button>
  </pre>;
});

const Parent = ()=>{
    const [counts, incCount, decCount] = useContext(CountContext);

    return <>
        Total Count: {counts?.reduce((s, c) => s + c, 0)}
        {
        counts.map((count, i)=>(
        <Child
            count={count}
            incCount={incCount}
            decCount={decCount}
            index={i}
            key={`child-${i}`}
        />))
    }</>;
}
const CountProvider = ({children}) => {
    const [counts, setCounts] = useState(initialCounts);
    console.log(counts);
    const setCount = (isIncrement,index)=> {
        setCounts((counts)=>[
            ...counts.slice(0, index),
            counts[index] + (isIncrement ? 1 : -1),
            ...counts.slice(index+1)]
        );
    }
    const incCount = useCallback((index)=>setCount(true,index), []);
    const decCount = useCallback((index)=>setCount(false,index), []);

    return <CountContext.Provider value={[
        counts, incCount, decCount
    ]}>{children}</CountContext.Provider>
};

function AppWithProps() {
    return (
        <>
            <CountProvider>
                <Parent/>
            </CountProvider>
        </>
    );
}

export default AppWithProps;
