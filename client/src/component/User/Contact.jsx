import React, { useState } from 'react'
import { Title } from './Title'
import contact from '../../image/phone.png'
import line from '../../image/line.png'
import map from '../../image/map.png'
import { useAuth } from '../../store/auth'
import { toast } from 'react-toastify';

export const Contact = () => {

    const [users,setuser] = useState({ 
        name:"",
        email:"",
        phone:"",
        message:"",
        role:"",
    });

    const [userdata,setuserdata] = useState(true);
    const { user } = useAuth()

    if(userdata && user){
        setuser({
            name:user.name,
            email:user.email,
            phone:user.phone,
            message:"",
            role:user.role,
            profilePic:user.profilePic
        });

        setuserdata(false);
    }

    const handleinput = (e) =>{
        const {name,value} = e.target;

        setuser({
            ...users,
            [name]:value
        })
    }
    const date = new Date().toLocaleString();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/contact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({users,date})
                
            });
            const tokens = await response.json();

            if(response.status === 401){
                toast.error(tokens.msg);
            }else{
                toast.success(tokens.msg);
            }
    
            if (response.ok) {
                setuser({ name: "", email: "", phone: "", message: "" });
            } else {
                console.log('Response not ok:');
            }
        } catch (error) {
            console.log('Fetch error:', error);
        }
    };
    

    return (
        <> 
            <section className='contact-section'>       
                <div className="p-0 mb-5 overlay-work">
                    <div className="col-md-9 col-12 mx-auto">
                        <Title title="Contact Us" logo={contact}  line={line} />
                    </div>
                    <div className="container-fluid mt-5 pt-3" style={{height:'60vh'}}>
                        <div className="row">
                            <div className="col-lg-9 col-12 mx-auto ">
                                <div className="row gap-4">
                                    <div className="col-md-6 col-12 order-0 order-md-0 contact-img">
                                        <img src={map} alt="" className='card-img-top rounded-5' />
                                    </div>
                                    <div className="col-md-5 d-flex justify-content-center col-12 order-1 order-md-1">
                                        <form className='w-75 form-contact' onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <input type="text" placeholder='Name' className="form-control shadow-none" aria-describedby="emailHelp" value={users.name} name='name' onChange={handleinput} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="email" placeholder='Email' className="form-control shadow-none" value={users.email} name='email' onChange={handleinput} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="number" placeholder='Phone' className="form-control shadow-none" value={users.phone} name='phone' onChange={handleinput} />
                                            </div>
                                            <div className="mb-3">
                                                <textarea type="text" placeholder='Any Question ?' className="resize-none overflow-y-scroll form-control shadow-none" rows="3" value={users.message} name='message' onChange={handleinput}></textarea>
                                            </div>
                                            <button id='btn' className='btn-fir mt-4 works-btn mx-auto px-5'>Submit</button>
                                        </form>
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