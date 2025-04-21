import React, { useEffect, useState } from 'react';
import { DashNavbar } from './Navbar';
import { useAuth } from '../../store/auth';
import { NavLink,useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

export const Accepted = () => {
    const { user } = useAuth();
    const [data, setAccepted] = useState([]);
    const [loading, setLoading] = useState(false);
    const [review, setReview] = useState('');
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        activeDonation();
    }, [user]);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const activeDonation = async () => {
        try {
            setLoading(true);
            if (!user) return;

            const response = await fetch(`http://localhost:5000/dashboard/accept?email=${user.email}`, {
                method: "GET",
            });

            if (response.ok) {
                const accepted = await response.json();
                setAccepted(accepted);

                // Initialize ratings state with default values
                const initialRatings = Array(accepted.length).fill(0);
                setRatings(initialRatings);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAccepted = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/donation/deleteaccepted/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();

            toast.success(data.msg);

            if (res.ok) {
                setAccepted(prev => {
                    const newData = prev.filter(item => item._id !== id);
                    return newData;
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        setReview(e.target.value);
    };

    const reviewUser = async (email, sender_user, id) => {
        try {
            const response = await fetch(`http://localhost:5000/reviewfordonor/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'successful', userreview: review, sender: sender_user, email: email, rating: ratings[data.findIndex(item => item._id === id)] })
            });

            const toastdata = await response.json();
            toast.success(toastdata.msg);

            if (response.ok) {
                activeDonation();
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRatingChange = (index, value) => {
        const newRatings = [...ratings];
        newRatings[index] = value;
        setRatings(newRatings);
    };

    return (
        <>
            <DashNavbar />
            <div className='dash_main_box'>
                <div className='dash-content-box'>
                    <div className="new_donation_title d-flex">
                        <div onClick={goBack}>
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        <h6>Donation Accepted</h6>
                    </div>
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-md-11 mt-0 p-0 col-12 mx-auto" style={{ height: '50vh' }}>
                                {loading ? (
                                    <div class="loader">
                                        <span class="loader-text">loading</span>
                                        <span class="load"></span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="row d-flex justify-content-start">
                                            {data.length === 0 ? (
                                                <div className="row d-flex justify-content-center align-items-center flex-column mt-0">
                                                    <img src={`../../image/empty.png`} alt="no data found " className='empty_img mb-0' />
                                                    <NavLink className="sidebar-link d-flex justify-content-center mt-0" to="/dashboard/active" aria-expanded="false"><button className='empty-btn'>Accept Donation</button></NavLink>
                                                </div>
                                            ) : (
                                                Array.isArray(data) && data.map((val, index) => {
                                                    const { date, typeoffood, quantity, various, _id, name, phone, location, email, accepted_user, status, Donation } = val;
                                                    const modalId = `accepted${index}`;
                                                    const starRadioName = `star-radio-${index}`;

                                                    return (
                                                        <div className="testi-main bg-white me-4 mb-5 mt-5 accept_box" key={index}>
                                                            <div className="testi-profile">
                                                                <img src={`../../image/${typeoffood}.jpg`} alt="" />
                                                            </div>
                                                            <div className='review-box mt-4 gap-3 mb-5'>
                                                                <h5>{date}</h5>
                                                                <div className='d-flex gap-2'><span className='accepted_title'>Donor Name :-</span><span>{name}</span></div>
                                                                <div className='d-flex gap-2'><span className='accepted_title'>Phone :-</span><span>{phone}</span></div>
                                                                <div className='d-flex gap-2'><span className='accepted_title'>Location:-</span><span>{location}</span></div>
                                                                <div className='d-flex gap-2'><span className='accepted_title'>Food Type :-</span><span>{typeoffood}</span></div>
                                                                <div className='d-flex gap-2'><span className='accepted_title'>Quantity :-</span><span>{quantity} {various}</span></div>
                                                            </div>
                                                            {
                                                                Donation ?
                                                                    <div className="history-card-footer text-center d-flex justify-content-end gap-1 py-2 pe-3" style={{ backgroundColor: status === "successful" ? '#78dd8775' : 'rgba(196, 196, 196, 0.84)', color: '#484500', fontSize: '14px' }}>
                                                                        <button style={{ backgroundColor: status === "successful" ? 'green' : "#232744" }} className='Accepted-btn-succ' data-bs-toggle="modal" data-bs-target={`#${modalId}`}><i className="fa-regular fa-circle-check"></i>Successful</button>
                                                                        {status !== 'successful' && (
                                                                            <button className='Accepted-btn-del' onClick={() => deleteAccepted(_id)}>
                                                                                <i className="fa-regular fa-trash-can"></i>Delete
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                    :
                                                                    <div className="history-card-footer text-center d-flex justify-content-center align-items-center pt-3 gap-1 py-1 pe-3" style={{ backgroundColor: "#ff5c5cd6", color: '#000', fontSize: '14px' }}>
                                                                        <h6>The donor has canceled the donation</h6>
                                                                    </div>
                                                            }
                                                            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered  modal-sm">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Reviews</h1>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <div className="row">
                                                                                <div className="col-lg-12 d-flex mt-2 justify-content-center mb-3">
                                                                                    <div className="rating">
                                                                                        {[5,4,3,2,1].map(starIndex => (
                                                                                            <React.Fragment key={starIndex}>
                                                                                                <input type="radio" id={`star-${index}-${starIndex}`} name={starRadioName} value={starIndex} checked={ratings[index] === starIndex} onChange={() => handleRatingChange(index, starIndex)} />
                                                                                                <label htmlFor={`star-${index}-${starIndex}`}>
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                                                                                </label>
                                                                                            </React.Fragment>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-12 d-flex mt-2">
                                                                                    <textarea type="text" placeholder='Add Reviews' className='input-box-add' rows='3' value={review} onChange={handleInputChange}></textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="add-btn-c" data-bs-dismiss="modal">Close</button>
                                                                            <button type="button" className="add-btn" onClick={() => reviewUser(email, accepted_user, _id)} data-bs-dismiss="modal">Add</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

