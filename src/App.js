import "./App.css";
import ToDo from "./TodoComponents/ToDo.js";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodoContext } from "./Contexts/ToDoContext.js";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: "playsans",
  },
});
const todo = [
  {
    id: uuidv4(),
    body: " وصف المهمة الاولى ",
    name: "المهمة الاولى",
    done: false,
  },
];
function App() {
  const [initialvalue, settodo] = useState(todo);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="rtl App flex   justify-center items-center min-h-screen bg-purple-600 "
        style={{ direction: "rtl" }}
      >
        <TodoContext.Provider value={{ initialvalue, settodo }}>
          <ToDo />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
