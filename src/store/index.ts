import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '~features/todos/store/todoSlice';

// Load from localStorage
function loadState() {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) return undefined;
    return { todos: JSON.parse(serializedState) }; // match reducer key
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedState = JSON.stringify(state.todos);
    localStorage.setItem('todos', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
