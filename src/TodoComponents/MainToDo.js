import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { TodoContext } from "../Contexts/ToDoContext";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function ToDoMain({ todo, Checked }) {
  const [deleteTodo, setdelete] = useState(false);
  const [editTodo, setedit] = useState(false);
  const [updatTodo, seteupdate] = useState({
    name: todo.name,
    body: todo.body,
  });
  const { initialvalue, settodo } = useContext(TodoContext);

  function Done() {
    settodo(
      initialvalue.map((t) => {
        return t.id === todo.id ? { ...t, done: !t.done } : t;
      })
    );
  }
  return (
    <>
      {/* delete modal  */}
      <Dialog
        open={deleteTodo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
        onClose={() => {
          setdelete(false);
        }}
      >
        <DialogTitle id="alert-dialog-title" className="text-right">
          {"هل انت متاكد من حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="!text-red-600 !font-bold"
          >
            ملاحظة: في حالة الحذف لا يمكنك استعادة اي من المحذوفات
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="!text-green-600 !font-bold"
            onClick={() => {
              setdelete(false);
            }}
          >
            الغاء
          </Button>
          <Button
            autoFocus
            className="!text-red-600 !font-bold"
            onClick={() => {
              settodo(
                initialvalue.filter((t) => {
                  return t.id !== todo.id;
                })
              );
              setdelete(false);
            }}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* edit modal  */}
      <Dialog
        open={editTodo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
        onClose={() => {
          setedit(false);
        }}
      >
        <DialogTitle id="alert-dialog-title" className="text-right">
          {"هل انت متاكد من حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            value={updatTodo.name}
            onChange={(e) => {
              seteupdate({ ...updatTodo, name: e.target.value });
            }}
            id="name"
            name="email"
            label="اسم المهمة"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            value={updatTodo.body}
            onChange={(e) => {
              seteupdate({ ...updatTodo, body: e.target.value });
            }}
            margin="dense"
            id="name"
            name="email"
            label="تفاصيل المهمة"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="!text-green-600 !font-bold"
            onClick={() => {
              setedit(false);
            }}
          >
            تراجع
          </Button>
          <Button
            autoFocus
            className="!text-red-600 !font-bold"
            onClick={() => {
              settodo(
                initialvalue.map((t) => {
                  return t.id === todo.id
                    ? { ...t, name: updatTodo.name, body: updatTodo.body }
                    : t;
                })
              );
              setedit(false);
            }}
          >
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ minWidth: 275 }} className="my-2">
        <CardContent className="text-right  bg-blue-400 hover:py-8 transition-all duration-300">
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5"> {todo.name} </Typography>
              <Typography className="py-2 text-white" variant="h6">
                {todo.body}
              </Typography>
            </Grid>
            <Grid className="!flex !justify-around !items-center" size={4}>
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
                  setedit(true);
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
                  setdelete(true);
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
