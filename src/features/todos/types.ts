export type Todo = {
  id: number;
  todo: string; // DummyJSON uses `todo` as the title key
  completed: boolean;
  userId?: number;
};

export interface TodosState {
  items: Todo[];
}
