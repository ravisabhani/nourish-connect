import React, { useEffect,useState} from 'react'
import logo from '../../image/logo.png'
import { NavLink ,useNavigate} from 'react-router-dom'
import './Dashboard.css'
import { useAuth } from '../../store/auth'

export const DashNavbar = () => {

    const navigate = useNavigate();
    const { user ,isloggedin} = useAuth(); 

    if (isloggedin === false) {
        navigate('/signin');
    }
    
    let userpic = '';

    if (user && user.profilePic) {
        const filePath = user.profilePic;
        userpic = filePath.replace(/^.*[\\\/]/, '');
    }

    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const pathname = location.pathname;
        setActiveLink(pathname);
    }, [location]);

    return (
        <>
            <div className='w-100'>
                <aside className="left-sidebar" id="navbar">
                    <div>
                        <div className="brand-logo d-flex align-items-center justify-content-between">
                            <NavLink to="/" className="text-nowrap logo-img mx-auto">
                                <img src={logo} alt=""/>
                            </NavLink>
                        </div>
                        <nav className="sidebar-nav scroll-sidebar d-flex flex-column justify-content-between" data-simplebar="">
                            <ul id="sidebarnav" className='px-2 mt-5'>
                                <li className={`sidebar-item mb-2 ${activeLink === '/dashboard/home' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/dashboard/home" aria-expanded="false">
                                        <div>
                                        <i className="fa-solid fa-house"></i>
                                        </div>
                                        <div className="hide-menu">home</div>
                                    </NavLink>
                                </li>
                                <li className={`sidebar-item mb-2 ${activeLink === '/dashboard/newdonation' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/dashboard/newdonation" aria-expanded="false">
                                        <div>
                                            <i className="fa-solid fa-square-plus"></i>
                                        </div>
                                        <div className="hide-menu">new donations</div>
                                    </NavLink>
                                </li>
                                <li className={`sidebar-item mb-2 ${activeLink === '/dashboard/active' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/dashboard/active" aria-expanded="false">
                                        <div>
                                            <i className="fa-solid fa-circle-check"></i>
                                        </div>
                                        <div className="hide-menu">active donations</div>
                                    </NavLink>
                                </li>
                                <li className={`sidebar-item mb-2 ${activeLink === '/dashboard/history' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/dashboard/history" aria-expanded="false">
                                        <div>
                                            <i className="fa-solid fa-clock"></i>
                                        </div>
                                        <div className="hide-menu">donation history</div>
                                    </NavLink>
                                </li>
                                <li className={`sidebar-item mb-2 ${activeLink === '/dashboard/manage' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/dashboard/manage" aria-expanded="false">
                                        <div>
                                            <i class="fa-solid fa-list-check"></i>
                                        </div>
                                        <div className="hide-menu">Donation Manage</div>
                                    </NavLink>
                                </li>
                                <li className={`sidebar-item mb-2 ${activeLink === '/dashboard/accept' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/dashboard/accept" aria-expanded="false">
                                        <div>
                                            <i className="fa-solid fa-user-check"></i>
                                        </div>
                                        <div className="hide-menu">Donation Accepted</div>
                                    </NavLink>
                                </li>
                            </ul>
                            <ul id="sidebarnav" className='px-2'>
                                <li className="sidebar-item sidebar-item-logout mb-2 mb-2">
                                    <NavLink className="sidebar-link sidebar-link-logout" to="../../Logout" aria-expanded="false">
                                        <div>
                                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                        </div>
                                        <div className="hide-menu">Log Out</div>
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>

                    <header className='dash-navs d-flex justify-content-end align-items-center'>
                        <div className="container-fluid d-flex justify-content-end align-items-center">
                            <h5 className='text-white me-3 mb-0'>{user.name}</h5>
                            <div className='user-image me-5'>
                                <img src={`../../profile/${userpic}`} alt="user" />
                            </div>
                        </div>
                    </header>
            </div>
        </>
    )
}