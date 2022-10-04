import React, { useState } from "react";
import axios from "axios";
import "./Task.css";
const AddTask = ({
  id,
  t,
  d,
  st,
  en,
  pr,
  sta,
  show,
  Add,
  updateTasks,
  filter,
}) => {
  const [title, setTitle] = useState(t);
  const [description, setDescription] = useState(d);
  const [startdatetime, setStart] = useState(st);
  const [enddatetime, setEnd] = useState(en);
  const [priority, setPriority] = useState(pr);
  const [status, setStatus] = useState(sta);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Add) {
      //logic for adding a new task
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        let data = await axios.post(
          "http://localhost:5000/api/taskcontroll",
          {
            title,
            description,
            startdatetime,
            enddatetime,
            priority,
            status,
          },
          config
        );
        data = await axios.get(
          `http://localhost:5000/api/taskcontroll?filter=${filter}`
        );
        updateTasks(data.data);
      } catch (error) {
        console.log("error occured");
      }
    } else {
      //logic for updating an task
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        let data = await axios.put(
          "http://localhost:5000/api/taskcontroll",
          {
            id,
            title,
            description,
            startdatetime,
            enddatetime,
            priority,
            status,
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
    }
    setTitle("");
    setDescription("");
    setEnd("");
    setPriority("");
    setStart("");
    setStatus("");
    show(false);
  };
  return (
    <div className="pop-box">
      <div className="form-input">
        <label>{Add ? "Add Task" : "Update Task"}</label>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="input-field"
            type="text"
            placeholder="Title of the Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="input-field-date">
            <span>Start Date</span>
            <input
              type="date"
              placeholder="Start Date"
              value={startdatetime}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
          <div className="input-field-date">
            <span>End Date</span>
            <input
              type="date"
              placeholder="Start Date"
              value={enddatetime}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>
          <input
            className="input-field"
            type="number"
            min={0}
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          />
          <select
            className="input-field"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option className="input-field" value="completed">
              Task Completed
            </option>
            <option className="input-field" value="incomplete">
              Task Incomplete
            </option>
          </select>
          <input className="submit-btn" type="submit" value="Submit" />
        </form>
        <button className="cancil-btn" onClick={() => show(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};
export default AddTask;
