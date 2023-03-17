import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { connect } from "react-redux";
import { addTodos } from "../@redux/reducer";

//** Redux
const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todo = (props) => {
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      });
      setTodo("");
    }
  };
  return (
    <Box className="addTodos">
      <Box style={{ display: "flex", alignItems: "center" }}>
        <TextField variant="outlined" onChange={handleChange} />
        <Button variant="outlined" onClick={add} style={{ marginLeft: "5%" }}>
          Add
        </Button>
      </Box>
      <br />
      {/* <ul>
        {props.todos.length > 0 &&
          props.todos.map((item) => {
            return <li key={item.id}>{item.item}</li>;
          })}
      </ul> */}
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
