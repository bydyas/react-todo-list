import './TodoListItem.scss';

function TodoListItem({title, completed, onDoneTodoItemData, onDeleteTodoItemData }) {
    return (
        <li className={`todo-item ${completed ? 'todo-done' : ''}`}>
            <button
                className='btn b-done'
                onClick={() => onDoneTodoItemData(completed)}>
                {completed ? 'Undone' : 'Done'}
            </button>
            <p
                className='title'>
                {title}
            </p>
            <button
                className='btn b-delete'
                onClick={() => onDeleteTodoItemData()}>
                Delete
            </button>
        </li>
    )
}

export default TodoListItem;