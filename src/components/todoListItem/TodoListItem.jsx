import './TodoListItem.scss';

function TodoListItem({title, completed, onDoneTodoItemData }) {
    return (
        <li className={`todo-item ${completed ? 'todo-done' : null}`}>
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
                className='btn b-delete'>
                Delete
            </button>
        </li>
    )
}

export default TodoListItem;