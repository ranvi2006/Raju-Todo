import { useEffect, useState } from 'react'
// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";



function App() {
  const [date, setDate] = useState("");
  const [count, setCount] = useState("");
  const [user1, serUser1] = useState("anokhi");
  const [user2, serUser2] = useState("raju");
  const [todos1, setTodos1] = useState([]);
  const [todos2, setTodos2] = useState([]);

  useEffect(() => {
    const today = new Date(); // creates a Date object for the current date

    // Format to YYYY-MM-DD
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);

    async function getData() {

      const res1 = await axios.post("https://raju-todo.onrender.com/todo", { user: user1, date: date });
      const res2 = await axios.post("https://raju-todo.onrender.com/todo", { user: user2, date: date });
      setTodos1(res1.data.todos);
      setTodos2(res2.data.todos);

    }
    getData();


  }, []);
  function handleDate(e) {
    setDate(e.target.value);
  }


  return (
    <>
      <nav className="navbar" style={{
        background: "linear-gradient(90deg, #4b6cb7, #182848)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        padding: "1rem 0"
      }}>
        <div className="container d-flex justify-content-center">
          <form className="d-flex align-items-center" >
            <input
              type="date"
              value={date}
              onChange={handleDate}
              required
              className="form-control me-2"
              style={{
                borderRadius: "50px",
                border: "none",
                padding: "0.5rem 1rem",
                minWidth: "200px",
                textAlign: "center"
              }}
            />
          </form>
        </div>
      </nav>
      <main className='container'>
        <div className="row">
          <div className="col-6">
            {todos1.map((res) => {
              return <h3>{res.data}</h3>
            })}
          </div>
          <div className="col-6">
            {todos2.map((res) => {
              return <h3>{res.data}</h3>
            })}
          </div>
          
        </div>

      </main>

    </>
  )
}

export default App
