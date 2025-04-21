import React from 'react'
import { NavLink } from 'react-router-dom'
import image from '../image/vision4.png'
import { Contact } from '../component/User/Contact'
import {Footer} from '../component/User/Footer'

export const Contacts = () => {
    return (
        <>
            <div className='container-fluid d-flex justify-content-start align-items-center m-0 p-0 mb-5'>
                <div className='overlay header-main'></div>
                    <div className="about-img">
                        <img src={image} alt='about' />
                    </div>
                    <div className="container-fluid content-box d-flex justify-content-center align-items-center">
                        <div className="row col-md-9 justify-content-center about-content">
                            <h1 className='text-center contact-h1'>Contact Us</h1>
                            <div>
                                <button id="btn" className='btn-sec p-3 mx-auto'><NavLink to="/" className="text-decoration-none text-black">Home</NavLink></button>
                            </div>
                        </div>
                    </div>
            </div>

            <div className="container-fluid mt-5 pt-4 mb-5">
                <div className="row">
                    <div className="col-md-9 col-12 mx-auto">
                        <div className="mission-box">
                            <h7>contact us</h7>
                            <p className='mt-4 pt-2'>For inquiries regarding donations, volunteering opportunities, partnerships, or general inquiries, please fill out the contact form below. We'll get back to you as soon as possible.</p>
                        </div>
                    </div>
                </div>
            </div>  
            
            <Contact />
            <Footer />
        </>
    )
}

