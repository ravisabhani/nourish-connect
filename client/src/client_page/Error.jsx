import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div className='error_box gap-4'>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <NavLink to="/">Go to Home Page</NavLink>
        </div>
    );
}

export default Error;
