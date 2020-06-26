import React, {memo} from 'react';
import './App.css';
import useGlobalHook from 'use-global-hook';


const initialCounts = [0, 0, 0, 0, 0];
const useGlobal = useGlobalHook(React, {counts: initialCounts}, {
    updateCount: (store, index, value)=>{
        const counts = store.state.counts;
        store.setState({
            counts: [...counts.slice(0, index), counts[index]+value, ...counts.slice(index+1) ]});
    }
});
const Child = memo(function Child({index, count, updateCount}) {
    console.log("render: " + index);
    return <pre>
    Child{index + 1} count: {count}
        <button onClick={() => updateCount(index, 1)}> + </button>
        <button onClick={() => updateCount(index, -1)}> - </button>
  </pre>;
});

const Parent = () => {
    const [{counts}, {updateCount}] = useGlobal();
    return <>
        Total Count: {counts.reduce((a,b)=>a+b, 0)}
        {
            counts.map((count, i) => (
                <Child
                    index={i}
                    key={`child-${i}`}
                    count={count}
                    updateCount={updateCount}
                />))
        }</>;
};

function AppWithProps() {
    return (
        <>
                <Parent/>
        </>
    );
}

export default AppWithProps;
