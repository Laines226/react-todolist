import React, { Component } from 'react';

class InputField extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleInputChange(event) {
    this.props.onInputChange(event.target.value);
  }
  handleButtonClick(event) {
    this.props.onClick(event);
  }
  render() {
    return <div><input value={this.props.inputValue} onChange={this.handleInputChange} type="text" placeholder="Oh i need to remember ..." /><button onClick={this.handleButtonClick} >Add</button> </div>;
  }
}

function FilterButtons(props) {
  // handleButtonClick(event.target.value){
  //   props.onButtonClick(event.target.value);
  // }
  return <div><button onClick={() => { props.onButtonClick('all') }} >All</button> <button onClick={() => { props.onButtonClick('done') }} >Done</button> <button onClick={() => { props.onButtonClick('incomplete') }} >Incomplete</button></div>
}

class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: [],
      inputText: "",
      completeOnly: false,
      incompleteOnly: false
    }

    this.handleTodoAdd = this.handleTodoAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFilterButtonClick = this.handleFilterButtonClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }
  handleTodoAdd() {
    let todos = this.state.todos;
    todos.push({ displayText: this.state.inputText, done: false });
    this.setState({ todos: todos, inputText: "" });
  }
  handleInputChange(inputValue) {
    this.setState({ inputText: inputValue });
  }
  handleFilterButtonClick(filterValue) {
    switch (filterValue) {
      case 'done':
        this.setState({ completeOnly: true, incompleteOnly: false });
        break;
      case 'incomplete':
        this.setState({ completeOnly: false, incompleteOnly: true });
        break;
      // 'all'
      default:
        this.setState({ completeOnly: false, incompleteOnly: false });
        break;
    }
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
      if ((!this.state.completeOnly && !this.state.incompleteOnly) || (this.state.completeOnly && element.done) || (this.state.incompleteOnly && !element.done)) {
        return <li key={index}><input type="checkbox" value={element.done} onClick={() => { this.handleCheckboxClick(element) }} /> {element.displayText}</li>
      }
      else {
        return null;
      }
    });
    return (
      <div>
        <div>
          <h2>Todo-List</h2>
        </div>
        <InputField onClick={this.handleTodoAdd} inputValue={this.state.inputText} onInputChange={this.handleInputChange} />
        <ul style={{ listStyle: 'none' }}>
          {todos}
        </ul>
        <FilterButtons onButtonClick={this.handleFilterButtonClick} />
      </div>
    );
  }
}

export default TodoList;
