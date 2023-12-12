import React, { useState, useContext, useEffect } from 'react';
import UserContext from "./UserContext";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import './JobCard.css';

function JobCard({ job }) {
    const { appliedJobs, apply } = useContext(UserContext);

    const [applied, setApplied] = useState(false);

    useEffect(() => {
        const isJobApplied = appliedJobs(job.id);

        setApplied(isJobApplied);
    }, [appliedJobs, job.id]);

    const handleApply = async () => {
        if (applied) return;

        try {
            await apply(job.id);
            setApplied(true);
        } catch (e) {
            console.error('Error applying to job:', e);
        }
    }

    const formattedSalary = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(job.salary);
    

    return (
        <Card className='card-container'>
            <CardBody>
                <CardTitle className="font-weight-bold">
                    {job.title}
                </CardTitle>
                <CardText>
                    {job.companyName}
                    <p>Salary: {formattedSalary}</p>
                    <p>Equity: {job.equity}</p>
                    <button onClick={handleApply} disabled={appliedJobs(job.id)} className='button-85'>{appliedJobs(job.id) ? 'Applied' : 'Apply'}</button>
                </CardText>
            </CardBody>
        </Card>
    );
}

export default JobCard;