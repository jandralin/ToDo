import React from 'react';
import { TodoItemProps } from '../interfaces';
import '../styles/TodoItem.css'

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo}) => {
  return (
    <div className='todo-item-container'
		style={{
			opacity: todo.completed ? 0.5 : 1 
		}}>
			 <label className='custom-checkbox'>
        <input 
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className="checkmark"></span>
			</label>
      <span className='todo-item-task'>
        {todo.text}
      </span>
    </div>
  );
};

export default TodoItem;
