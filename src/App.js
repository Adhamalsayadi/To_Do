import "./App.css";
import ToDo from "./TodoComponents/ToDo.js";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastC } from "./Contexts/ToastContext.js";
import { useState } from "react";
import SimpleSnackbar from "./TodoComponents/SnackBar.js";
import ReducerProvider from "./Contexts/ToDoContext";

const theme = createTheme({
  typography: {
    fontFamily: "playsans",
  },
});

function App() {
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
      <ReducerProvider>
        <ToastC.Provider value={{ shownotification }}>
          <div
            className="rtl App flex   justify-center items-center min-h-screen bg-purple-600 "
            style={{ direction: "rtl" }}
          >
            <SimpleSnackbar open={open} message={message} />
            <ToDo />
          </div>
        </ToastC.Provider>
      </ReducerProvider>
    </ThemeProvider>
  );
}

export default App;
