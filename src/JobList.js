import { useState, useEffect } from "react";
import JobListFiltered from "./JobListFiltered";
import SearchBar from "./SearchBar";
import JoblyApi from "./api";
import './JobList.css';

function JobList() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        search();
    }, []);

    const search = async (title) => {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    return (
        <div className="card-list-container">
            <SearchBar search={search} />
            {jobs.length ? (
                <JobListFiltered jobs={jobs} />
            ) : (<p>Apologies, but no results were found!</p>)}
        </div>
    );
}

export default JobList;