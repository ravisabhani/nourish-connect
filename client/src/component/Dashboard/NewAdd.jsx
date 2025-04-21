import React, { useEffect, useState } from 'react'
import { DashNavbar } from './Navbar'
import imglogo from '../../image/addicon.png'
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { useAuth } from '../../store/auth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const NewAdd = () => {
    
    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };
    
    // donation value set in state ............
    
    const [files, setFiles] = useState([]);

    const [donate,setdonate] = useState({
        name:"",
        email:"",
        phone:"",
        location:"",
        pincode:"",
        typeoffood:"",
        foodcondition:"",
        various:"",
        quantity:count,
        instructions:"ky",
        role:"",
    })


    // user data set in setdonation state 

    const [userdata,setuserdata] = useState(true);
    const { user } = useAuth()

    if(userdata && user){
        setdonate({
            name:user.name,
            email:user.email,
            phone:user.phone,
            role:user.role,
            pincode:user.pincode,
            quantity:count
        });

        setuserdata(false);
    }


    // INPUT ELEMENT SET IN DONATE STATE ...........

    const inputevent = (e) =>{
        const {name,value} = e.target
        
        setdonate(prevDonate => ({
            ...prevDonate,
            [name]: value
        }));
    }

    const inputeventfile = (e) =>{
        setFiles([...files, ...e.target.files]);
    }

    // WHEN COUNT STATE CHANGE THEN COUNT SET IN DONATE STATE .....

    useEffect(() => {
        setdonate(prevDonate => ({
            ...prevDonate,
            quantity: count
        }));
    }, [count]);

    // when form submit the data store in database 
    
    const dates = new Date().toLocaleString();

    const navigate = useNavigate();
    const submithandle = async (e) =>{

        e.preventDefault();

        const formDatato = new FormData();
        formDatato.append('name', donate.name);
        formDatato.append('email', donate.email);
        formDatato.append('phone', donate.phone);
        formDatato.append('location', donate.location);
        formDatato.append('pincode', donate.pincode);
        formDatato.append('typeoffood', donate.typeoffood);
        formDatato.append('foodcondition', donate.foodcondition);
        formDatato.append('various', donate.various);
        formDatato.append('quantity', donate.quantity);
        formDatato.append('instructions', donate.instructions);
        formDatato.append('role', donate.role);
        formDatato.append('date', dates);
        
        for (let i = 0; i < files.length; i++) {
            formDatato.append('files', files[i]);
        }

        try {
            const response = await axios.post('http://localhost:5000/dashboard/newdonation', formDatato, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            
                toast.success(response.data.msg);

            if (response.data.msg == "Donation created successfully!") {
                setFiles([]);
                setdonate(prevState => ({
                    ...prevState,
                    location: "",
                    typeoffood: "",
                    foodcondition: "",
                    various: "",
                    quantity: count,
                    instructions: "",
                }));
                setCount(1)
                navigate('/dashboard/manage')
            }

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

return (
    <>
        <div className="row">
            <form action="" onSubmit={submithandle} enctype="multipart/form-data">
                <div className="col-md-12">
                    <label for="file" className="file-upload-label">
                        <div className="file-upload-design">
                            <img src={imglogo} alt="" />
                            <span>Add Item</span>
                        </div>
                        <input multiple id="file" type="file" name="image" onChange={inputeventfile} />
                    </label>
                </div>
                <div className='d-flex col-lg-12'>
                    <div className='col-12 col-md-6 mt-3 pe-3'>
                        <div className='input-boxs pe-3'>
                            <h6>Name</h6>
                            <div className='input-search-box'>
                                <input type="text" onChange={inputevent} name="name"  value={donate.name} className='search-input' placeholder='Enter Your Name'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 mt-3'>
                        <div className='input-boxs pe-3'>
                            <h6>Email</h6>
                            <div className='input-search-box'>
                                <input type="text"  onChange={inputevent} name="email" value={donate.email} className='search-input' placeholder='Enter Your email' readOnly="true"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex col-lg-12'>
                    <div className='col-12 col-md-6 mt-3 pe-3'>
                        <div className='input-boxs pe-3'>
                            <h6>Location</h6>
                            <div className='input-search-box'>
                                <input type="text" onChange={inputevent} name="location" value={donate.location} className='search-input' placeholder='Enter Your Location'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 mt-3'>
                        <div className='input-boxs pe-3'>
                            <h6>Pincode</h6>
                            <div className='input-search-box'>
                                <input type="text" onChange={inputevent} name="pincode" value={donate.pincode} className='search-input' placeholder='Enter Your Pinecode'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex col-lg-12'>
                    <div className='col-12 col-md-6 mt-3 pe-3'>
                        <div className='input-boxs pe-3'>
                            <Form.Select aria-label="Default select example" size="lg" onChange={inputevent} name='typeoffood' value={donate.typeoffood}>
                                <option className='special'>Type Of Food</option>
                                <option className='special' value="packaged food">Packaged food</option>
                                <option className='special' value="fruit & vegitable">fruit & vegitable</option>
                                <option className='special' value="Chinese">Chinese</option>
                                <option className='special' value="Rice">Rice</option>
                                <option className='special' value="Punjabi">Punjabi</option>
                                <option className='special' value="Vegetarian">Vegetarian</option>
                                <option className='special' value="Mexican">Mexican</option>
                                <option className='special' value="Desserts">Desserts</option>
                                <option className='special' value="Dairy products">Dairy products </option>
                                <option className='special' value="Grains">Grains</option>
                                <option className='special' value="Dishes and Meal">Dishes and Meal</option>
                            </Form.Select>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 mt-3'>
                        <div className='input-boxs pe-3'>
                            <Form.Select aria-label="Default select example" size="lg" onChange={inputevent} name='foodcondition' value={donate.foodcondition}>
                                <option className='special'>Food Condition</option>
                                <option className='special' value="fresh">fresh</option>
                                <option className='special' value="canned">canned</option>
                                <option className='special' value="packaged">packaged</option>
                                <option className='special' value="perishable">perishable</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>
                <div className='d-flex col-lg-12'>
                    <div className='col-12 col-md-6 mt-3 pe-3'>
                        <div className='input-boxs pe-3 '>
                            <h6>Quantity</h6>
                            <div className="d-flex col-lg-11 justify-content-center mx-auto mt-3">
                                <div className='counter-box d-flex align-items-center justify-content-start p-0'>
                                    <div className='counter-plus' onClick={increment}><i className="fa-solid fa-plus"></i></div>
                                    <div className='counter-digit'>{count}</div>
                                    <div className='counter-mines' onClick={decrement}><i className="fa-solid fa-minus"></i></div>
                                </div>
                                <div className='various-box'>
                                    <Form.Select aria-label="Default select example" size="lg" onChange={inputevent} name='various' value={donate.various}>
                                        <option className='special'>Various</option>
                                        <option className='special' value="Bottle">Bottle</option>
                                        <option className='special' value="dishes">dishes</option>
                                        <option className='special' value="kilogram">kilogram</option>
                                        <option className='special' value="packet">packet</option>
                                        <option className='special' value="bag">bag</option>
                                        <option className='special' value="liter">liter</option>
                                        <option className='special' value="bowl">bowl</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 mt-3 '>
                        <div className='input-boxs pe-3'>
                            <h6>Phone</h6>
                            <div className='input-search-box'>
                                <input type="number" onChange={inputevent} name="phone" value={donate.phone} className='search-input' placeholder='9824113914'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='input-boxs pe-3 mt-3'>
                        <h6>Specific Instructions</h6>
                        <div className='input-search-box'>
                            <input type="text" onChange={inputevent} value={donate.instructions} name="instructions" className='search-input' placeholder='' />
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 mt-4">
                    <div className='donation-btn'>
                        <button>Cancle</button>
                        <button>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </>
    )
}

