import React,{useEffect,useState} from 'react'
import { Admin_DashNavbar } from '../component/Admin/Navbar'
import '../component/Admin/admin.css'
import {Admin_chart_1} from '../component/Admin/Admin_chart_1.jsx'
import {Admin_chart_2} from '../component/Admin/Admin_chart_2.jsx'
import { useAuth } from '../store/auth.jsx'

export  const Adminhome = () => {

    const [homedata, sethomedata] = useState();
    const [loading, setLoading] = useState(false);

    const {user} = useAuth();

    useEffect(() => {
        homedataget();
    }, [user]);

    const homedataget = async () => {
        try {
            setLoading(true);
            if (!user) return;

            const response = await fetch(`http://localhost:5000/admin/home`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                    sethomedata(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Admin_DashNavbar/> 
            <div className='dash_main_box'>
                <div className='dash-content-box'>
                    <div className="container-fluid">

                        <Admin_chart_1  data={homedata}/>

                        <Admin_chart_2  data={homedata}/>
                    </div>
                </div>
            </div>        
        </>
    )
}


