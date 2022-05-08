import { Component } from 'react';

import TodoServer from '../../services/TodoService';
import TodoList from '../todoList/TodoList';

import './App.scss';

class App extends Component {
  todoServ = new TodoServer();
  state = { data: [] };

  errorTodoData = (error) => {
    console.log(error);
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

  updateTodoData = (data) => {
    this.setState({ data });
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
