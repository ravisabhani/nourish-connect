import React,{useEffect,useState} from 'react'
import { Admin_DashNavbar } from '../component/Admin/Navbar'
import '../component/Admin/admin.css'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom';

export  const Userquery = () => {

    const {authtoken} = useAuth();
    const [loading, setLoading] = useState(false);

    const [query,setquery] = useState("");
    const [item,setitem] = useState();

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const getquerydata = async()=>{
        try {
            const response = await fetch(`http://localhost:5000/admin/query`,{
                method:'GET',
                headers:{
                    Authorization : authtoken
                }
            })

            const data = await response.json();
            setquery(data.Contactdata);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getquerydata()
    },[])

    const viewitem = async(id) =>{
        try {
            const res = await fetch(`http://localhost:5000/admin/queryitem/${id}`,{
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
                        {/* table part */}
                        <div className="mt-4 bg-white px-4 py-2 rounded-3 ">
                            <div className="new_donation_title d-flex mt-3 add-user-title">
                                <div onClick={goBack}>
                                    <i className="fa-solid fa-angle-left"></i>
                                </div>
                                <h5 className='mt-0'>User Query</h5>
                            </div>
                            <div className='mt-4'>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Host</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Date</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Array.isArray(query) && query.map((val, index) => {
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
                                                <td>{val.email}</td>
                                                <td>{val.role}</td>
                                                <td>{val.phone}</td>
                                                <td>{val.date}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <i class="fa-solid fa-ellipsis-vertical dropbtn"></i>
                                                            <div class="dropdown-content">
                                                                <a href="#" className='d-flex gap-4 align-items-center' data-bs-toggle="modal" data-bs-target="#detail" onClick={()=> viewitem(val._id)}><i className="fa-solid fa-eye"></i>  View</a>
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
                        {/* donation detail modal */}
                            <div className="modal fade" id="detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">User Query</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                        {loading ? (
                                            <>
                                                <div class="loader">
                                                    <span class="loader-text">loading</span>
                                                    <span class="load"></span>
                                                </div>
                                            </>
                                            ) : item ? (
                                            <div className="row">
                                                    <div className="col-lg-12 d-flex align-items-center gap-2 border-bottom p-2">
                                                        <h5>Name :-</h5><h6>{item.name}</h6>
                                                    </div>
                                                    <div className="col-lg-12 d-flex align-items-center gap-2  border-bottom p-2">
                                                        <h5>Email :-</h5><h6>{item.email}</h6>
                                                    </div>
                                                    <div className="col-lg-12 d-flex align-items-center gap-2 border-bottom p-2">
                                                        <h5>Phone :-</h5><h6>{item.phone}</h6>
                                                    </div>
                                                    <div className="col-lg-12 d-flex flex-column mt-0 gap-1 p-2">
                                                        <h5>Message :-</h5><h6>{item.message}</h6>
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
                </div>
            </div>        
        </>
    )
}


