import { Component } from 'react';

import './AddTodoListItem.scss';

class AddTodoListItem extends Component {
    constructor(props) {
        super(props);
        this.state = { title: ''};
    }

    onValueChange = (event) => {
        this.setState({title: event.target.value});
    }

    onAddNewTodoItemData = (event) => {
        event.preventDefault();
        const { title } = this.state;
        if (!title.replace(/\s/g,'')) {
            return;
        }
        this.props.onAddNewTodoItemData(this.state.title);    
    }

    render() {
        return (
            <form
                className="add-form"
                onSubmit={this.onAddNewTodoItemData}>
                <input
                    className="add-form__input"
                    placeholder="I'm gonna..."
                    type="text"
                    value={this.state.title}
                    onChange={this.onValueChange} />
                <button
                    className="add-form__btn">
                    Add
                </button>
            </form>
        );
    }
}

export default AddTodoListItem;