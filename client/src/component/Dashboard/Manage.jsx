import React,{useState,useEffect} from 'react'
import { DashNavbar } from './Navbar'
import { useAuth } from '../../store/auth'
import { NavLink ,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

export const Manage = () => {

    const {user} = useAuth();
    const [data, setManage] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        activeDonation();
    }, [user]);

    const activeDonation = async () => {
        try {
            setLoading(true);
            if (!user) return;

            const response = await fetch(`http://localhost:5000/manage?email=${user.email}`, {
                method: "GET",
            });

            if (response.ok) {
                const active_d = await response.json();
                setManage(active_d);
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    const deletedonation = async(id) =>{
        try {
            const res = await fetch(`http://localhost:5000/donation/deletedonation/${id}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({Donation: false})
            });
            const data = await res.json();

            if(res.ok){
                toast.success(data.msg)
                setManage(pre => {
                    const newData = pre.filter(item => item._id !== id);
                    return newData;
                });
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return(
        <>
            <DashNavbar/>
            <div className='dash_main_box'>
                <div className='dash-content-box'>
                    <div className="new_donation_title d-flex">
                        <div onClick={goBack}>
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        <h6>Donation manage</h6>
                    </div>
                    <div className="container-fluid mt-5">
                        <div className="row mb-5">
                            <div  className="col-md-10 mt-0 p-0 col-12 mx-auto" style={{ height: '50vh' }}>
                            {loading ? (
                                    <>
                                        <div class="loader">
                                            <span class="loader-text">loading</span>
                                            <span class="load"></span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                    {data.length === 0 ? (
                                        <div className="row d-flex justify-content-center align-items-center flex-column mt-0">
                                            <img src={`../../image/empty.png`} alt="no data found " className='empty_img mb-0'/>
                                            <NavLink className="sidebar-link d-flex justify-content-center mt-0" to="/dashboard/newdonation" aria-expanded="false"><button className='empty-btn'>New Donation</button></NavLink>
                                        </div>
                                    ):(
                                    <div className="row d-flex align-items-start mt-4 " style={{ gap: '88px' }} >
                                        {Array.isArray(data) && data.map((val, index) => {
                                        const {date,typeoffood,quantity,status,various,_id,accepted_user} = val
                                        const name = accepted_user ? accepted_user.name : "";
                                        const phone = accepted_user ? accepted_user.phone : "";

                                        return (
                                            <div key={index} className={`box-main bg-white me-4 mt-5 mb-3 ${status === "pending" ? 'box-main' : 'accepted_box'}`}>
                                                <div className="testi-profile">
                                                    <img src={`../../image/${typeoffood}.jpg`} alt="" />
                                                </div>
                                                <div className=' justify-content-end d-flex'>
                                                    <div className='manage-btn' onClick={()=> deletedonation(_id)}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </div>
                                                </div>
                                                <div className='review-box mt-3 gap-2 mb-4'>
                                                    <h6>{date}</h6>
                                                    <div className='d-flex align-items-center gap-1'><span>Food Type :-</span><span>{typeoffood}</span></div>
                                                    <div className='d-flex align-items-center gap-1'><span>Quantity :-</span><span>{quantity} {various}</span></div>
                                                    {
                                                        status === "accepted" ? 
                                                        <div class="accordion border-white" id="accordionExample">
                                                            <div class="accordion-item border-none">
                                                                <h2 class="accordion-header">
                                                                    <button class="accordion-button collapsed shadow-none border-none" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                                                        Who accepted? 
                                                                    </button>
                                                                </h2>
                                                                <div id={`collapse-${index}`} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                    <div class="accordion-body">
                                                                        <div className='d-flex align-items-center gap-1 mb-1'><h6>Name:-</h6><h6>{name}</h6></div>
                                                                        <div className='d-flex align-items-center gap-1'><h6>Phone:-</h6><h6></h6>{phone}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>: <div></div>
                                                    }
                                                </div>
                                                <div className="history-card-footer text-center" style={{ backgroundColor:status == "pending" ? '#ffb300' : '#18bd18bf', color: status == "pending" ? '#454545' : 'white', fontSize: '15px' , letterSpacing:'1' }}>
                                                    {status === "pending" ? "Wait For Charities To Accept" : "Donation Accepted"}
                                                </div>
                                            </div>
                                        )})}
                                    </div>
                                    )}
                                    </>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );  
}
