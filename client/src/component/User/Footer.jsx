import React from 'react'
import { FaLocationDot ,FaPhone ,FaAngleRight} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import instagram from '../../image/instagram.png'
import facebook from '../../image/facebook.png'
import twiter from '../../image/twitter.png'
import { NavLink} from 'react-router-dom';

export const Footer = () => {
    return (
        <>
            <div className="container-fluid mt-5 bg-dark  text-white position-relative ">
                <div className="row footer-main">
                    <div className="col-12 col-md-9 mx-auto d-flex flex-column flex-md-row mt-5 pt-2">
                        <div className="col-12 col-md-4 mb-5 d-flex justify-content-start align-items-center flex-column gap-2 text-start">
                            <h3 className='mb-4'>Get In Touch</h3>
                            <p className="mb-2"><FaLocationDot color="#dbdbdb"/> Bapunagar Ahmedabad 382350</p>
                            <p className="mb-2"><FaPhone color="#dbdbdb"/> +91 7778800557</p>
                            <p className="mb-2"><MdEmail color="#dbdbdb"/> nourishconnect@gmail.com</p>
                        </div>
                        <div className="col-12 col-md-4 mb-5 d-flex justify-content-center align-items-center flex-column gap-2">
                            <h3 className="text-white mb-4">Quick Links</h3>
                            <NavLink to='/about' className="btn btn-link text-decoration-none text-white-50 text-start"><FaAngleRight/>  &nbsp; About Us</NavLink>
                            <NavLink to='/contact' className="btn btn-link text-decoration-none text-white-50 text-start"><FaAngleRight/>  &nbsp;Contact Us</NavLink>
                            <NavLink to='/dashboard/newdonation' className="btn btn-link text-decoration-none text-white-50 text-start"><FaAngleRight/>  &nbsp;Donation</NavLink>
                            <NavLink to='/dashboard/home' className="btn btn-link text-decoration-none text-white-50 text-start"><FaAngleRight/>  &nbsp;Dashboard</NavLink>
                        </div>
                        <div className="col-12 col-md-4 mb-5 d-flex justify-content-start align-items-center flex-column gap-2">
                            <h3 className="text-white mb-4">Quick Links</h3>
                            <div>
                                <a className="btn btn-socials" href=""><img src={instagram} alt="" /></a>
                                <a className="btn btn-socials" href=""><img src={facebook} alt="" /></a>
                                <a className="btn btn-socials" href=""><img src={twiter} alt="" /></a>
                            </div>
                            <div className='mt-3'>
                                <NavLink to="/dashboard/newdonation" className='text-decoration-none'><button id='btn' className='btn-sec'>Donate</button></NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-12 mx-auto d-flex justify-content-center mb-2">
                        <h7 className="text-white-50"> © 2024  Nourrish. All rights reserved.</h7>
                    </div>
                </div>
            </div>   
        </> 
    )
}


