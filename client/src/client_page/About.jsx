import React from 'react'
import image from '../image/vision3.png'
import { NavLink } from 'react-router-dom'
import { Work } from '../component/User/Work'
import image1 from '../image/vision3.png'
import image2 from '../image/vision4.png'
import { Title } from '../component/User/Title'
import image3 from '../image/megaphone.png'
import lines from '../image/line.png'
import { Testimonials } from '../component/User/Testimonial'
import {Footer} from '../component/User/Footer'

export const About = () => {
    return (
        <>
            
            <div className='container-fluid d-flex justify-content-start align-items-center m-0 p-0 mb-5'>
                <div className='overlay header-main'></div>
                    <div className="about-img">
                        <img src={image} alt='about' />
                    </div>
                    <div className="container-fluid content-box d-flex justify-content-center align-items-center">
                        <div className="row col-md-9 justify-content-center about-content">
                                <h1 className='text-center'>About Us</h1>
                                <div>
                                    <button id="btn" className='btn-fir p-3 mx-auto'><NavLink to="/" className="text-decoration-none text-black">Home</NavLink></button>
                                </div>
                        </div>
                    </div>
            </div>

            <div className="container-fluid mt-5 pt-4">
                <div className="row">
                    <div className="col-md-9 col-12 mx-auto">
                        <div className="mission-box">
                            <h7>THE WASTE NO FOOD MISSION</h7>
                            <h2>Diverting Excess Food to Hungry People</h2>
                            <p>Waste No Food empowers groups with perishable resources to donate to charities serving the needy. We help cut waste and build resilient and flourishing communities.</p>
                        </div>
                    </div>
                </div>
            </div>        

            <Work/>

            <section className='mt-5 pt-4 '>       
                <div className="mt-5 p-0 mb-5 overlay-food pt-4">
                    <div className="row-cols-1">
                        <div className="col-md-9 col-12 mx-auto">
                            <Title title="Latest News" logo={image3}  line={lines} />
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-10 col-12 mx-auto">
                                <div className="row g-5 mt-1 d-flex justify-content-center">
                                    <div className="col-md-3 col-9">
                                        <div className="card rounded-4 h-100 border-0 border-none" style={{ boxShadow:'15px 15px 30px #bebebe, -15px -15px 30px #ffffff'}} >
                                            <div className='image-box-work mx-auto'>
                                                <img src={image1} className="card-img-top mx-auto img-fluid" alt="..." />
                                            </div>
                                            <div className="card-body  text-center" style={{lineHeight:'29px'}}>
                                                <p className='fs-5'>Hunger Network, Pasco County Partner To Prevent Food Waste</p>
                                                <p>Farms, restaurants, cafeterias, hotels, stadiums, and grocery stores post excess food in under a minute on the Waste No Food app.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-9">
                                        <div className="card rounded-4 h-100 border-0 border-none" style={{ boxShadow:'15px 15px 30px #bebebe, -15px -15px 30px #ffffff'}} >
                                            <div className='image-box-work mx-auto'>
                                                <img src={image2} className="card-img-top mx-auto img-fluid" alt="..." />
                                            </div>
                                            <div className="card-body  text-center" style={{lineHeight:'29px'}}>
                                                <p className='fs-5'>Hunger Network, Pasco County Partner To Prevent Food Waste</p>
                                                <p>Pre-vetted charities immediately get notified about food donations and can claim any donations they can use to serve hungry clients.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-9">
                                        <div className="card rounded-4 h-100 border-0 border-none" style={{ boxShadow:'15px 15px 30px #bebebe, -15px -15px 30px #ffffff'}} >
                                            <div className='image-box-work mx-auto'>
                                                <img src={image1} className="card-img-top mx-auto img-fluid" alt="..." />
                                            </div>
                                            <div className="card-body  text-center" style={{lineHeight:'29px'}}>
                                                <p className='fs-5'>Hunger Network, Pasco County Partner To Prevent Food Waste</p>
                                                <p>The charity, or a network of volunteers, picks up the food and serves it to hungry people.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>  

            <Testimonials />  

            <Footer />
        </>        
    )
}


