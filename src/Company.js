import { React, Navigate, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobListFiltered from "./JobListFiltered";
import JoblyApi from "./api";

function Company() {
    const { handle } = useParams();

    const [company, setCompany] = useState(null);
    
    useEffect(() => {
        getCompanyAndJobs();
    }, [handle]);

    const getCompanyAndJobs = async () => {
        let company = await JoblyApi.getCompany(handle);
        setCompany(company);
    }

      
    

    return (
        <div>
            {company ? (
                <>
                <h2>{company.name}</h2>
                <p>{company.description}</p>
                <p>Number of Employees: {company.numEmployees}</p>
                <JobListFiltered jobs={company.jobs} /> 
                </>
            ) : (<p>Loading...</p>)}
        </div>
    )
}

export default Company;