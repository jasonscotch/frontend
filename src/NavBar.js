import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <Navbar expand="md">
        <Nav className="mr-auto" navbar>
            <NavItem>
               <NavLink exact to="/" className="navbar-brand">
                    Jobly
                </NavLink> 
            </NavItem>
          {currentUser && 
          <>
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/" onClick={logout}>Log Out {currentUser.firstName}</NavLink>
            </NavItem>
          </>
          }

          {!currentUser &&
            <>
              <NavItem>
                <NavLink to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>
            </>
          }
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
