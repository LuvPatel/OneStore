import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './navigation.css';

export const Navigation = ({handleSignOut}) => {
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
  }, []);
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            {/* <span className="sr-only">Toggle navigation</span>{" "} */}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top" style={{ marginLeft: '10px' }}>
            OneStore
          </a>{" "}
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
          <li>
              <a href="/" className="page-scroll">
                Home
              </a>
            </li>
            <li>
              <a href="/upload" className="page-scroll">
                upload
              </a>
            </li>
            <li>
              <a href="/myFiles" className="page-scroll">
                MyFiles
              </a>
            </li>
            <li>
              <a href="/myFiles" className="page-scroll">
                Delete
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
            {userId ? (
              <Link to="/" onClick={handleSignOut} style={{color:'red'}} className="page-scroll">
                Sign Out
              </Link>
            ) : (
              <Link to="/signinnew" className="page-scroll">Sign In</Link>
            )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
