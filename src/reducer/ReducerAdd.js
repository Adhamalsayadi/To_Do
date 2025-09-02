import { v4 as uuidv4 } from "uuid";
// const [inputname, setname] = useState({ name: "", body: "" });
// const { initialvalue, settodo } = useContext(TodoContext);

export default function Reducer(currentTodo, action) {
  switch (action.type) {
    case "add": {
      const newtodo = {
        id: uuidv4(),
        name: action.payload.name,
        body: action.payload.body,
        done: false,
      };
      const upstore = [...currentTodo, newtodo];
      localStorage.setItem("todo", JSON.stringify(upstore));
      //setname({ name: "", body: "" });
      // shownotification("تم اضافة المهمة");
      return upstore;
    }
    case "delete": {
      const deletedone = currentTodo.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem("todo", JSON.stringify(deletedone));

      return deletedone;
    }
    case "edit": {
      const editedone = currentTodo.map((t) => {
        return t.id === action.payload.id
          ? { ...t, name: action.payload.name, body: action.payload.body }
          : t;
      });
      localStorage.setItem("todo", JSON.stringify(editedone));
      return editedone;
    }
    case "store": {
      const stortodo = JSON.parse(localStorage.getItem("todo")) ?? [];
      return stortodo;
    }
    case "done": {
      const updatedchecked = currentTodo.map((t) => {
        return t.id === action.payload.id ? { ...t, done: !t.done } : t;
      });

      localStorage.setItem("todo", JSON.stringify(updatedchecked));
      return updatedchecked;
    }
    default:
      throw Error("on", action.type);
  }
  return [];
}
