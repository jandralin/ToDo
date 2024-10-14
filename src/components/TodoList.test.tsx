import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from './TodoList';
import '@testing-library/jest-dom';

const mockToggleTodo = jest.fn();
const mockRemoveCompletedTodos = jest.fn();

const todos = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
  { id: 3, text: 'Task 3', completed: false },
  { id: 4, text: 'Task 4', completed: true },
  { id: 5, text: 'Task 5', completed: false },
  { id: 6, text: 'Task 6', completed: true },
  { id: 7, text: 'Task 7', completed: false },
  { id: 8, text: 'Task 8', completed: true },
  { id: 9, text: 'Task 9', completed: false },
];

describe('TodoList Component', () => {
  beforeEach(() => {
    render(
      <TodoList
        todos={todos}
        toggleTodo={mockToggleTodo}
        removeCompletedTodos={mockRemoveCompletedTodos}
      />
    );
  });

	it('Рендер всех задач', () => {
    todos.forEach(todo => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });
  });

	it('Фильтр невыполненные', () => {
    fireEvent.click(screen.getByText(/^Невыполненные$/i));

    todos.filter(todo => !todo.completed).forEach(todo => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });

    todos.filter(todo => todo.completed).forEach(todo => {
      expect(screen.queryByText(todo.text)).not.toBeInTheDocument();
    });
  });

	it('Фильтр выполненные', () => {
    fireEvent.click(screen.getByText(/^Выполненные$/i));

    todos.filter(todo => todo.completed).forEach(todo => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });

    todos.filter(todo => !todo.completed).forEach(todo => {
      expect(screen.queryByText(todo.text)).not.toBeInTheDocument();
    });
  });

	it('Кнопка удалить все задачи', async () => {
		fireEvent.click(screen.getByText(/^Удалить выполненные$/i));
		expect(mockRemoveCompletedTodos).toHaveBeenCalled();
});

it('Переключает задачу на выполненную при нажатии на чекбокс', async () => {

	fireEvent.click(screen.getByText(/^Все задачи$/i));

	const taskElement = screen.getByText('Task 1');
	expect(taskElement).toBeInTheDocument();


	const container = taskElement.closest('.todo-item-container');
	expect(container).toBeInTheDocument(); 

	const checkbox = container?.querySelector('input[type="checkbox"]');
	expect(checkbox).toBeInTheDocument(); 

	if (checkbox) {
			expect(checkbox).not.toBeChecked();
			fireEvent.click(checkbox);
	}

	expect(mockToggleTodo).toHaveBeenCalled();
	expect(mockToggleTodo).toHaveBeenCalledWith(1);
});


});