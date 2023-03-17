import React, { useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };
  return (
    <li key={item.id} className="card">
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onClick={(e) => update(item.id, inputRef.current.value, e)}
      />
      <div className="btns">
        <button onClick={() => changeFocus()}>
          <EditIcon sx={{ color: "white" }} />
        </button>
        {item.completed === false && (
          <button
            style={{ color: "green" }}
            onClick={() => completeTodo(item.id)}
          >
            <CheckIcon />
          </button>
        )}
        <button style={{ color: "red" }} onClick={() => removeTodo(item.id)}>
          <DeleteIcon />
        </button>
      </div>
      {item.completed && <span className="completed">done</span>}
    </li>
  );
};

export default TodoItem;
