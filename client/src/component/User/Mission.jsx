import React from 'react'
import { Title } from './Title'
import target from '../../image/target1.png'
import line from '../../image/line.png'
import mission from '../../image/mission.png'
import { NavLink} from 'react-router-dom';


export const Mission = () => {
    return (
        <>
            <section className='mission-section pt-1'>       
                <div className="mt-5 p-0 overlay-work">
                    <div className="col-md-9 col-12 mx-auto">
                        <Title title="Our Mission" logo={target}  line={line} />
                    </div>
                    <div className="container-fluid mt-5 pt-3">
                        <div className="row">
                            <div className="col-lg-9 col-12 mx-auto ">
                                <div className="row gap-3">
                                    <div className="col-md-5 col-12 overflow-hidden mb-3">
                                        <div className="mission-img">
                                            <img src={mission} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12 ps-md-5">
                                        <div className='mission-content mt-2 mb-4'>
                                            <h5>At "nourish," our mission is clear: to eradicate hunger and eliminate food waste from our communities. Every day, we strive to make a meaningful impact by ensuring that surplus food doesn't go to waste but instead reaches those who need it most.Through our dedicated efforts, surplus food is redirected to nourish individuals and families facing food insecurity. By bridging the gap between surplus and need, we foster a community where no one goes hungry, and everyone has access to nutritious meals.</h5>
                                        </div>
                                        <NavLink to="/about" className='text-decoration-none'><button id='btn' className='btn-fir mt-3 works-btn'>Learn More</button></NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>   
        </>
    )
}

