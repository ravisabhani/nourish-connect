import React from 'react'
import { Title } from './Title'
import visions from '../../image/visibility.png'
import line from '../../image/lines.png'
import vision from '../../image/vision.png'
import vision2 from '../../image/vision2.png'
import vision3 from '../../image/vision3.png'
import vision4 from '../../image/vision4.png'
import work from '../../image/work1.png'

export const Vision = () => {
    return (
        <> 
            <section className='vision-section'>       
                <div className="p-0 overlay-work overlay-vision">
                    <div className="col-md-9 col-12 mx-auto">
                        <Title title="Our vision" logo={visions}  line={line} />
                    </div>
                    <div className="container-fluid mt-5 pt-3">
                        <div className="row">
                            <div className="col-lg-9 col-12 mx-auto ">
                                <div className="row">
                                    <div className="col-md-6 col-12 order-1 order-md-1 d-flex justify-content-center">
                                        <div class="vision-box">
                                            <div class="vision-card"><img src={vision} alt="" /></div>
                                            <div class="vision-card"><img src={vision2} alt="" /></div>
                                            <div class="vision-card"><img src={vision3} alt="" /></div>
                                            <div class="vision-card"><img src={vision4} alt="" /></div>
                                            <div class="vision-card"><img src={work} alt="" /></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12 order-1 order-md-0">
                                        <div className='mission-content mt-2'>
                                            <h5>a world without hunger, where every plate is full. Learn more about our journey and join us in making a difference today. Explore volunteer opportunities, corporate partnerships, and donate surplus food. Stay connected with our latest stories and impact. Follow us on social media</h5>
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