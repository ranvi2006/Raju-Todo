import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function App() {
  const [date, setDate] = useState("");
  const [user1, setUser1] = useState("anokhi");
  const [user2, setUser2] = useState("raju");
  const [todos1, setTodos1] = useState([]);
  const [todos2, setTodos2] = useState([]);
  const [newTodo1, setNewTodo1] = useState("");
  const [newTodo2, setNewTodo2] = useState("");

  // Fetch todos function
  const fetchTodos = async (selectedDate) => {
    try {
      const res1 = await axios.post("https://raju-todo.onrender.com/todo", { user: user1, date: selectedDate });
      const res2 = await axios.post("https://raju-todo.onrender.com/todo", { user: user2, date: selectedDate });

      setTodos1(res1.data.todos);
      setTodos2(res2.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
    fetchTodos(today);
  }, []);

  const handleDate = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    fetchTodos(selectedDate);
  };

  const handleAddTodo = async (user, todo, setTodos, setNewTodo) => {
    if (!todo.trim()) return;
    try {
      await axios.post("https://raju-todo.onrender.com/add", { 
        user,
        data: todo,
        date
      });
      setNewTodo("");
      fetchTodos(date);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleMarkDone = async (todoId) => {
    try {
      const res = await axios.post("https://raju-todo.onrender.com/done", { todoId });
      if (res.data.success) {
        fetchTodos(date); // refresh todos after marking done
      }
    } catch (error) {
      console.error("Error marking todo as done:", error);
    }
  };

  const handleDelete = async (todoId) => {
    // try {
    //   const res = await axios.post("https://raju-todo.onrender.com/delete", { todoId });
    //   if (res.data.success) {
    //     fetchTodos(date);
    //   }
    // } catch (error) {
    //   console.error("Error deleting todo:", error);
    // }
  };

  // Calculate performance
  const getPerformance = (todos) => {
    if (todos.length === 0) return 0;
    const doneCount = todos.filter(todo => todo.completed).length;
    return Math.round((doneCount / todos.length) * 100);
  };

  const todayFormatted = new Date().toISOString().split("T")[0];
  const isTodayOrFuture = date >= todayFormatted;

  return (
    <>
      <nav className="navbar" style={{
        background: "linear-gradient(90deg, #4b6cb7, #182848)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        padding: "1rem 0"
      }}>
        <div className="container d-flex justify-content-center">
          <input
            type="date"
            value={date}
            onChange={handleDate}
            className="form-control me-2 text-center"
            style={{ borderRadius: "50px", border: "none", minWidth: "200px" }}
          />
        </div>
      </nav>

      <main className='container mt-4'>
        <div className="row g-4">

          {/* User 1 Todos */}
          <div className="col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Anokhi's Todos</h4>
              <span className="badge bg-info text-dark">Performance: {getPerformance(todos1)}%</span>
            </div>

            {isTodayOrFuture && (
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter todo"
                  value={newTodo1}
                  onChange={(e) => setNewTodo1(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddTodo(user1, newTodo1, setTodos1, setNewTodo1)}
                >
                  Add
                </button>
              </div>
            )}

            {todos1.map((todo, index) => (
              <div key={index} className="card mb-2 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                    {todo.data}
                  </span>
                  {isTodayOrFuture && (
                    <div>
                      <button onClick={() => handleMarkDone(todo._id)} className="btn btn-success btn-sm me-2">Done</button>
                      <button onClick={() => handleDelete(todo._id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* User 2 Todos */}
          <div className="col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Raju's Todos</h4>
              <span className="badge bg-info text-dark">Performance: {getPerformance(todos2)}%</span>
            </div>

            {isTodayOrFuture && (
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter todo"
                  value={newTodo2}
                  onChange={(e) => setNewTodo2(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddTodo(user2, newTodo2, setTodos2, setNewTodo2)}
                >
                  Add
                </button>
              </div>
            )}

            {todos2.map((todo, index) => (
              <div key={index} className="card mb-2 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                    {todo.data}
                  </span>
                  {isTodayOrFuture && (
                    <div>
                      <button onClick={() => handleMarkDone(todo._id)} className="btn btn-success btn-sm me-2">Done</button>
                      <button onClick={() => handleDelete(todo._id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}

export default App;
