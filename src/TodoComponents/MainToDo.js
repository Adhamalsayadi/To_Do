import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { TodoContext } from "../Contexts/ToDoContext";
import { ToastC } from "../Contexts/ToastContext";
import { useContext, useState } from "react";

export default function ToDoMain({ todo, shedit, shdelete }) {
  const { initialvalue, settodo } = useContext(TodoContext);
  const { shownotification } = useContext(ToastC);

  function Done() {
    const updatedchecked = initialvalue.map((t) => {
      return t.id === todo.id ? { ...t, done: !t.done } : t;
    });

    settodo(updatedchecked);
    localStorage.setItem("todo", JSON.stringify(updatedchecked));
    shownotification("تمت المهمة! تهانينا");
  }

  return (
    <>
      <Card sx={{ minWidth: 275 }} className="my-2">
        <CardContent className="text-right  bg-blue-400 hover:py-8 transition-all duration-300">
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5"> {todo.name} </Typography>
              <Typography className="py-2 text-white" variant="h6">
                {todo.body}
              </Typography>
            </Grid>
            <Grid
              className="!flex !flex-wrap !justify-around !items-center"
              size={4}
            >
              {/* done todo */}
              <IconButton
                className="hover:!bg-green-400 transition-all w-10 h-10 !duration-300 !ease-out "
                aria-label="delete"
                style={{
                  backgroundColor: todo.done ? "blue" : "white",
                  color: todo.done ? "white" : "gray",
                }}
                onClick={() => {
                  Done();
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* done todo */}
              <IconButton
                onClick={() => {
                  shedit(todo);
                }}
                className="hover:!bg-green-200 transition-all w-10 h-10 duration-300 !ease-out !md:ease-in"
                aria-label="delete"
                style={{ backgroundColor: "white", color: "gray" }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>{" "}
              <IconButton
                aria-label="delete"
                className="hover:!bg-red-400 transition-all w-10 h-10 duration-300 ease-in  "
                style={{ backgroundColor: "white", color: "gray" }}
                onClick={() => {
                  shdelete(todo);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <hr class="border-1 border-white-100 my-1" /> */}
    </>
  );
}
