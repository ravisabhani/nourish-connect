import React,{useEffect,useState} from 'react'
import { Title } from './Title'
import work from '../../image/quotes.png'
import lines from '../../image/lines.png'
import p1 from '../../image/p1.png'
import { BsStarFill } from "react-icons/bs";
import { useAuth } from '../../store/auth'

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';


export const Testimonials = () => {

    const {authtoken} = useAuth();
    const [review,setreview] = useState("");

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

    useEffect(()=>{
        getreviewdata()
    },[])

    return (
        <> 
            <section className='section testimonial'>       
                <div className="mt-5 p-0 mb-5 overlay-food pt-4">
                    <div className="row-cols-1">
                        <div className="col-md-9 col-12 mx-auto">
                            <Title title="Testimonials" logo={work}  line={lines} />
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8 mt-0 p-0 col-12 mx-auto" style={{height:'50vh'}}>
                                <div className="row d-flex justify-content-center">
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        spaceBetween={5}
                                        slidesPerView={3}
                                        navigation
                                        pagination={{ clickable: true }}
                                        scrollbar={{ draggable: true }}
                                    >
                                        {review && Array.isArray(review) && review.map((data, index) => {
                                                const {review,rating} = data;
                                                const name = data;

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

                                                let userpic = '';

                                                if (data && data.profilePic) {
                                                    const filePath = data.profilePic;
                                                    userpic = filePath.replace(/^.*[\\\/]/, '');
                                                }

                                                return(
                                                    <SwiperSlide>
                                                        <div className="testi-main">
                                                            <div className="testi-profile">
                                                                <img src={`../../profile/${userpic}`} alt="" />
                                                            </div>
                                                            <div className='review-box'>
                                                                <div className="stars">
                                                                    {renderStars(rating)}
                                                                </div>
                                                                <h6 style={{letterSpacing:2}}>{review}</h6>
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
            </section>         
        </>
    )
}