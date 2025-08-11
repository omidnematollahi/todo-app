// src/features/todos/api.ts
import { axiosInstance } from '~api/client';
import { Todo } from '~features/todos/types';

/**
 * API response shape for GET /todos
 */
type GetTodosResponse = {
  todos: Todo[];
};

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await axiosInstance.get<GetTodosResponse>('/');
  return data.todos;
};

export const addTodo = async (title: string): Promise<Todo> => {
  const { data } = await axiosInstance.post<Todo>('/add', {
    todo: title,
    completed: false,
    userId: 1,
  });
  return data;
};

export const updateTodo = async (
  id: number,
  updates: Partial<Todo>,
): Promise<Todo> => {
  const { data } = await axiosInstance.patch<Todo>(`/${id}`, updates);
  return data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/${id}`);
};
