import { TodoForm } from '~features/todos/components/TodoForm';
import { TodoList } from '~features/todos/components/TodoList';
import './App.css';

function App() {
  return (
    <div className="flex flex-col app-container h-screen w-full">
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
