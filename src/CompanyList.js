import { useState, useEffect } from 'react';
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';
import JoblyApi from './api';

function CompanyList() {
    
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        search();
      }, []);

    const search = async (name) => {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }
    
    return (
        <div>
          <SearchBar search={search} />
          {companies.length ? (
              <div>
                {companies.map(company => (
                  <CompanyCard
                    key={company.handle}
                    company={company}
                  />
                ))}
              </div>
            ) : (<p>Apologies, but no results were found!</p>)}
        </div>
      );
}

export default CompanyList;