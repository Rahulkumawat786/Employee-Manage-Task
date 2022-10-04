import React, { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import axios from "axios";
const App = () => {
  const [showpopup, setShowpopup] = useState(false);
  const [size, setSize] = useState(0);
  const [filter, setFilter] = useState("All");
  const [mytasks, setMyTasks] = useState([]);
  useEffect(() => {
    console.log("entered in useeffect");
    const fetchdata = async () => {
      const data = await axios.get(
        `http://localhost:5000/api/taskcontroll?filter=${filter}`
      );
      setMyTasks(data.data);
      setSize(mytasks.length);
    };
    fetchdata();
  }, [filter]);
  const handleSortingPriority = () => {
    const tempdata = [].concat(mytasks);
    tempdata.sort((a, b) => a.priority - b.priority);
    setMyTasks(tempdata);
    // mytasks.sort((a, b) => b.priority - a.priority);
  };
  return (
    <>
      {/* heading of the App */}
      <div className="middle">
        <h1>DriveSales Employee Tasks</h1>
      </div>
      {/* tasks */}
      <div className="middle task-update">
        <div className="btn">
          <button onClick={() => setShowpopup(true)}>Add Task</button>
        </div>
        <div className="btn">
          <button onClick={handleSortingPriority}>Sort priority</button>
        </div>
        <div className="filter">
          <select id="filter-task" onChange={(e) => setFilter(e.target.value)}>
            <option value={"All"}>All</option>
            <option value={"Completed"}>Completed</option>
            <option value={"Incomplete"}>Incomplete</option>
          </select>
        </div>
      </div>
      <div className="middle">
        <div className="header">
          <h2>Priority</h2>
          <h2>Title</h2>
          <h2>Start</h2>
          <h2>End</h2>
          <h2>Status</h2>
          <h2>Actions</h2>
        </div>
      </div>
      <div className="middle">
        {mytasks.length === 0
          ? "No tasks available"
          : mytasks.map((ob) => (
              <Task
                key={ob._id}
                id={ob._id}
                title={ob.title}
                priority={ob.priority}
                description={ob.decription}
                startdatetime={ob.StartDateTime}
                enddatetime={ob.EndDateTime}
                status={ob.status}
                filter={filter}
                updateTasks={setMyTasks}
              />
            ))}
      </div>
      {showpopup ? (
        <AddTask
          t=""
          pr=""
          st=""
          en=""
          sta=""
          show={setShowpopup}
          Add={true}
          updateTasks={setMyTasks}
          filter={filter}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default App;
