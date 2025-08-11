import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodosState } from '~features/todos/types';

const initialState: TodosState = { items: [] };

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
    },
    reorderTodos(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
    },
    addTodoLocal(state, action: PayloadAction<Todo>) {
      state.items.unshift(action.payload);
    },
    updateTodoLocal(state, action: PayloadAction<Todo>) {
      state.items = state.items.map((t) =>
        t.id === action.payload.id ? action.payload : t,
      );
    },
    deleteTodoLocal(state, action: PayloadAction<number>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  setTodos,
  reorderTodos,
  addTodoLocal,
  updateTodoLocal,
  deleteTodoLocal,
} = slice.actions;
export default slice.reducer;
