import { Component } from 'react';

import TodoServer from '../../services/TodoService';
import TodoList from '../todoList/TodoList';
import AddTodoListItem from '../addTodoListItem/AddTodoListItem';

import './App.scss';

class App extends Component {
  todoServ = new TodoServer();
  state = { data: [], maxId: 0 };

  errorTodoData = (error) => {
    console.log(error);
  }

  onAddNewTodoItemData = (title) => {
    const newTodoItem = {
      id: this.state.maxId + 1,
      title,
      completed: false
    }
    
    let newData = this.state.data;
    newData.push(newTodoItem);
    this.updateTodoData(newData);
    this.todoServ.postTodoList(newTodoItem);
  }

  onDoneTodoItemData = (id, completed) => {
    let data = this.state.data.map(item => {
      if (item.id === id) {
        item.completed = !completed;
        this.todoServ.putTodoListItem({id: item.id, title: item.title, completed: item.completed});
      }
      return item;
    });
    this.updateTodoData(data);
  }

  onDeleteTodoItemData = (id) => {
    let data = this.state.data.filter(item => item.id !== id);
    this.todoServ.deleteTodoListItem(id);
    this.updateTodoData(data);
  }

  updateTodoData = (newData) => {
    const idList = [];
    newData.forEach(todo => {
      idList.push(todo.id);
    });
    const maxId = Math.max(...idList);

    this.setState({ data: newData, maxId });
  }

  getTodoData = () => {
    this.todoServ
      .getTodoList()
      .then(this.updateTodoData)
      .catch(this.errorTodoData);
  }

  componentDidMount() {
    this.getTodoData();
  }

  render() {
    return (
      <div className="app">
        <div className="content">
          <AddTodoListItem onAddNewTodoItemData={this.onAddNewTodoItemData}/>
          <TodoList
            data={this.state.data}
            onDoneTodoItemData={this.onDoneTodoItemData}
            onDeleteTodoItemData={this.onDeleteTodoItemData} />
        </div>
      </div>
    )
  }
}

export default App;
