/**
 * Created by fuhuo on 2018/5/26.
 */
import "./index.html";
import React from "./Monika/index.js";
import ReactDOM from "./Monika/render.js";

// const element = (
//     <div>
//         hello
//         <span>
//             world
//         </span>
//     </div>
// );
//
// console.log(element);

// function tick() {
//     const element = (
//         <div>
//             <span>
//                 hello world
//             </span>
//             <span>
//                 {
//                     new Date().toLocaleString()
//                 }
//             </span>
//         </div>
//     );
//
//     ReactDOM.render(
//         element,
//         document.getElementById('root')
//     )
// }
//
// setInterval(tick, 1000);

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0
    };
  }

  componentWillMount() {
    for (let i = 0; i <= 100; i++) {
      this.setState({ num: this.state.num++ });
      console.log(this.state.num);
    }
  }

  onClick() {
    this.setState({ num: this.state.num + 1 }, () => {
      console.log(this.state.num);
    });
  }

  render() {
    return (
      <div>
        <h1>count: {this.state.num}</h1>
        <button onClick={() => this.onClick()}>add</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
