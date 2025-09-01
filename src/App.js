import "./App.css";
import ToDo from "./TodoComponents/ToDo.js";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodoContext } from "./Contexts/ToDoContext.js";
import { ToastC } from "./Contexts/ToastContext.js";
import { useState } from "react";
import SimpleSnackbar from "./TodoComponents/SnackBar.js";
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: "playsans",
  },
});
const todo = [
  {
    id: uuidv4(),
    body: "",
    name: "",
    done: false,
  },
];
function App() {
  const [initialvalue, settodo] = useState(todo);
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState(false);

  function shownotification(message) {
    setOpen(true);
    setmessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastC.Provider value={{ shownotification }}>
        <div
          className="rtl App flex   justify-center items-center min-h-screen bg-purple-600 "
          style={{ direction: "rtl" }}
        >
          <SimpleSnackbar open={open} message={message} />
          <TodoContext.Provider value={{ initialvalue, settodo }}>
            <ToDo />
          </TodoContext.Provider>
        </div>
      </ToastC.Provider>
    </ThemeProvider>
  );
}

export default App;
