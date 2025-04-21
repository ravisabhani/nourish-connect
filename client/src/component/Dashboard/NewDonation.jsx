import React from 'react'
import { DashNavbar } from './Navbar'
import { NewAdd } from './NewAdd';
import { useNavigate } from 'react-router-dom';

export const NewDonation = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <>
            <DashNavbar/>
            <div className='dash_main_box'>
                <div className='dash-content-box'>
                    <div className="new_donation_title d-flex">
                        <div  onClick={goBack}>
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        <h6>create new donation </h6>
                    </div>
                    <div className="container-fluid mt-5">
                        <NewAdd />
                    </div>
                </div>
            </div>
        </>
    )
}


