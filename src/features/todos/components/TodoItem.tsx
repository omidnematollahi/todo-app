import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react';
import { Modal } from '~components/Modal';
import { BaseButton } from '~components/ui/BaseButton';
import { Todo } from '../types';

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (id: number, completed: boolean) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onDelete, onUpdate }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [open, setOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const deleteHandler = (id: number) => {
    setOpen(true);
    setSelectedTodoId(id);
  };

  return (
    <div ref={setNodeRef} style={style} className="mt-2">
      <div className="flex items-center justify-between p-2 border border-purple-500 rounded-lg">
        <div className="flex gap-3 items-center">
          <span {...attributes} {...listeners} className="cursor-grab">
            ⠿
          </span>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onUpdate(todo.id, todo.completed)}
          />
          <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.todo}</span>
        </div>
        <div className="flex gap-2">
          <BaseButton
            variant="danger"
            className="text-sm px-2 py-1 border rounded"
            onClick={() => deleteHandler(todo.id)}
          >
            Delete
          </BaseButton>
          <BaseButton
            variant="secondary"
            className="text-sm px-2 py-1 border rounded"
            onClick={() => onUpdate(todo.id, todo.completed)}
          >
            {todo.completed ? "Undone" : "Done"}
          </BaseButton>
        </div>
      </div>
      <Modal
        open={open}
        title='Delete TODO'
        onConfirm={function (): void {
          onDelete(selectedTodoId);
        }}
        onCancel={function (): void {
          setOpen(false);
        }}
      >
        <h3>You are deleting your task. </h3>
        <h3>Are you sure about it?</h3>
      </Modal>
    </div>
  );
};
