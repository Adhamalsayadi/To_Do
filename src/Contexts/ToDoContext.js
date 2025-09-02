import { createContext, useReducer } from "react";
import Reducer from "../reducer/ReducerAdd";
export const TodoContext = createContext([]);
const ReducerProvider = ({ children }) => {
  const [TodoContextreducer, dispatchtcr] = useReducer(Reducer, []);
  return (
    <TodoContext.Provider
      value={{ initialvalue: TodoContextreducer, dispatch: dispatchtcr }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export default ReducerProvider;
