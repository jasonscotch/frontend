import { useState, useEffect } from "react";
import Routing from './Routing.js';
import JoblyApi from "./api.js";
import UserContext from './UserContext.js';
import './App.css';
import {jwtDecode} from "jwt-decode";


function App() {

  const [currentUser, setCurrentUser] = useState({ data: null });
  const [loading, setLoading] = useState(true);
  const [appliedIds, setAppliedIds] = useState(new Set([]));

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
        setLoading(true);
        if (JoblyApi.token) {
            const { username } = jwtDecode(JoblyApi.token);
            const currentUser = await JoblyApi.getCurrentUser(username);
          
            const appliedJobsSet = new Set(currentUser.applications || []);

            setCurrentUser({ data: currentUser });
            setAppliedIds(appliedJobsSet);
        } else {
            setCurrentUser({ data: null });
        }
    } catch (e) {
        console.error('loadUserData problem:', e);
        setCurrentUser({ data: null });
    } finally {
        setLoading(false);
    }
  };
  
  const loginUser = async (loginData) => {
    try {
        let token = await JoblyApi.loginUser(loginData);
        JoblyApi.setToken(token);
        getCurrentUser();
      } catch (e) {
          console.error('Login error:', e);
      }
    }

    const signupUser = async (signupData) => {
        try {
            let token = await JoblyApi.signupUser(signupData);
            JoblyApi.setToken(token);
            getCurrentUser();
        } catch (e) {
            console.error('Signup error:', e);
        }
    }

    const logout = () => {
        setCurrentUser({ data: null });
        // setToken(null);
        JoblyApi.clearToken();
    }

    const appliedJobs = (id) => {
      // console.log(appliedIds);
      return appliedIds.has(id);
    }
    
    const apply = async (id) => {
      if (appliedJobs(id)) return;
      try {
        await JoblyApi.apply(currentUser.data.username, id);
        setAppliedIds((prevIds) => new Set([...prevIds, id]));
      } catch (e) {
        console.error('Error applying to job:', e);
      }
    }

  return (
    <UserContext.Provider 
        value={{
            currentUser: currentUser.data,
            setCurrentUser,
            appliedJobs,
            apply
        }}
    > 
      <div className="App">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Routing currentUser={currentUser.data} logout={logout} loginUser={loginUser} signupUser={signupUser} getCurrentUser={getCurrentUser} />
          )}
       
      </div>
    </UserContext.Provider >
  );
}

export default App;
