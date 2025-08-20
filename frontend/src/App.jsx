import { useState } from 'react'
// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
   const [date, setDate] = useState("");

     

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
            onChange={(e) => setDate(e.target.value)}
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
      
    </>
  )
}

export default App
