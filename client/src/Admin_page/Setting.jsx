import React,{useState,useEffect} from 'react'
import { Admin_DashNavbar } from '../component/Admin/Navbar'
import '../component/Admin/admin.css'
import {useAuth} from '../store/auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export  const AdminSetting = () => {
    
    const {authtoken} = useAuth();
    const [review,setreview] = useState("");

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const getreviewdata = async()=>{

        try {
            const response = await fetch(`http://localhost:5000/admin/reviewmanage`,{
                method:'GET',
                headers:{
                    Authorization : authtoken
                }
            })

            const data = await response.json();
            setreview(data.reviewdata);

        } catch (error) {
            console.log(error)
        }
    }

    const deleteuser = async(id,isadmin) =>{
        try {
            const res = await fetch(`http://localhost:5000/review/delete/${id}`,{
                method:'DELETE',
                headers:{
                    Authorization : authtoken
                }
            });
            const data = await res.json();

            if(res.ok){
                toast.success(data.msg);
                getreviewdata();
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getreviewdata()
    },[])

    return (
        <>
            <Admin_DashNavbar/>
            <div className='dash_main_box'>
                <div className='dash-content-box'>
                    <div className="container-fluid mt-2">
                        <div className='row justify-content-around'>
                            <div className="mt-2 bg-white px-4 py-2 rounded-3 ">
                                <div className="new_donation_title d-flex mt-3 add-user-title">
                                    <div onClick={goBack}>
                                        <i className="fa-solid fa-angle-left"></i>
                                    </div>
                                        <h5 className='mt-0'>Review Manage</h5>
                                </div>
                                <div className='mt-4'>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Host</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Reviews</th>
                                                <th scope="col">Rating</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(review) && review.map((val, index) => {
                                                let userpic = '';

                                                    if (val && val.profilePic) {
                                                        const filePath = val.profilePic;
                                                        userpic = filePath.replace(/^.*[\\\/]/, '');
                                                    }

                                                return (
                                                    <tr>
                                                        <td scope="row">
                                                            <div className='host_box d-flex align-items-center gap-2'>
                                                                <img src={`../../profile/${userpic}`} alt="" />
                                                                <h6 className='text-capitalize'>{val.name}</h6>
                                                            </div>
                                                        </td>
                                                        <td style={{ maxWidth: '150px' }}>{val.email}</td>
                                                        <td className='text-truncate' style={{ maxWidth: '300px' }}>{val.review}</td>
                                                        <td>{val.rating}</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <i class="fa-solid fa-ellipsis-vertical dropbtn"></i>
                                                                    <div class="dropdown-content">
                                                                        <a href="#" className='d-flex gap-4 align-items-center' onClick={()=> deleteuser(val._id)}><i class="fa-solid fa-trash"></i> Delete</a>
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
            </div>            
        </>
    )
}


