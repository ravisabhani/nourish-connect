import React from 'react'
import { NavLink,Navigate} from 'react-router-dom';
import './navbar.css'
import menu from '../../image/menu.png'
import { useAuth } from '../../store/auth';

export const Navbar = () => {

    const {isloggedin,user} = useAuth();
    
    let userpic = '';

    if (user && user.profilePic) {
        const filePath = user.profilePic;
        userpic = filePath.replace(/^.*[\\\/]/, '');
    }

    return (
        <>
            <div className="container-fluid position-absolute">
                <div className="row">
                    <div className="col-md-9 col-12 mx-auto">
                        <nav className="navbar navbars navbar-expand-lg">
                            <a href="index.html" className="navbar-brand">
                                <h2 className="m-0 nav-brand">Nourish</h2>
                            </a>
                            <button type="button" className="navbar-toggler shadow-none" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span><img src={menu} alt="" width="25"/></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav mx-auto">
                                    <NavLink to="/" className="nav-item nav-link active">Home</NavLink>
                                    <NavLink to="about" className="nav-item nav-link">About Us</NavLink>
                                    <NavLink to="contact" className="nav-item nav-link">Contact</NavLink>
                                    <NavLink to="dashboard/home" className="nav-item nav-link">Dashboard</NavLink>
                                    {user.isadmin === 'true' ? (<NavLink to="/admin/home" className="nav-item nav-link">Admin</NavLink>):""}
                                </div>
                                <div className='d-flex align-items-center'>
                                    {
                                        isloggedin ? (
                                            <>
                                                <div className='d-flex align-items-center'>
                                                    <h6 className='text-white me-3 mb-0'>{user.name}</h6>
                                                    <div className='user-image me-3'>
                                                        <img src={`../../profile/${userpic}`} alt="user" />
                                                    </div>
                                                </div>
                                                <NavLink to="logout" className="btn-fir py-2 px-3 signup nav-item nav-link" id='btn'>Logout</NavLink>
                                            </>
                                        )
                                    :
                                        <>
                                            <NavLink to="signin" className="btn-fir py-2 px-3 signin nav-item nav-link me-2" id='btn'>Login</NavLink>
                                            <NavLink to="signup" className="btn-sec py-2 px-3 signup nav-item nav-link" id='btn'>Signup</NavLink>
                                        </>
                                    }
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}


