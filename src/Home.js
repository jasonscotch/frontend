import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import UserContext from "./UserContext";

function Home() {
    const { currentUser } = useContext(UserContext);

    return (
        <div>
            <h1>Jobly</h1>
            <p>All the jobs of your dreams at your finger tips</p>
            {currentUser && 
                <>
                <h3>Welcome back {currentUser.firstName}!</h3>
                </>
            }
            {!currentUser && 
                <>
                    <Link to='/login'><button className='button-85'>Log in</button></Link> <Link to='/signup'><button className='button-85'>Sign up</button></Link>
                </>
            }
            
        </div>
    );
}

export default Home;