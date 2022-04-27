import React, { useState } from 'react'
import axios from 'axios'

export function getCoordinates(grid) {
  let position = 0;
  for(let i=0; i< grid.length; i++) {
    if (grid[i] === "B") position = i;
  }
  if (position === 0) return [1,1];
  else if (position === 1) return [2,1];
  else if (position === 2) return [3,1];
  else if (position === 3) return [1,2];
  else if (position === 4) return [2,2];
  else if (position === 5) return [3,2];
  else if (position === 6) return [1,3];
  else if (position === 7) return [2,3];
  return [3,3];
}

export default function AppFunctional(props) {

  const initialGrid = 
    [0,0,0,  0,"B",0,  0,0,0]

    const [steps, setSteps] = useState(0);
    const [x,y] = getCoordinates(grid);
    const [grid, setGrid] = useState(initialGrid);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    
  function getPosition(){
    let position = 0;
    for (let i = 0; i < grid.length; i++){
    if(grid[i] === "B") position = i;
    }
    setSteps(steps+1);
    setMessage('');
    return position; 
  }
  
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square active">B</div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
