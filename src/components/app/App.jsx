import { Component } from 'react';

import TodoServer from '../../services/TodoService';
import TodoList from '../todoList/TodoList';
import AddTodoListItem from '../addTodoListItem/AddTodoListItem';
import Preloader from '../preloader/Preloader';
import GotError from '../gotError/GotError';
import Header from '../header/Header';

import './App.scss';

class App extends Component {
  todoServ = new TodoServer();
  
  constructor(props) {
    super(props);
    this.state = { data: [], maxId: 0, isLoaded: false, gotError: false };
  }

  errorTodoData = (error) => {
    console.log(error);
    this.setState({ gotError: true });
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

  findCurrentMaxId = (data) => {
    const idList = [];
    data.forEach(todo => {
      idList.push(todo.id);
    });
    return Math.max(...idList);
  }

  updateTodoData = (data) => {
    const maxId = this.findCurrentMaxId(data);
    this.setState({ data, maxId, isLoaded: true });
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
    const { data, isLoaded, gotError } = this.state;
    let showSpinner = !isLoaded ? <Preloader /> : null;
    let showError = gotError ? <GotError /> : null;
    let showTodoListContent = (showError || showSpinner) ? null : <TodoList
                                                  data={data}
                                                  onDoneTodoItemData={this.onDoneTodoItemData}
                                                  onDeleteTodoItemData={this.onDeleteTodoItemData} />
    return (
      <div className="app">
        <div className="content">
          <Header />
          <AddTodoListItem onAddNewTodoItemData={this.onAddNewTodoItemData} />
          { showError || showSpinner || showTodoListContent}
        </div>
      </div>
    )
  }
}

export default App;
