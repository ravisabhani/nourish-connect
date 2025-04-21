import React, { useState } from 'react'
import './signup.css'
import { NavLink , useNavigate} from 'react-router-dom';
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';

export const Signup = () => {

    const [user,setuser] = useState({
        name:"",
        email:"",
        phone:"",
        pincode:"",
        role:"",
        password:"",
        profilePic: null
    })

    const signupinput = (e) =>{
        const {name,value,files} = e.target

        if (name === "profile-pic") {
            setuser({
                ...user,
                profilePic: files[0] 
            });
        } else {
            setuser({
                ...user,
                [name]: value
            });
        }
    }

    const navigate = useNavigate()
    const {settokeninls} = useAuth();

    const submitform = async (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        formData.append('pincode', user.pincode);
        formData.append('role', user.role);
        formData.append('password', user.password);
        formData.append('profilePic', user.profilePic); 
        
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: "POST",
                body: formData // Use the FormData object instead of JSON.stringify(user)
            });
        
            const msg = await response.json();

            toast.success(msg.msg);
        
            if (response.ok) {
                setuser({ name: "", email: "", phone: "", pincode: "", role: "", password: "", profilePic: null });
                navigate('/signin');
                
                const data = await response.json();
                toast.success(data.msg);

                settokeninls(data.token);
            } else {
                toast.success(msg.extradetails ? msg.extradetails : msg.msg);
            }
        
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="main-box flex">
                <div className="facebook-page flex">
                    <div className="text">
                        <NavLink to="/" className="text-decoration-none"><h1>Nourish</h1></NavLink>
                        <p>Join us in connecting people with  </p>
                        <p>food donations  to make a positive impact .</p>
                    </div>
                    <form action="" onSubmit={submitform}>
                        <input type="text" placeholder="Enter Name"  onChange={signupinput} value={user.name} name='name' required />
                        <input type="email" placeholder="Enter Email"  onChange={signupinput} value={user.email} name='email' required />
                        <input type="number" placeholder="Enter Phone"  onChange={signupinput} value={user.phone} name='phone' required />
                        <div className="input-box">
                            <label for="profile-pic" className="imagelabel">Profile Picture</label>
                            <input type="file" id="profile-pic" name="profile-pic" className='d-none' onChange={signupinput}/>
                        </div>
                        <div className="col-lg-12 d-flex justify-content-between">
                            <input type="number" placeholder="Enter Pincode"  onChange={signupinput} value={user.pincode} name='pincode' required className='col-lg-5' />
                            <input type="number" placeholder="Enter password" onChange={signupinput} value={user.password}  name='password' required className='col-lg-6' />
                        </div>
                            
                        <div className='d-flex justify-content-around my-2'>
                            <div className="radio-button">
                                <input name="role" id="radio2" className="radio-button__input" type="radio" value="Donor" onChange={signupinput}/>
                                    <label for="radio2" className="radio-button__label">
                                        <span className="radio-button__custom"></span>
                                            Donor
                                    </label>
                            </div>
                            <div className="radio-button">
                                <input name="role" id="radio1" className="radio-button__input" type="radio" value="Volunteer" onChange={signupinput}/>
                                    <label for="radio1" className="radio-button__label">
                                        <span className="radio-button__custom"></span>
                                            Volunteer
                                    </label>
                            </div>
                        </div>
                        <div className="link">
                            <button type="submit" className="login">Create an account</button>
                        </div>
                        <hr />
                        <div className="button">
                            <NavLink to="/signin" className="">OR LOGIN</NavLink>
                        </div>
                    </form> 
                </div>
            </div>
        </>
    )
}
