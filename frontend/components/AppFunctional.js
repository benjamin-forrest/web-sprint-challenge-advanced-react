import React, { useState } from 'react'
import Axios from 'axios';

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

    const [steps, setSteps] = useState(0);
    const [message, setMessage] = useState("");
    const [grid, setGrid] = useState([0,0,0,0,"B",0,0,0,0]);
    const [x,y] = getCoordinates(grid);
    const [email, setEmail] = useState("");
    
    function handleSubmit(e) {
      e.preventDefault();
        
        if (!email.length) {
          return setMessage("email required");
        }
        if (email.split(".").length !== 2) {
          return setMessage("email must be a valid email");
        }
        if (email === "foo@bar.baz") {
          return setMessage("foo@bar.baz failure #71");
        }
        const url = "http://localhost:9000/api/result";
        
        Axios.post(url, { email, x, y, steps })
          .then((res) => {
            setMessage(res.data.message);
            setEmail("");
          })
          .catch((err) => {
            setMessage(err.message);
            setEmail("");
            setGrid([0, 0, 0, 0, "B", 0, 0, 0, 0]);
            setSteps(0);
          });
      }
    

  function getPosition(){
    let position = 0;
    for (let i = 0; i < grid.length; i++){
    if(grid[i] === "B") position = i;
    }
    setSteps(steps+1);
    setMessage("");
    return position; 
  }
  
  function leftButton(){
    if (x === 1) {
      setMessage("You can't go left");
    } else {
      let position = getPosition();
      let newGrid = [...grid];
      newGrid[position] = grid[position - 3];
      newGrid[position - 3] = "B";
      setGrid(newGrid);
    }
  }
  function upButton(){
    if (y === 1) {
      setMessage("You can't go up");
    } else {
      let position = getPosition();
      let newGrid = [...grid];
      newGrid[position] = grid[position - 3];
      newGrid[position - 3] = "B";
      setGrid(newGrid);
    }
  }

  function rightButton(){
    if (x === 3) {
      setMessage("You can't go right");
    } else {
      let position = getPosition();
      let newGrid = [...grid];
      newGrid[position] = grid[position + 1];
      newGrid[position + 1] = "B";
      setGrid(newGrid);
    }
  }

  function downButton(){
    if (y === 3) {
      setMessage("You can't go down");
    } else {
      let position = getPosition();
      let newGrid = [...grid];
      newGrid[position] = grid[position + 3];
      newGrid[position + 3] = "B";
      setGrid(newGrid);
    }
  }

  function reset(){
    setGrid([0, 0, 0, 0, "B", 0, 0, 0, 0]);
    setSteps(0);
    setMessage("");
    setEmail("");
  }
  



  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {grid.map((square, i) =>(
        <div key={i} className={`square ${square === "B" ? "active" : ""}`}>
          {`${square === "B" ? "B" : ""}`} 
        </div>))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={()=>leftButton()}>LEFT</button>
        <button id="up" onClick={()=>upButton()}>UP</button>
        <button id="right" onClick={()=>rightButton()}>RIGHT</button>
        <button id="down" onClick={()=>downButton()}>DOWN</button>
        <button id="reset" onClick={()=>reset()}>reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input id="email" type="email" placeholder="type email"
        onChange={(e)=> setEmail(e.target.value)}
        value={email}>
        </input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
