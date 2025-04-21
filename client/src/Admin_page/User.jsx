import React,{useState,useEffect} from 'react'
import { Admin_DashNavbar } from '../component/Admin/Navbar'
import '../component/Admin/admin.css'
import p1 from '.././image/p2.png'
import p2 from '.././image/p1.png'
import {useAuth} from '../store/auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export  const Admin_User = () => {
    
    const {authtoken} = useAuth();

    const [user,setuser] = useState("");

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const getuserdata = async()=>{

        try {
            const response = await fetch(`http://localhost:5000/admin/user`,{
                method:'GET',
                headers:{
                    Authorization : authtoken
                }
            })

            const data = await response.json();
            setuser(data.userdata);

        } catch (error) {
            console.log(error)
        }
    }

    const deleteuser = async(id,isadmin) =>{
        if(isadmin == 'true'){
            toast.error("Admin user cannot be deleted.");
            return;
        }
        try {
            const res = await fetch(`http://localhost:5000/admin_user/delete/${id}`,{
                method:'DELETE',
                headers:{
                    Authorization : authtoken
                }
            });
            const data = await res.json();

            if(res.ok){
                toast.success(data.msg);
                getuserdata();
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getuserdata()
    },[])

    return (
        <>
            <Admin_DashNavbar/> 
            <div className='dash_main_box'>
                <div className='dash-content-box'>
                    <div className="container-fluid mt-2">
                        <div className="mt-2 bg-white px-4 py-2 rounded-3 ">
                            <div className="new_donation_title d-flex mt-3 add-user-title">
                                <div onClick={goBack}>
                                    <i className="fa-solid fa-angle-left"></i>
                                </div>
                                <h5 className='mt-0'>User Details</h5>
                            </div>
                            <div className='mt-3'>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Host</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col"> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(user) && user.map((currentval, index) => {
                                            let userpic = '';

                                            if (currentval && currentval.profilePic) {
                                                const filePath = currentval.profilePic;
                                                userpic = filePath.replace(/^.*[\\\/]/, '');
                                            }
                                            return (
                                                <tr>
                                                    <td scope="row">
                                                        <div className='host_box d-flex align-items-center gap-2'>
                                                            <img src={`../../profile/${userpic}`} alt="" />
                                                            <h6 className='text-capitalize'>{currentval.name}</h6>
                                                        </div>
                                                    </td>
                                                    <td>{currentval.email}</td>
                                                    <td>{currentval.pincode}</td>
                                                    <td>{currentval.role}</td>
                                                    <td>{currentval.phone}</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <i class="fa-solid fa-ellipsis-vertical dropbtn"></i>
                                                                <div class="dropdown-content">
                                                                    <a href="#" className='d-flex gap-4 align-items-center' onClick={()=> deleteuser(currentval._id , currentval.isadmin)}><i class="fa-solid fa-trash"></i> Delete</a>
                                                                </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </>
    )
}


