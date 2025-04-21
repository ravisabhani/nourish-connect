import React from 'react'
import {  Routes , Route ,useLocation} from "react-router-dom";

import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

import Error from './client_page/Error.jsx';

import { Signup } from './client_page/Signup.jsx'
import { Signin } from './client_page/Signin.jsx'
import { Logout } from './client_page/Logout.jsx'

import { Home } from './client_page/Home'
import { About } from './client_page/About'
import { Navbar } from './component/User/Navbar.jsx'
import { Contacts } from './client_page/Contact.jsx';

import { NewDonation } from './component/Dashboard/NewDonation'
import { DashHome } from './component/Dashboard/Home'
import { Active } from './component/Dashboard/Active'
import { Detail } from './component/Dashboard/Detail'
import { History } from './component/Dashboard/History'
import { Manage } from './component/Dashboard/Manage'
import { Accepted } from './component/Dashboard/Accepted'

import { Admin_User } from './Admin_page/User.jsx'
import { Admin_donation } from './Admin_page/Donation.jsx'
import { Userquery } from './Admin_page/Userquery.jsx'
import { AdminSetting } from './Admin_page/Setting.jsx'
import { Adminhome } from './Admin_page/Home.jsx'


function App() {

    const location = useLocation();

    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    const isadminRoute = location.pathname.startsWith('/admin');
    const issignup = location.pathname.startsWith('/signup');
    const issignin = location.pathname.startsWith('/signin');

    return (
        <>    
            {!isDashboardRoute && !isadminRoute && !issignup && !issignin && <Navbar />}
            <Routes>
                <Route exact  path='/' element={<Home />}/>
                <Route exact  path='/about' element={<About />}/>
                <Route exact  path='/contact' element={<Contacts />}/>
                <Route exact  path='/signup' element={<Signup />}/>
                <Route exact  path='/signin' element={<Signin />}/>
                <Route exact  path='/logout' element={<Logout />}/>

                <Route path='*' element={<Error />}/>

                <Route path="/dashboard">
                    <Route exact path="newdonation" element={<NewDonation />} />
                    <Route exact path="home" element={<DashHome />} />
                    <Route exact path="active" element={<Active />} />
                    <Route exact path="detail/:id" element={<Detail />} />
                    <Route exact path="history" element={<History />} />
                    <Route exact path="manage" element={<Manage />} />
                    <Route exact path="accept" element={<Accepted />} />
                </Route>

                <Route exact  path="/admin">
                    <Route exact  path="home" element={<Adminhome />} />
                    <Route exact  path="user" element={<Admin_User />} />
                    <Route exact  path="donation" element={<Admin_donation />} />
                    <Route exact  path="query" element={<Userquery />} />
                    <Route exact  path="setting" element={<AdminSetting />} />
                </Route>
            </Routes> 
        </>
    )
}

export default App
