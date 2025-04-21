import React from 'react'
import Videos from '../../video/WasteNoFood.mp4'
import { NavLink} from 'react-router-dom';

export const Header = () => {
    return (
        <>
            <div className='container-fluid d-flex justify-content-start align-items-center m-0 p-0 '>
                <div className='overlay header-main'></div>
                    <div className="video-container ">
                        <video autoPlay loop muted className='video-bg'>
                            <source src={Videos} type="video/mp4" />
                        </video>
                    </div>

                    <div className="container-fluid content-box d-flex justify-content-center align-items-center">
                        <div className="row col-md-9 content-row">
                            <div className="col-md-7 col-12 d-flex flex-column ms-2 gap-3">
                                <p>WE MAKE IT EASY TO</p>
                                <h1>Find, Secure and Deliver Food</h1>
                                <p>We are a non-profit enabling the exchange of excess food from the food industry to those who need it most</p>
                                <div className='d-flex gap-2'>
                                    <NavLink to="/dashboard/newdonation" className='text-decoration-none'><button id="btn" className='btn-sec'>Donate Food</button></NavLink>
                                    <NavLink to="/dashboard/newdonation" className='text-decoration-none'><button id="btn" className='btn-fir'>Secure Food</button></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}
