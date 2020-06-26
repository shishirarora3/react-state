import React from 'react';
import './App.css';
import { atom, RecoilRoot, selector, useRecoilState, useRecoilValue } from 'recoil';

const initialCounts = [0, 0, 0, 0, 0];
const countWithIndex = (index)=>atom({
    key: `count-${index}`,
    default: initialCounts[index]
});
const Child = function Child({index}) {
    const [count, setCount] = useRecoilState(countWithIndex(index));
    const updateCount = (value)=>{
        setCount((count)=>count+value);
    }
    console.log("render: " + index);
    return <pre>
    Child{index + 1} count: {count}
        <button onClick={() => updateCount(1)}> + </button>
        <button onClick={() => updateCount(-1)}> - </button>
  </pre>;
};

const totalState = selector({
    key:"total",
    get: ({get})=>{
        return initialCounts
            .map((_,index)=>get(countWithIndex(index)))
            .reduce((s,c)=>s+c, 0)
    }
});

const Parent = () => {
    const total = useRecoilValue(totalState);
    return <>
        Total Count: {total}
        {
            initialCounts.map((_, i) => (
                <Child
                    index={i}
                    key={`child-${i}`}
                />))
        }</>;
};

function AppWithProps() {
    return (
        <>
            <RecoilRoot>
                <Parent/>
            </RecoilRoot>
        </>
    );
}

export default AppWithProps;
