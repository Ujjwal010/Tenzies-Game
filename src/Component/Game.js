import React from 'react'
import './Game.css'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function Game(){

    const [dice,setdice]=React.useState(allNewDice())

    const [tenzies,settenzies]=React.useState(false)

    React.useEffect(()=>{
                           const allHold=dice.every(die=>die.isHeld);
                           const comValue=dice[0].value;
                           const allValue=dice.every(die=>die.value===comValue)
                           if(allHold && allValue){
                            settenzies(true)
                           }
        },[dice])

    function allNewDice(){
        const newDice=[];
        for(let i=0;i<10;i++){
            newDice.push({
                value:Math.floor(Math.random()*6)+1,
                isHeld:false,
                id:nanoid(),
                
               })
        }
        return newDice 
    }
   
    function rollDice(){
        if(tenzies===true){
            setdice(allNewDice())
            settenzies(false)
        }
        else
        {setdice(dice=>dice.map(die=>die.isHeld?die:{
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }))}
    }

    /*function holdDice(id){
        setdice(dice=>dice.map(die=>id===die.id?{...die,isHeld:!die.isHeld}:die))
    }*/

    function holdDice(id) {
        setdice(dice=>dice.map(die=>{ if(die.id===id ){return {...die,isHeld:!die.isHeld}} 
                                             else { return die }    }))
    }

    const element=dice.map(die=><Die key={die.id} value={die.value} isHeld={die.isHeld} id={die.id} holdDice={holdDice}/>)

    return(
        <main>

            {tenzies && <Confetti/>}

            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice-container'>
            {element}
            </div>
            <button className='roll-dice' onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>

        </main>
    )
}

export default Game;