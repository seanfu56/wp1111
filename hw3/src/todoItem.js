import React from "react";
import ReactDOM from "react-dom";
import "./todoItem.css";
import x from "./img/x.png";

class todoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.thing,
      status: this.props.value === "done" ? "done" : "yet",
    };
  }
  render() {
    return (
      <li className="todo-app__item">
        <div className="todo-app__checkbox">
          <input
            id={this.state.text}
            type="checkbox"
            onChange={() => {
              //console.log(this.state.text);
              this.props.change(this.state.text);
              this.setState({ status: this.state.status === "yet" ? "done" : "yet" });
            }}
            checked={this.props.value === "done" ? true : false}
          ></input>
          <label htmlFor={this.state.text}></label>
        </div>
        <h1
          className={
            this.state.status === "yet" ? "todo-app__item-detail" : "todo-app__item-detail strike"
          }
        >
          {this.state.text}
        </h1>
        <img
          className="todo-app__item-x"
          src={x}
          onClick={() => {
            this.props.del(this.state.text);
          }}
        ></img>
      </li>
    );
  }
}

export default todoItem;
