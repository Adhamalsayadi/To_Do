import * as React from "react";
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
import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ToDo() {
  const [inputname, setname] = useState({ name: "", body: "" });
  const { initialvalue, settodo } = useContext(TodoContext);
  const [TodoCatagores, setTodoCatagores] = useState("all");
  const ToDoDone = initialvalue.filter((t) => {
    return t.done === true;
  });
  const Notdone = initialvalue.filter((t) => {
    return t.done === false;
  });
  let showntodo = initialvalue;
  if (TodoCatagores === "Not") {
    showntodo = Notdone;
  } else if (TodoCatagores === "Done") {
    showntodo = ToDoDone;
  }

  const ToDos = showntodo.map(function (ele) {
    return <ToDoMain key={ele.id} todo={ele} />;
  });

  useEffect(() => {
    const stortodo = JSON.parse(localStorage.getItem("todo"));
    settodo(stortodo);
  }, [settodo]);
  const lockAdd = inputname.name === "" || inputname.body === "";
  return (
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
                  const newtodo = {
                    id: uuidv4(),
                    name: inputname.name,
                    body: inputname.body,
                    done: false,
                  };
                  const upstore = [...initialvalue, newtodo];
                  settodo(upstore);
                  localStorage.setItem("todo", JSON.stringify(upstore));
                  setname({ name: "", body: "" });
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
  );
}
