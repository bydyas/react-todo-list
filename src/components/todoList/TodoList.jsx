import TodoListItem from '../todoListItem/TodoListItem';

import './TodoList.scss';

function TodoList({data, onDoneTodoItemData, onDeleteTodoItemData}) {

    const li = data.map(item => {
        const { id, ...itemProps } = item;
        return (
            <TodoListItem
                key={id}
                onDoneTodoItemData={(completed) => onDoneTodoItemData(id, completed)}
                onDeleteTodoItemData={() => onDeleteTodoItemData(id)}
                {...itemProps}/>
        )
    });

    return (
        <ul>
            {li}
        </ul>
    )
}

export default TodoList;