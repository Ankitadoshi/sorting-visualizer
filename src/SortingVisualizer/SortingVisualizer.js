import React from "react";
import './SortingVisualizer.css';
import { useState, useEffect } from "react";

function SortingVisualizer () {
    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(20);
    //add speed state with user input

    function getHeight(ele) {
        return 5*ele;
    }
    function generateArr() {
        const newArr=[];
        let size = arrSize || 20;
        let count=1;
        for(let i=0; i<size; i++){
            let newEle= Math.floor((Math.random()*100));
            if(newArr.includes(newEle)) {
                newArr.push(newEle+count);
                count++;
            } else {
                newArr.push(newEle);
            }
        }
        setArr(newArr);
    }
    function handleInputChange(event) {
        setArrSize(event.target.value);
        generateArr(arrSize);
    }

    //move next two functions to specific Bubble sort file
    function handleAnimation(animateSeq) {
        if(!animateSeq.length){
            return;
        }
        if(animateSeq[0].length>3) {
            setArr(animateSeq.shift());
        } else {
            //add color changing logic here
            animateSeq.shift();
        }
        setTimeout(() => {
            handleAnimation(animateSeq);
        },10);

    }
    function bblSort(){   
        let animateSeq=[]
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < ( arr.length - i -1 ); j++) {
                animateSeq.push([i,j]);
                if(arr[j] > arr[j+1]) {
                    animateSeq.push([i,j, true]);
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j+1] = temp;
                    animateSeq.push(arr.slice(0));
                    animateSeq.push([]);    
                }
                
            }
        }
        handleAnimation(animateSeq);
    }


    useEffect(()=>{
        generateArr(arrSize);
    }, [arrSize])

    return (
        <>
        <div className="toolbar">
            <div className="section"><button onClick={generateArr}>Generate New Array</button></div>
            <div className="separator"></div> 
            <div className="section"><span>Array size: </span><input type="number" min="5" max="100" value={arrSize} onChange={handleInputChange}></input></div>
            <div className="separator"></div> 
            <div className="section">
                <button className="sortBtn">Merge Sort</button>
                <button className="sortBtn">Quick Sort</button>
                <button className="sortBtn">Heap Sort</button>
                <button onClick={bblSort}>Bubble Sort</button>
            </div>
        </div>
        <div className="body">
          {arr.map((ele,idx) => {
              return (<div className="vBar" style={{height: getHeight(ele) + 'px'}} key={idx}></div>)
          })}
        </div>
        </>
    )
}

export default SortingVisualizer;
