import { closestCenter, DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useEffect, useMemo, useState } from 'react';
import { Loading } from '~components/ui/Loading';
import { TodoHeader } from '~features/todos/components/TodoHeader';
import { TodoItem } from '~features/todos/components/TodoItem';
import { useTodos } from '~features/todos/hooks/useTodos';
import { reorderTodos } from '~features/todos/store/todoSlice';
import { Todo } from '~features/todos/types';
import { useAppDispatch, useAppSelector } from '~hooks';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todosQuery, deleteTodoMutation, updateTodoMutation } = useTodos();
  const { refetch: getTodos, isLoading } = todosQuery;
  const todos = useAppSelector((state) => state.todos.items);

  useEffect(() => {
    getTodos();
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = todos?.findIndex((todoItem: Todo) => todoItem.id === active.id);
      const newIndex = todos?.findIndex((todoItem: Todo) => todoItem.id === over.id);
      const newOrder = arrayMove(todos, oldIndex, newIndex);

      dispatch(reorderTodos(newOrder));
    }
  };

  const handleDelete = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  const handleUpdate = (id: number, completed: boolean) => {
    updateTodoMutation.mutate({ id, completed: !completed });
  };

  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredTodos = useMemo(() => {
    let list = todos;
    if (filter === 'done') list = list.filter((todoItem) => todoItem.completed);
    if (filter === 'notdone')
      list = list.filter((todoItem) => !todoItem.completed);
    if (search.trim()) {
      list = list.filter((todoItem) =>
        todoItem.todo.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return list;
  }, [todos, filter, search]);

  if (isLoading) return <Loading size={40} />;
  if (!todos) return null;

  return (
    <>
      <TodoHeader
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={todos.map((todoItem: Todo) => todoItem.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredTodos.map((todo: Todo) => (
            <TodoItem
              key={Math.random()}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
};

export default TodoList;
