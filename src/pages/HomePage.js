import React from "react";
import { Box } from "@mui/material";
import { connect } from "react-redux";
import { addTodos } from "../@redux/reducer";
import Todo from "../components/Todo";
import TodoShow from "../components/TodoShow";
import "../App.css";
import FooterIllustrationsV1 from "../components/FooterIllustration";

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

const HomePage = () => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Todo />
      <TodoShow />
      <FooterIllustrationsV1 />
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
