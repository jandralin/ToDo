import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodo';
import './styles/App.css'

const App: React.FC = () => {
	const { todos, addTodo, toggleTodo, removeCompletedTodos } = useTodos();

	return (
		<div className='todo-container'>
			<h1 className='todo-header'>TO DO LIST:</h1>
				<TodoInput addTodo={addTodo} />
				<TodoList todos={todos} toggleTodo={toggleTodo} removeCompletedTodos={removeCompletedTodos} />
		</div>
	);
};

export default App;
