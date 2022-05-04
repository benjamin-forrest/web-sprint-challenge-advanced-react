import React from 'react'
import Axios from 'axios'

export default class AppClass extends React.Component {
  constructor(){
    super();
    this.state = {
      steps: 0,
      grid: [0, 0, 0, 0, "B", 0, 0, 0, 0],
      message: "",
      x: 2,
      y: 2,
      email: "",
    };
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    if (!this.state.email.length) {
      return this.setState({ message: "Ouch: email is required" });
    } else if (this.state.email.split('.').length !== 2) {
      return this.setState({ message: "Ouch: email must be a valid email" });
    } else if (this.state.email === "foo@bar.baz") {
      return this.setState({
        message: "foo@bar.baz failure #71",
        grid: [0, 0, 0, 0, "B", 0, 0, 0, 0],
        steps: 0,
        x: 2,
        y: 2,
        email: ""
      });
  } else {
    const url = "http://localhost:9000/api/result";
    Axios.post(url, {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.steps,
      email: this.state.email,
    })
      .then((res) => {
        this.setState({
          message: res.data.message,
        });
        document.getElementById("email").value = "";
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          message: err.message,
          grid: [0, 0, 0, 0, "B", 0, 0, 0, 0],
          steps: 0,
          x: 2,
          y: 2,
          email: ""
        });
      });
  }
};
getCoordinates = () => {
  let grid = this.state.grid;
  let position = 0;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === "B") pos = i;
  }
  if (position === 0) return [1, 1];
  else if (position === 1) return [1, 2];
  else if (position === 2) return [1, 3];
  else if (position === 3) return [2, 1];
  else if (position === 4) return [2, 2];
  else if (position === 5) return [2, 3];
  else if (position === 6) return [3, 1];
  else if (position === 7) return [3, 2];
  return [3, 3];
};
getPosition = () => {
  let position = 0;
  for (let i = 0; i < this.state.grid.length; i++) {
    if (this.state.grid[i] === "B") position = i;
  }
  this.setState({ message: "", steps: this.state.steps + 1 });
  return position;
};
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
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
        <form onSubmit={this.handleSubmit}>
          <input id="email" type="email" placeholder="type email" value={this.state.email}
            onChange={(evt) => this.setState({ email: evt.target.value })}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
