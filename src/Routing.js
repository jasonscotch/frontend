import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from "./Home.js";
import CompanyList from "./CompanyList.js";
import Company from "./Company.js";
import JobList from "./JobList.js";
import LoginForm from "./LoginForm.js";
import SignUpForm from "./SignUpForm.js";
import ProfileForm from "./Profile.js";
import NavBar from "./NavBar.js";
import JoblyApi from "./api.js";
import './Routing.css';



const Routing = ({ currentUser, logout, loginUser, signupUser, getCurrentUser }) => {

    const [companies, setCompanies] = useState([]);
    const [jobs, setJobs] = useState([]);

    const fetchData = async () => {
        try {
            let companies = await JoblyApi.getCompanies();
            let jobs = await JoblyApi.getJobs();

            setCompanies(companies);
            setJobs(jobs);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <BrowserRouter>
            <NavBar logout={logout} />
            <main>
                <Routes>
                    {!currentUser &&
                    <>
                        <Route exact path='/login' element={<LoginForm loginUser={loginUser} />} />
                        <Route exact path='/signup' element={<SignUpForm signupUser={signupUser} />} />
                    </>
                    }
                    <Route exact path='/' element={<Home />} />
                    {currentUser &&
                    <>
                        <Route exact path='/companies' element={<CompanyList companies={companies} />} />
                        <Route exact path='/companies/:handle' element={<Company companies={companies}/>} />
                        <Route exact path='/jobs' element={<JobList jobs={jobs}/>} />
                        <Route exact path='/profile' element={<ProfileForm getCurrentUser={getCurrentUser} />} />
                    </>
                    }
                    <Route path='*' element={<Navigate to='/' />}/>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default Routing;
