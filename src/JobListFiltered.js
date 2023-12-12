import JobCard from "./JobCard";

function JobListFiltered({ jobs }) {

    return (
        <div>
            {jobs.map(job => (
                <JobCard 
                    key={job.id}
                    job={job}
                />
            ))}
        </div>
    );
}

export default JobListFiltered;