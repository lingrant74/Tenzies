import Die from "./Die.jsx"
import "./container.css"
import React from "react"

export default function Container (){
    function generateAllNewDice (){
        const random = [];
        for (let i =0; i<10 ; i++){
            const num = Math.floor(Math.random() *6) +1;
            random[i] = num;
        }
        return random;
    }
    const [ran, setran] = React.useState(generateAllNewDice());
    const diceElement = ran.map(ele=> <Die value={ele}/>);
    return(
        <>
            <div className = "container">
                {diceElement}
            </div>
        </>
    )
}