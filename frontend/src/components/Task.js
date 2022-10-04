import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import AddTask from "./AddTask";
import axios from "axios";
import "./Task.css";
const Task = ({
  id,
  priority,
  description,
  title,
  startdatetime,
  enddatetime,
  status,
  filter,
  updateTasks,
}) => {
  const [show, setShow] = useState(false);
  const handleDeleteTask = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let data = await axios.delete(
        "http://localhost:5000/api/taskcontroll",
        {
          data: {
            id,
            title,
            description,
            startdatetime,
            enddatetime,
            priority,
            status,
          },
        },
        config
      );
      // console.log(data.data);
      data = await axios.get(
        `http://localhost:5000/api/taskcontroll?filter=${filter}`
      );
      // console.log(data.data);
      updateTasks(data.data);
    } catch (error) {
      console.log("error occured");
    }
  };
  return (
    <>
      {show ? (
        <AddTask
          id={id}
          pr={priority}
          d={description}
          t={title}
          st={startdatetime}
          en={enddatetime}
          sta={status}
          show={setShow}
          Add={false}
          updateTasks={updateTasks}
          filter={filter}
        />
      ) : (
        ""
      )}
      <div className="row">
        <div>{priority}</div>
        <div title={description}>{title}</div>
        <div>{startdatetime}</div>
        <div>{enddatetime}</div>
        <div>{status}</div>
        <div>
          <FaTrashAlt className="icons" onClick={handleDeleteTask} />
          <AiFillEdit className="icons" onClick={() => setShow(true)} />
        </div>
      </div>
    </>
  );
};
export default Task;
