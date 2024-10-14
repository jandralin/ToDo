import { useState } from 'react';
import { Todo } from '../interfaces';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error('Ошибка при чтении из localStorage:', error);
      return []; 
    }
  });

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text, completed: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    try {
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Ошибка при сохранении в localStorage:', error);
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    try {
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Ошибка при сохранении в localStorage:', error);
    }
  };

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
    try {
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Ошибка при сохранении в localStorage:', error);
    }
  };

  return { todos, addTodo, toggleTodo, removeCompletedTodos };
};
