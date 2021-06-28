import React from "react";
import "../css/home.css";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../_redux/rootReducer";
import Tasks from "./Tasks";

function Home() {
  const task = useSelector((state) => state.tasks);
  localStorage.setItem("userTask", JSON.stringify(task));
  const dispatch = useDispatch();

  // on draging start set the current data in dataTransfer object
  const handleDragStart = (e, params) => {
    e.dataTransfer.setData("params", JSON.stringify(params));
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // on drag drop get the current data in dataTransfer object
  // with getting data we also fetch the status in which task we dropping data according to that dispatching event

  const handleOnDrop = (e, status) => {
    let params = JSON.parse(e.dataTransfer.getData("params"));

    dispatch({
      type: actionTypes.TASK_DROP,
      item: params,
      status: status,
    });
  };

  return (
    <>
      <Header />
      <div className="home">
        <div
          className="todo__task _task__style"
          onDrop={(e) => handleOnDrop(e, "todo")}
          onDragOver={(e) => handleDragOver(e)}
        >
          <h5 className="heading">To Do Task</h5>
          <div className="tasks">
            {task.map((val, i) => {
              return val.status && val.status === "todo" ? (
                <Tasks
                  key={val.id}
                  val={val}
                  handleDragStart={handleDragStart}
                  color="#5867dd"
                />
              ) : null;
            })}
          </div>
        </div>

        <div
          className="inprogress__task _task__style"
          onDrop={(e) => handleOnDrop(e, "inprogress")}
          onDragOver={(e) => handleDragOver(e)}
        >
          <h5 className="heading">Inprogress Task</h5>
          <div className="tasks">
            {task.map((val, i) => {
              return val.status && val.status === "inprogress" ? (
                <Tasks
                  key={val.id}
                  val={val}
                  handleDragStart={handleDragStart}
                  color="#6DA9DD"
                />
              ) : null;
            })}
          </div>
        </div>

        <div
          className="done__task _task__style"
          onDrop={(e) => handleOnDrop(e, "done")}
          onDragOver={(e) => handleDragOver(e)}
        >
          <h5 className="heading">Done Task</h5>
          <div className="tasks">
            {task.map((val, i) => {
              return val.status && val.status === "done" ? (
                <Tasks
                  key={val.id}
                  val={val}
                  handleDragStart={handleDragStart}
                  color="#35a630"
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
