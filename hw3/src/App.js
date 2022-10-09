import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import TodoItem from "./todoItem";
import Footer from "./footer";
const $id = (element) => document.getElementById(element);
const $class = (element) => document.getElementsByClassName(element);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: {
        number: 0,
        done: 0,
        doing: 0,
      },
      things: [],
      show: [],
      filter: 0, //0->all, 1->active, 2->complete
    };
  }
  checkNumber = () => {
    let number = 0;
    let done = 0;
    let doing = 0;
    this.state.things.map((obj) => {
      number += 1;
      if (obj.status === "yet") {
        doing += 1;
      } else {
        done += 1;
      }
    });
    this.setState({ numbers: { number: number, done: done, doing: doing } });
  };

  checkSameItem = (text) => {
    let same = false;
    this.state.things.map((obj) => {
      if (text === obj.thing) {
        same = true;
      }
    });
    return same;
  };

  changeFilter = (filter) => {
    this.setState({ filter: filter });
    this.showFilter(filter);
  };

  handleChange = (event) => {
    //console.log(event);
    if (event.code === "Enter") {
      const value = event.target.value;
      if (value !== "") {
        if (!this.checkSameItem(value)) {
          let thingsArray = this.state.things;
          thingsArray.push({ thing: value, status: "yet" });
          this.setState({ things: thingsArray });
          this.state.numbers.number += 1;
          this.state.numbers.doing += 1;
        } else {
          alert("You have added the same thing to the TODO List");
        }
      } else {
        console.log("input is empty");
      }
      $id("todo-input").value = "";
      this.showFilter(this.state.filter);
    }
  };

  deleteThing = (deleteThing) => {
    let status = "";
    let ref = this.state.things.map((obj) => {
      if (obj.thing === deleteThing) {
        status = obj.status;
      }
    });
    let newThings = this.state.things.filter((obj) => obj.thing !== deleteThing);
    let newShowThings = this.state.show.filter((obj) => obj.thing !== deleteThing);
    this.setState({ things: newThings });
    this.setState({ show: newShowThings });
    if (status === "yet") {
      this.state.numbers.doing -= 1;
    } else {
      this.state.numbers.done -= 1;
    }
    this.state.numbers.number -= 1;
    console.log(this.state.show);
  };

  change = (changeThing) => {
    let changeState = this.state.things.map((obj) => {
      if (obj.thing === changeThing) {
        obj.status = obj.status === "yet" ? "done" : "yet";
      }
    });
    this.checkNumber();
    this.showFilter(this.state.filter);
  };

  showFilter = (filter) => {
    let show = this.state.things.filter(
      (obj) =>
        filter === 0 ||
        (filter === 1 && obj.status === "yet") ||
        (filter === 2 && obj.status === "done")
    );
    //console.log(this.state);
    this.setState({ show: show });
  };

  handleClear = () => {
    let clearString = [];
    this.state.things.forEach((obj) => {
      if (obj.status === "yet") {
        clearString.push(obj.thing);
      }
    });
    let newThing = this.state.things.filter(
      (obj) => clearString.find((e) => e === obj.thing) !== undefined
    );
    let newShowThing = this.state.things.filter(
      (obj) => clearString.find((e) => e === obj.thing) !== undefined
    );
    this.setState({ things: newThing });
    this.setState({ show: newShowThing });
    this.setState({ numbers: { number: clearString.length, done: 0, doing: clearString.length } });
  };

  render() {
    return (
      <div id="root" className="todo-app__root">
        <header className="todo-app__header">todos</header>
        <section className="todo-app__main">
          <input
            className="todo-app__input"
            placeholder="What needs to be done?"
            id="todo-input"
            onKeyPress={this.handleChange}
          ></input>
          {this.state.show.length !== 0 ? (
            <ul className="todo-app__list" id="todo-list">
              {this.state.show.map((obj) => (
                <TodoItem
                  thing={obj.thing}
                  key={obj.thing}
                  del={this.deleteThing}
                  change={this.change}
                  value={obj.status}
                />
              ))}
            </ul>
          ) : null}
        </section>
        {this.state.numbers.number !== 0 ? (
          <Footer
            quantity={this.state.numbers}
            id="todo-footer"
            changeFilter={this.changeFilter}
            clear={this.handleClear}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
