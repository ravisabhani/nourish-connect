import React from 'react'
import { Title } from './Title'
import work from '../../image/work.png'
import work1 from '../../image/work1.png'
import work2 from '../../image/work2.png'
import work3 from '../../image/work3.png'
import lines from '../../image/lines.png'

export const Work = () => {
    return (
        <>
            <section className='section'>       
                <div className="mt-5 p-0 mb-5 overlay-food pt-4">
                    <div className="row-cols-1">
                        <div className="col-md-9 col-12 mx-auto">
                            <Title title="How It Works" logo={work}  line={lines} />
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-10 col-12 mx-auto">
                                <div className="row g-5 mt-1 d-flex justify-content-center">
                                    <div className="col-md-3 col-10">
                                        <div className="card rounded-4 h-100 border-0 border-none" style={{ boxShadow:'15px 15px 30px #bebebe, -15px -15px 30px #ffffff'}} >
                                            <div className='image-box-work mx-auto'>
                                                <img src={work1} className="card-img-top mx-auto img-fluid" alt="..." />
                                            </div>
                                            <div className="card-body  text-center">
                                                <h3>Food is Donated</h3>
                                                <p>Farms, restaurants, cafeterias, hotels, stadiums, and grocery stores post excess food in under a minute on the Waste No Food app.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-10">
                                        <div className="card rounded-4 h-100 border-0 border-none" style={{ boxShadow:'15px 15px 30px #bebebe, -15px -15px 30px #ffffff'}} >
                                            <div className='image-box-work mx-auto'>
                                                <img src={work2} className="card-img-top mx-auto img-fluid" alt="..." />
                                            </div>
                                            <div className="card-body  text-center">
                                                <h3>Food is Secured</h3>
                                                <p>Pre-vetted charities immediately get notified about food donations and can claim any donations they can use to serve hungry clients.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-10">
                                        <div className="card rounded-4 h-100 border-0 border-none" style={{ boxShadow:'15px 15px 30px #bebebe, -15px -15px 30px #ffffff'}} >
                                            <div className='image-box-work mx-auto'>
                                                <img src={work3} className="card-img-top mx-auto img-fluid" alt="..." />
                                            </div>
                                            <div className="card-body  text-center">
                                                <h3>Food is Picked Up</h3>
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
        </>
    )
}