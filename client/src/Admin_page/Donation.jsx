import React,{useState,useEffect} from 'react'
import { Admin_DashNavbar } from '../component/Admin/Navbar'
import '../component/Admin/admin.css'
import {NewAdd} from '../component/Dashboard/NewAdd'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom';

export  const Admin_donation = () => {

    const {authtoken} = useAuth();
    const navigate = useNavigate();

    const [donation,setdonation] = useState("");
    const [item,setitem] = useState();
    const [loading, setLoading] = useState(false);

    const getdonationdata = async()=>{

        try {
            const response = await fetch(`http://localhost:5000/admin/donation`,{
                method:'GET',
                headers:{
                    Authorization : authtoken
                }
            })

            const data = await response.json();
            setdonation(data.donationdata);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getdonationdata()
    },[])

    const goBack = () => {
        navigate(-1);
    };

    const viewitem = async(id) =>{
        try {
            const res = await fetch(`http://localhost:5000/admin/viewitem/${id}`,{
                method:'GET',
                headers:{
                    Authorization : authtoken
                }
            });
            const data = await res.json();
            setitem(data.viewitemdata)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Admin_DashNavbar/>
            <div className='dash_main_box'>
                <div className='dash-content-box'>
                    <div className="container-fluid mt-2">
                        {/* add new donation part */}
                        <div className="file-upload-design bg-white px-4 py-3 rounded-3 d-flex justify-content-between">
                            <div className='d-flex flex-column add-user-title'>
                                <h5>Add New Donation</h5>
                                <h6>Welcome new donors: Start making a difference by adding your contribution to our cause.</h6>
                            </div>
                            <div className='add_user'>
                                <i className="fa-solid fa-plus" data-bs-toggle="modal" data-bs-target="#addnew"></i>
                            </div>
                        </div>
                        {/* table part */}
                        <div className="mt-4 bg-white px-4 py-2 rounded-3 ">
                            <div className="new_donation_title d-flex mt-3 add-user-title">
                                <div onClick={goBack}>
                                    <i className="fa-solid fa-angle-left"></i>
                                </div>
                                <h5 className='mt-0'>All Donation</h5>
                            </div>
                            <div className='mt-4'>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Host</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Status</th>
                                            <th scope="col"> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Array.isArray(donation) && donation.map((val, index) => {
                                        let userpic = '';

                                            if (val && val.profilePic) {
                                                const filePath = val.profilePic;
                                                userpic = filePath.replace(/^.*[\\\/]/, '');
                                            }

                                            console.log(val);
                                        return (
                                            <tr>
                                                <td scope="row">
                                                    <div className='host_box d-flex align-items-center gap-2'>
                                                        <img src={`../../profile/${userpic}`} alt="" />
                                                        <h6 className='text-capitalize'>{val.name}</h6>
                                                    </div>
                                                </td>
                                                <td>{val.location}</td>
                                                <td>{val.typeoffood}</td>
                                                <td>{val.quantity} {val.various}</td>
                                                <td>{val.phone}</td>
                                                <td><div className='status-btn mx-auto' style={{ backgroundColor: val.status === 'successful' ? '#18bd18bf' : val.status === 'expired' ? '#e43333e8' : '#ffb300'}}></div></td>
                                                <td>
                                                    <div className="dropdown text-center">
                                                        <i className="fa-solid fa-ellipsis-vertical dropbtn"></i>
                                                            <div className="dropdown-content">
                                                                <a href="#" className='d-flex gap-4 align-items-center' data-bs-toggle="modal" data-bs-target="#detail" onClick={()=> viewitem(val._id)}><i className="fa-solid fa-eye"></i>  View</a>
                                                            </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* donation detail modal */}
                            <div className="modal fade" id="detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered  modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-4" id="exampleModalLabel">Donation Details</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row d-flex justify-content-center">
                                            {loading ? (
                                                <>
                                                    <div class="loader">
                                                        <span class="loader-text">loading</span>
                                                        <span class="load"></span>
                                                    </div>
                                                </>
                                                ) : item ? (
                                                <div>
                                                <div className='row'>
                                                    {item.image && Array.isArray(item.image) && item.image.map((image, index) => {
                                                        const filename = image.split('\\').pop() || image.split('/').pop();
                                                    
                                                        return (
                                                            <div key={index} className="col-lg-3 item-food-image mb-3">
                                                                <img src={`../../donate_image/${filename}`} alt="" />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                    <div className="col-lg-12 d-flex mt-4 border-bottom">
                                                        <div className="col-lg-6 d-flex align-items-center gap-2">
                                                            <h5>Name :-</h5><h6>{item.name}</h6>
                                                        </div>
                                                        <div className="col-lg-6 d-flex align-items-center gap-2">
                                                            <h5>Food Condition :-</h5><h6>{item.foodcondition}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 d-flex mt-3 border-bottom">
                                                        <div className="col-lg-6 d-flex align-items-center gap-2">
                                                            <h5>Food Type :-</h5><h6>{item.typeoffood}</h6>
                                                        </div>
                                                        <div className="col-lg-6 d-flex align-items-center gap-2">
                                                            <h5>Quantity :-</h5><h6>{item.quantity} {item.various}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 d-flex align-items-center gap-2 mt-3 border-bottom">
                                                        <h5>Location :-</h5><h6>{item.location}</h6>
                                                    </div>
                                                    <div className="col-lg-12 d-flex flex-column mt-3 gap-2 border-bottom">
                                                        <h5>Specific Instructions</h5><h6>{item.instructions}</h6>
                                                    </div>
                                                </div>
                                                ) : (
                                                    <>
                                                        <div class="loader">
                                                            <span class="loader-text">loading</span>
                                                            <span class="load"></span>
                                                        </div>
                                                    </>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/* add new donation modal */}
                            <div className="modal fade" id="addnew" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered  modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Donation</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <NewAdd />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>        
        </>
    )
}


