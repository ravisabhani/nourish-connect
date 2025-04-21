import React,{useState,useEffect} from 'react'
import logo from '../../image/admin_logo.png'
import image from '../../image/p1.png'
import { NavLink ,Navigate} from 'react-router-dom'
import {useAuth} from '../../store/auth';
import '../Dashboard/Dashboard.css';

export const Admin_DashNavbar = () => {
    const {user} = useAuth();

    if(user.isadmin === "false"){
        return <Navigate to="/" />;
    } 
    
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const pathname = location.pathname;
        setActiveLink(pathname);
    }, [location]);

    let userpic = '';

    if (user && user.profilePic) {
        const filePath = user.profilePic;
        userpic = filePath.replace(/^.*[\\\/]/, '');
    }


    return (
        <>
            <div className='w-100'>
                <aside className="left-sidebar">
                    <div>
                        <div className="brand-logo d-flex align-items-center justify-content-between">
                            <NavLink to="/" className="text-nowrap logo-img mx-auto">
                                <img src={logo} alt=""/>
                            </NavLink>
                        </div>
                        <nav className="sidebar-nav scroll-sidebar d-flex flex-column justify-content-between" data-simplebar="">
                            <ul id="sidebarnav" className='px-2  mt-5'>
                                <li className={`sidebar-item mb-2 ${activeLink === '/admin/home' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/admin/home" aria-expanded="false">
                                        <div>
                                            <i className="fa-solid fa-house"></i>
                                        </div>
                                        <div className="hide-menu">Home</div>
                                    </NavLink>
                                </li>
                                <li className={`sidebar-item mb-2 ${activeLink === '/admin/user' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/admin/user" aria-expanded="false">
                                        <div>
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                        <div className="hide-menu">User Directory</div>
                                    </NavLink>
                                </li>
                                <li className={`sidebar-item mb-2 ${activeLink === '/admin/donation' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/admin/donation" aria-expanded="false">
                                        <div>
                                            <i class="fa-solid fa-bag-shopping"></i>
                                        </div>
                                        <div className="hide-menu">Donation</div>
                                    </NavLink>
                                </li>
                                <li className={`sidebar-item mb-2 ${activeLink === '/admin/setting' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/admin/setting" aria-expanded="false">
                                        <div>
                                            <i class="fa-solid fa-quote-left"></i>
                                        </div>
                                        <div className="hide-menu">Review Manage</div>
                                    </NavLink>
                                </li>
                                <li className={`sidebar-item mb-2 ${activeLink === '/admin/query' ? 'activelink' : ''}`}>
                                    <NavLink className="sidebar-link" to="/admin/query" aria-expanded="false">
                                        <div>
                                            <i class="fa-solid fa-clipboard-question"></i>
                                        </div>
                                        <div className="hide-menu">User Query</div>
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