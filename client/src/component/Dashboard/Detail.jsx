import React, { useEffect, useState } from 'react'
import { DashNavbar } from './Navbar'
import p1 from '../../image/p1.png'
import { useParams , useNavigate  } from 'react-router-dom';
import { BsStarFill } from "react-icons/bs"
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAuth } from '../../store/auth'
import { toast } from 'react-toastify';

export const Detail = () => {

    const param = useParams(); 
    const [details,setdetails] = useState({})
    const [review,setreview] = useState({})

    const donation_details = async () => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/detail/${param.id}`, {
                method: "GET",
            });


            if (response.ok) {
                const responseData = await response.json();
                const details = responseData.data
                const mergeddata = responseData.mergedData

                setdetails(details)
                setreview(mergeddata)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const { user } = useAuth()

    const navigate = useNavigate();
    const handleAccept = async () => {
        try {
            const response = await fetch(`http://localhost:5000/update_status/${param.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'accepted' ,accepted_user:user.email })
            });

            const responsedata = await response.json(); 

            if (response.ok) {
                toast.success(responsedata.msg);
                navigate('/dashboard/accept');
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error:', error);
        } 
    };

    useEffect(() => {
        donation_details();
    }, []);

    const goBack = () => {
        navigate(-1);
    }; 

    return (
        <>
            <DashNavbar/>
            <div className='dash_main_box'>
                <div className='dash-content-box'>
                    <div className="new_donation_title d-flex">
                        <div onClick={goBack}>
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        <h6>Donation Details</h6>
                    </div>
                    <div className='col-lg-11 mx-auto '>
                        <div className='mt-5 d-flex align-items-center'>
                            {
                                details.status === "pending" ? 
                                <h5 className='pending'><i className="fa-regular fa-clock fs-4"></i> Waiting for charities to accept</h5>
                                : <h5 className='accepted'><i class="fa-regular fa-circle-check"></i> This Donation Was Accepted</h5>
                            }
                        </div>
                        <div className='mt-5 food-image'>
                            <h4 className='mb-4'>Food Items</h4>
                            <div className='row'>
                            {details.image && Array.isArray(details.image) && details.image.map((image, index) => {
                                const filename = image.split('\\').pop() || image.split('/').pop();

                                return (
                                    <div key={index} className="col-lg-3 food-image-box mb-3">
                                        <img src={`../../donate_image/${filename}`} alt="" />
                                    </div>
                                );
                            })}
                            </div>
                        </div>
                        <div className='mt-5 food-details'>
                            <h4 className='mb-4'>Donation Details</h4>
                            <div className="mt-3 bg-white p-3 rounded-4">
                                <div className="row">
                                    <div className="col-lg-12 d-flex mt-2">
                                        <div className="col-lg-6 d-flex align-items-center gap-2">
                                            <h5>Name :-</h5><h6>{details.name}</h6>
                                        </div>
                                        <div className="col-lg-6 d-flex align-items-center gap-2">
                                            <h5>Food Condition :-</h5><h6>{details.foodcondition}</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 d-flex mt-3">
                                        <div className="col-lg-6 d-flex align-items-center gap-2">
                                            <h5>Food Type :-</h5><h6>{details.typeoffood}</h6>
                                        </div>
                                        <div className="col-lg-6 d-flex align-items-center gap-2">
                                            <h5>Quantity :-</h5><h6>{details.quantity} {details.various}</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 d-flex mt-3">
                                        <div className="col-lg-6 d-flex align-items-center gap-2">
                                            <h5>Location :-</h5><h6>{details.location}</h6>
                                        </div>
                                        <div className="col-lg-6 d-flex align-items-center gap-2">
                                            <h5>Pincode :-</h5><h6>{details.pincode}</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 d-flex flex-column mt-3 gap-2">
                                        <h5>Specific Instructions</h5><h6>{details.instructions}</h6>
                                    </div>
                                    <div className='detail-btn mt-4 d-flex justify-content-end pe-5'>
                                        { details.status === "pending" ? <button onClick={handleAccept}>Accepted</button> : <div></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 food-details'>
                            <h4 className='m-0'>Volunteer Reviews</h4>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-10 mt-0 p-0 col-12 mx-auto" style={{height:'50vh'}}>
                                        <div className="row d-flex justify-content-start">
                                            <Swiper
                                                modules={[Navigation, Pagination]}
                                                spaceBetween={5}
                                                slidesPerView={3}
                                                navigation
                                                pagination={{ clickable: true }}
                                                scrollbar={{ draggable: true }}
                                            >
                                            {review && Array.isArray(review) && review.map((data, index) => {
                                                const {userreview,rating} = data.review;
                                                const name = data.senderName;

                                                const renderStars = (rating) => {
                                                    const filledStars = [];
                                                    const emptyStars = [];
                                                    for (let i = 0; i < rating; i++) {
                                                        if (i < rating) {
                                                            filledStars.push(<BsStarFill key={i} color='FF8A00' />);
                                                        } else {
                                                            emptyStars.push(<BsStarFill key={i} color='FF8A00' />);
                                                        }
                                                    }
                                                    return filledStars.concat(emptyStars);
                                                };

                                                return(
                                                    <SwiperSlide>
                                                        <div className="testi-main">
                                                            <div className='review-box'>
                                                                <div className="stars d-flex justify-content-between align-items-center mb-3">
                                                                    <h5 className='m-0 p-0'>{name}</h5>
                                                                    <div className='d-flex'>{renderStars(rating)}</div>
                                                                </div>
                                                                <h6 style={{letterSpacing:2}}>{userreview}</h6>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            })}
                                            </Swiper>
                                        </div> 
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

