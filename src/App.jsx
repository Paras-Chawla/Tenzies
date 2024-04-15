import React from 'react'
import './App.css'
import  Die from './die.jsx'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
export default function App() {

  
//hello
  function allNewDice(){
    const arr=[];
    for(let i=0;i<10;i++){
    
    arr.push({
      value:Math.round(Math.random()*6+1),
      isHeld:false,
      id:nanoid()
    });
    }
    return arr;
  }

  
  const [dieArr, setDiearr]=React.useState(allNewDice)

  const[tenzies,setTenzies]=React.useState(false)

  React.useEffect(()=>{
    const allHeld=dieArr.every(die=>die.isHeld)
    const first=dieArr[0].value
    const allSame=dieArr.every(die=> die.value===first)
    if(allHeld && allSame){
      setTenzies(true)
    }
  },[dieArr])

  function dieHold(id){
    setDiearr(prevArr => {
      const arr=[];
      for(let i=0;i<prevArr.length;i++){
        if(prevArr[i].id==id){
          arr.push({...prevArr[i],
            isHeld: !prevArr[i].isHeld
          })
        }
        else arr.push(prevArr[i])
      }
      return arr;
    })
  }

  function rollDice(){
    if(!tenzies){
    setDiearr(prevArr =>{
      const arr=[];
      for(let i=0;i<10;i++){
        if(!prevArr[i].isHeld){
          arr.push({
            value:Math.round(Math.random()*6+1),
            isHeld:false,
            id:nanoid()
          })
        }
        else arr.push(prevArr[i]);
      }
      return arr;
    } )
  }
  else{
    setDiearr(allNewDice)
    setTenzies(false)
  }
  }
  // eslint-disable-next-line react/jsx-key
  const diceElements= dieArr.map(die => <Die key={die.id} dieValue={die.value} isHeld={die.isHeld} dieHold={()=>dieHold(die.id)} />)
  return (
    <main>
      
      <h1>Tenzies</h1>
      <h3>Roll and lock the dice till you get the same numbers.</h3>
      <div className='diceContainer'>
      {diceElements}
      </div>
      <button onClick={rollDice} className='roll-button button-9'>{tenzies ? "New Game": "Roll" }</button>
      {tenzies && <Confetti height={400} width={800}/>}
    </main>
  )
}


