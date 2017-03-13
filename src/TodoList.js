import React, { Component } from 'react';

class InputField extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }
  handleInputChange(event) {
    this.props.onInputChange(event.target.value);
  }
  handleButtonClick(event) {
    this.props.onClick(event);
  }
  handleKeyPressed(event) {
    if (event.key === 'Enter') {
      this.props.onClick(event);
    }
  }
  render() {
    return <div className="searchBar"><input className="searchBarItem" value={this.props.inputValue} onKeyPress={this.handleKeyPressed} onChange={this.handleInputChange} type="text" placeholder="Oh i need to remember ..." /><button className="searchBarItem" onClick={this.handleButtonClick} >Add</button> </div>;
  }
}

const FilterButtons = function(props) {
  // handleButtonClick(event.target.value){
  //   props.onButtonClick(event.target.value);
  // }
  let buttonValues = ["all", "done", "incomplete"];
  let buttons = buttonValues.map((buttonValue, index) => {
    let buttonCn = "filterButton";
    console.log("FilterButtons [props.filterTerm, buttonValue]", props.filterTerm, buttonValue);
    if(props.filterTerm === buttonValue){
    console.log("FilterButtons [props.filterTerm, buttonValue] true", props.filterTerm, buttonValue);
      buttonCn =  buttonCn + " selected";
    }
    return <button className={buttonCn} key={index} onClick={() => { props.onButtonClick(buttonValue) }} >{buttonValue}</button>  
  });
  return <div className="filterButtons">{buttons}</div>
}

FilterButtons.propTypes ={
  filterTerm: React.PropTypes.oneOf(['all','done', 'incomplete'])
}

class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: [],
      inputText: "",
      // filterTerm can be 'all', 'done', 'incomplete'
      filterTerm: "all"
    }

    this.handleTodoAdd = this.handleTodoAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFilterButtonClick = this.handleFilterButtonClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }
  handleTodoAdd() {
    console.log("handleTodoAdd");
    let todos = this.state.todos;
    todos.push({ displayText: this.state.inputText, done: false });
    this.setState({ todos: todos, inputText: "" });
  }
  handleInputChange(inputValue) {
    this.setState({ inputText: inputValue });
  }
  handleFilterButtonClick(filterValue) {
    this.setState({ filterTerm: filterValue });
  }
  handleCheckboxClick(elementClicked) {
    let todos = this.state.todos;
    console.log("handleCheckboxClick [elementClicked]", elementClicked);
    if (todos.indexOf(elementClicked) >= 0) {
      console.log("handleCheckboxClick [todos.indexOf(elementClicked)]", todos.indexOf(elementClicked));
      todos[todos.indexOf(elementClicked)].done = !elementClicked.done;
      this.setState({ todos: todos });
    }
  }
  render() {
    let todos = this.state.todos.map((element, index) => {
      if (this.state.filterTerm === 'all' || (this.state.filterTerm === 'done' && element.done) || (this.state.filterTerm === 'incomplete' && !element.done)) {
        return <li key={index} className="todoUnsortedListItem"><input type="checkbox" checked={element.done} onChange={() => { this.handleCheckboxClick(element) }} /> {element.displayText}</li>
      }
      else {
        return null;
      }
    });
    return (
      <div className="todolist">
        <div className="todolistTitleDiv">
          <h2 className="todolistTitle">Todo-List</h2>
        </div>
        <InputField onClick={this.handleTodoAdd} inputValue={this.state.inputText} onInputChange={this.handleInputChange} />
        <FilterButtons onButtonClick={this.handleFilterButtonClick} filterTerm={this.state.filterTerm} />
        <ul className="todoUnsortedList" style={{ listStyle: 'none' }}>
          {todos}
        </ul>
      </div>
    );
  }
}

export default TodoList;
