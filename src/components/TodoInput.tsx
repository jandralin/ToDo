import React, { useState } from 'react';
import { TodoInputProps } from '../interfaces';
import '../styles/TodoInput.css'

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className='create-todo-form' onSubmit={handleSubmit}>
      <input className='create-todo-input'
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите новую задачу"
      />
    </form>
  );
};

export default TodoInput;
