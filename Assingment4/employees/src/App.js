import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import Employees from "./components/Employees";
import AddMembers from "./components/AddMembers";
import EditMember from "./components/EditMember";
import { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [members, setTasks] = useState([]);
  const [selectedMemberData, setSelectedMemberData] = useState(null);
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

 
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5001/members");
    const data = await res.json();

    return data;
  };

 

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5001/members/${id}`);
    const data = await res.json();

    return data;
  };

 
  const addTask = async (member) => {
    const res = await fetch("http://localhost:5001/members", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(member),
    });

    const data = await res.json();

    setTasks([...members, data]);
  };

 
  const editTask = async (id, updatedMember) => {
    await fetch(`http://localhost:5001/members/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMember),
    });

    setTasks((prevTasks) =>
      prevTasks.map((member) =>
        member.id === id ? { ...member, ...updatedMember } : member
      )
    );
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5001/members/${id}`, {
      method: "DELETE",
    });
    setTasks(members.filter((member) => member.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5001/members/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      members.map((member) =>
        member.id === id ? { ...member, reminder: data.reminder } : member
      )
    );
  };
  return (
    <Router>
      <div className="app">
        <EmployeeForm
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Employees
                members={members}
                onDelete={deleteTask}
                onToggle={toggleReminder}
                onEdit={(id) =>
                  setSelectedMemberData(
                    members.find((member) => member.id === id)
                  )
                }
              />
            }
          />
          <Route path="/add" element={<AddMembers onAdd={addTask} />} />
          <Route
            path="/edit/:id"
            element={
              <EditMember member={selectedMemberData} onEdit={editTask} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
