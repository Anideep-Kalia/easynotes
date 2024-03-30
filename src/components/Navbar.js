import React, {useEffect} from 'react'             // here we are using hooks if youn were unable to find that in the name of useEffect
import { Link, useLocation } from 'react-router-dom'  // here we have imported useLocation from router which we can only use when we are using hooks
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();            // using useLoaction hook in which we taking output of the location of tab in which we are
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">EasyNotes</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/" ? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about" ? "active":""}`} to="/about">About</Link>
        </li>
      </ul>
      </div>

      {!localStorage.getItem('token')?
      <div class="d-grid gap-2 d-md-block">
      <Link to="/login" className="btn btn-success mx-2" type="button">Login</Link>
      <Link to="/signup" className="btn btn-primary" type="button">Sign Up</Link>
      </div>:<button className='btn btn-primary' onClick={handleLogout}>Log Out</button>}

  </div>
</nav>
    </div>
  )
}

export default Navbar
