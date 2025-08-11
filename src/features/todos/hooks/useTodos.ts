import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, addTodo, updateTodo, deleteTodo } from '~api/todos';
import { Todo } from '~features/todos/types';
import {
  setTodos,
  addTodoLocal,
  updateTodoLocal,
  deleteTodoLocal,
} from '~features/todos/store/todoSlice';
import { useAppDispatch, useAppSelector, useRequestQuery } from '~hooks';

export const useTodos = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.items);
  const queryClient = useQueryClient();

  const todosQuery = useRequestQuery({
    queryKey: ['todos'],
    enabled: true,
    queryFn: getTodos,
    queryOptions: {
      onSuccess: (data) => {
        if (todos.length === 0) dispatch(setTodos(data));
      },
    },
  });

  const addTodoMutation = useMutation({
    mutationKey: ['addTodo'],
    mutationFn: addTodo,
    onSuccess: (newTodo) => {
      dispatch(addTodoLocal(newTodo));
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => [
        ...old,
        newTodo,
      ]);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: deleteTodo,
    onSuccess: (_, id) => {
      dispatch(deleteTodoLocal(id));
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.filter((t) => t.id !== id),
      );
    },
  });

  const updateTodoMutation = useMutation<
    Todo,
    Error,
    { id: number; completed: boolean }
  >({
    mutationKey: ['updateTodos'],
    mutationFn: ({ id, completed }) => updateTodo(id, { completed }),
    onSuccess: (updatedTodo) => {
      dispatch(updateTodoLocal(updatedTodo));
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
      );
    },
  });

  return {
    todosQuery,
    todos,
    addTodoMutation,
    deleteTodoMutation,
    updateTodoMutation,
  };
};
