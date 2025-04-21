import React, { useEffect, useState } from 'react'
import { DashNavbar } from './Navbar'
import { useAuth } from '../../store/auth'
import { NavLink , useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

export const History = () => {

    const {user} = useAuth();
    const {profilePic} = user; 
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }; 

    const [data, sethistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const [review, setReview] = useState('');
    const [rating, setrating] = useState();

    useEffect(() => {
        historydata();
    }, [user]);

    const historydata = async () => {
        try {
            setLoading(true);
            if (!user) return;

            const response = await fetch(`http://localhost:5000/dashboard/history?email=${user.email}`, {
                method: "GET",
            });

            if (response.ok) {
                const accepted = await response.json();
                sethistory(accepted);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    const handleInputChange = (e) => {
        setReview(e.target.value); 
    };

    const reviewuser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/reviewuser/${user.email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({review,rating,profilePic})
            });

            const msg = await response.json();
            if (response.ok) {
                toast.success(msg.msg);
                navigate('/dashboard/home');
            } else {
                console.error('Failed to Add Review');
            }
        } catch (error) {
            console.error('Error:', error);
        } 
    };

    return (
        <>
            <DashNavbar/>
            <div className='dash_main_box'>
                <div className='dash-content-box'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className="new_donation_title d-flex">
                            <div onClick={goBack}>
                                <i className="fa-solid fa-angle-left"></i>
                            </div>
                            <h6>Donation history</h6>
                        </div>
                        <button className='Accepted-btn-succ' style={{background:'#1a1e36'}} data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-regular fa-square-plus"></i>Add Review</button>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog  modal-dialog-centered modal-sm">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Review</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-12 d-flex mt-2 justify-content-center mb-3">
                                                <div className="rating">
                                                    <input type="radio" id="star-1" name="star-radio" value="5" onClick={(e) => setrating(parseInt(e.target.value))}/>
                                                    <label for="star-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                                    </label>
                                                    <input type="radio" id="star-2" name="star-radio" value="4" onClick={(e) => setrating(parseInt(e.target.value))}/>
                                                    <label for="star-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                                    </label>
                                                    <input type="radio" id="star-3" name="star-radio" value="3" onClick={(e) => setrating(parseInt(e.target.value))}/>
                                                    <label for="star-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                                    </label>
                                                    <input type="radio" id="star-4" name="star-radio" value="2" onClick={(e) => setrating(parseInt(e.target.value))}/>
                                                    <label for="star-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                                    </label>
                                                    <input type="radio" id="star-5" name="star-radio" value="1" onClick={(e) => setrating(parseInt(e.target.value))}/>
                                                    <label for="star-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 d-flex mt-2">
                                                <textarea type="text" placeholder='Add Review' className='input-box-add' rows='3' value={review} onChange={handleInputChange}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="add-btn-c" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="add-btn"  data-bs-dismiss="modal" onClick={reviewuser}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-md-10 mt-0 p-0 col-12 mx-auto" style={{height:'50vh'}}>
                                <div className="row d-flex justify-content-start gap-5">
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
                                        Array.isArray(data) && data.map((val, index) => {
                                        const {date,typeoffood,quantity,status,various,Donation} = val
                                        return (
                                    <div className="testi-main-boxes bg-white me-4 mb-5 mt-5" key={index}>
                                        <div className="testi-profile">
                                            <img src={`../../image/${typeoffood}.jpg`} alt="" />
                                        </div>
                                        <div className='review-box mt-3 gap-2 mb-4'>
                                            <h6>{date}</h6>
                                            <div className='d-flex align-items-center gap-1'><span>Food Type :-</span><span>{typeoffood}</span></div>
                                            <div className='d-flex align-items-center gap-1'><span>Quantity :-</span><span>{quantity} {various}</span></div>
                                        </div>
                                        <div className="history-card-footer text-center" style={{ backgroundColor: status === 'successful' ? '#18bd18bf' : status === 'expired' ? '#e43333e8' : '#ffb300' , color:'white'}} >
                                            {Donation ? status : 'Delete Donation'}
                                        </div>
                                    </div>
                                    )})
                                    )}
                                    </>
                                )}
                                </div>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

