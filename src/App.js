import React from "react";
import "./App.css";
import logo from './logo.svg';
import ListItems from './Items.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: '',
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleInput(input) {
    this.setState({
      currentItem: {
        text: input.target.value,
        key: Date.now()
      }
    })
  }

  addItem(input) {
    input.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const newitems = [...this.state.items, newItem];
      this.setState({
        items: newitems,
        currentItem: {
          text: '',
          key: ''
        }
      })
    }
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item =>
      item.key !== key);
    this.setState({
      items: filteredItems
    })
  }

  setUpdate(text,key){
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }

  render() {
    return (
      <div className="App">
        <header>
          <form id="todo-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter task"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
            />
            <button type="submit">Add</button>
          </form>
        </header>
        <ListItems items={this.state.items}
          deleteItems={this.deleteItem}
          setUpdate={this.setUpdate} />
      </div>
    );
  }
}
export default App;
