import React from 'react'

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
