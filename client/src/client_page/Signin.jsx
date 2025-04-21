import React, { useState ,useEffect} from 'react'
import './signup.css'
import { NavLink , useNavigate , Navigate} from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const Signin = () => {
    
    const {settokeninls,user} = useAuth();
    
    if(user){
        return <Navigate to="/" />;
    } 

    const [users,setuser] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate();

    const handleinput = (e) =>{
        const {name,value} = e.target

        setuser({
            ...users,
            [name]:value
        })
    }

    const handlesubmit = async (e) =>{
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/signin',
            {
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify(users)
            })

            if(response.status === 200){
                const data = await response.json()
                settokeninls(data.token)
                toast.success(data.msg);
                setuser({email:"",password:""})
                navigate('/');
            }else if(response.status === 400){
                const data = await response.json();
                toast.error(data.msg);
            }
            
        } catch (error) {
            console.log(error)
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
                    <form action="#" onSubmit={handlesubmit}>
                        <input type="email" placeholder="Email or phone number" value={users.email} name='email' onChange={handleinput} required />
                        <input type="password" placeholder="Password" value={users.password} name='password' onChange={handleinput} required />
                        <div className="link">
                            <button type="submit" className="login">Login</button>
                            <a href="#" className="forgot">Forgot password?</a>
                        </div>
                        <hr />
                        <div className="button">
                            <NavLink to="/signup" className="">OR SIGNUP</NavLink>
                        </div>
                    </form> 
                </div>
            </div>
        </>
    )
}
