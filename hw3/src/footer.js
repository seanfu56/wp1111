import React from "react";
import ReactDOM from "react-dom";

class footer extends React.Component {
  render() {
    return (
      <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">{this.props.quantity.doing + " left"}</div>
        <ul className="todo-app__view-buttons">
          <li>
            <button onClick={() => this.props.changeFilter(0)}>All</button>
          </li>
          <li>
            <button onClick={() => this.props.changeFilter(1)}>Active</button>
          </li>
          <li>
            <button onClick={() => this.props.changeFilter(2)}>Complete</button>
          </li>
        </ul>
        <div className="todo-app__clean">
          <button
            style={{ visibility: this.props.quantity.done !== 0 ? "visible" : "hidden" }}
            onClick={() => this.props.clear()}
          >
            clear completed
          </button>
        </div>
      </footer>
    );
  }
}

export default footer;
