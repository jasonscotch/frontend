import { useState } from "react"
import './SearchBar.css';

function SearchForm({ search }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        search(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="searchBar">
            <form onSubmit={handleSubmit} className="searchBar-form">
                <input
                    className="search"
                    name='searchTerm'
                    placeholder="Enter search term"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" className="button-84">Search</button>
            </form>
        </div>
    )
}

export default SearchForm;