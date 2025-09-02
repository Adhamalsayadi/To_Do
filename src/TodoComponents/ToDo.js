import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDoMain from "./MainToDo";
import TextField from "@mui/material/TextField";
import { TodoContext } from "../Contexts/ToDoContext";
import { ToastC } from "../Contexts/ToastContext";
import { useState, useContext, useEffect, useMemo } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

export default function ToDo() {
  const { initialvalue, dispatch } = useContext(TodoContext);
  const { shownotification } = useContext(ToastC);

  const [inputname, setname] = useState({ name: "", body: "" });
  const [deleteTodo, setdelete] = useState(false);
  const [dialogv, setdialogv] = useState(null);
  const [dialoge, setdialoge] = useState(null);
  const [editTodo, setedit] = useState(false);

  const [TodoCatagores, setTodoCatagores] = useState("all");
  const ToDoDone = useMemo(() => {
    return initialvalue.filter((t) => {
      return t.done === true;
    });
  }, [initialvalue]);
  const Notdone = useMemo(() => {
    return initialvalue.filter((t) => {
      return t.done === false;
    });
  }, [initialvalue]);
  let showntodo = initialvalue;
  if (TodoCatagores === "Not") {
    showntodo = Notdone;
  } else if (TodoCatagores === "Done") {
    showntodo = ToDoDone;
  }

  useEffect(() => {
    dispatch({ type: "store" });
  }, [dispatch]);
  const lockAdd = inputname.name === "" || inputname.body === "";

  const ToDos = showntodo.map(function (ele) {
    return (
      <ToDoMain
        key={ele.id}
        todo={ele}
        shdelete={showdeletemodal}
        shedit={showeditmodal}
      />
    );
  });
  function showdeletemodal(todo) {
    setdialogv(todo);
    setdelete(true);
  }

  function showeditmodal(todo) {
    setdialoge(todo);
    setedit(true);
  }
  return (
    <>
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
          {"يمكنك التعديل على اسم ووصف المهمة"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            value={dialoge?.name || ""}
            onChange={(e) => {
              setdialoge({ ...dialoge, name: e.target.value });
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
            value={dialoge?.body || ""}
            onChange={(e) => {
              setdialoge({ ...dialoge, body: e.target.value });
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
              dispatch({
                type: "edit",
                payload: {
                  id: dialoge.id,
                  name: dialoge.name,
                  body: dialoge.body,
                },
              });

              setedit(false);
              shownotification("ثم التعديل بنجاح");
            }}
          >
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
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
              dispatch({
                type: "delete",
                payload: {
                  id: dialogv.id,
                  name: dialogv.name,
                  body: dialogv.body,
                },
              });
              setdelete(false);
              shownotification("تم حذف المهمة");
            }}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} className="!max-h-[90vh] !overflow-scroll">
          <CardContent>
            <Typography variant="h1">المهام</Typography>
            <hr className="border-1 border-white-100 my-1" />
            <ToggleButtonGroup
              color="primary"
              value={TodoCatagores}
              exclusive
              onChange={(e) => {
                setTodoCatagores(e.target.value);
                console.log(e.target.value);
              }}
              aria-label="Platform"
            >
              <ToggleButton value="all">الكل</ToggleButton>
              <ToggleButton value="Done">المنجز</ToggleButton>
              <ToggleButton value="Not">غير منجز</ToggleButton>
            </ToggleButtonGroup>
            {ToDos}

            <Grid container spacing={2} className=" my-2">
              <Grid
                size={8}
                className="!flex bg-white !justify-around  !items-center"
              >
                <TextField
                  id="outlined-basic"
                  label="اسم المهمة"
                  value={inputname.name}
                  variant="outlined"
                  className="w-full h-full"
                  onChange={(e) => {
                    setname({ ...inputname, name: e.target.value });
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="وصف المهمة"
                  value={inputname.body}
                  variant="outlined"
                  className="w-full h-full !mx-1"
                  onChange={(e) => {
                    setname({ ...inputname, body: e.target.value });
                  }}
                />
              </Grid>
              <Grid size={4} className="!flex  !justify-around !items-center">
                <Button
                  variant="outlined"
                  onClick={() => {
                    dispatch({
                      type: "add",
                      payload: { name: inputname.name, body: inputname.body },
                    });
                    setname({ name: "", body: "" });
                    shownotification("تم اضافة المهمة");
                  }}
                  disabled={lockAdd}
                  className={`!w-full !h-full !text-xl !text-bold ${
                    lockAdd
                      ? "!bg-red-600 !text-white"
                      : "!bg-green-600 !text-black "
                  }`}
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small" className="left">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
