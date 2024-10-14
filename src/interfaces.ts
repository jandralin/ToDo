// общий интерфейс задачи
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// пропсы
export interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
}

export interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  removeCompletedTodos: () => void;
}

export interface TodoInputProps {
  addTodo: (text: string) => void;
}