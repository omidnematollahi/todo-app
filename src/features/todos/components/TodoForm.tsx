import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BaseButton, TextField } from '~components/ui';
import { useTodos } from '../hooks/useTodos';
import { TodoFormType, todoSchema } from '../validation';

export const TodoForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormType>({
    resolver: zodResolver(todoSchema),
  });
  const { addTodoMutation } = useTodos();
  const { mutate: addTodoMutate, isPending } = addTodoMutation;

  const onSubmit = (data: TodoFormType) => {
    addTodoMutate(data.title);
    reset();
  };

  return (
    <form className="flex gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('title')}
        placeholder="Add todo"
        errors={errors}
      />
      <BaseButton variant="primary" size="md" type="submit" loading={isPending}>
        Add Todo
      </BaseButton>
    </form>
  );
};
