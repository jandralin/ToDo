import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { TodoListProps } from '../interfaces';
import '../styles/TodoList.css';

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, removeCompletedTodos }) => {
	const [filter, setFilter] = useState<'all' | 'completed' | 'not_completed'>('all');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 13;

	const filteredTodos = todos.filter(todo => {
		if (filter === 'completed') return todo.completed;
		if (filter === 'not_completed') return !todo.completed;
		return true; 
	});

	// Вычисляем индексы для текущей страницы
	const indexOfLastTodo = currentPage * itemsPerPage;
	const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
	const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

	const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleFilterChange = (newFilter: 'all' | 'completed' | 'not_completed') => {
		setFilter(newFilter);
		setCurrentPage(1);
	};

	
	return (
		<div className='todo-list-container'>
			<div className='todo-list'>
				<h3 className='todo-list-header'>Задачи</h3>
				{currentTodos.map(todo => (
					<TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
				))}
			</div>
			<div>
			<div className='pagination'>
				{currentPage > 1 && (
					<button className='next' onClick={handlePrevPage}>
					</button>
				)}
				{currentPage < totalPages && (
					<button className='back' onClick={handleNextPage}>
					</button>
				)}
			</div>
			<div className='todo-buttons'>
				<div className='filter-buttons'>
				<button className={`filter-button ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>Все задачи</button>
				<button className={`filter-button ${filter === 'completed' ? 'active' : ''}`} onClick={() => handleFilterChange('completed')}>Выполненные</button>
				<button  className={`filter-button ${filter === 'not_completed' ? 'active' : ''}`} onClick={() => handleFilterChange('not_completed')}>Невыполненные</button>
				</div>
				<button className='remove-button' onClick={removeCompletedTodos}>Удалить выполненные</button>
			</div>
			</div>
			
		</div>
	);
};

export default TodoList;
