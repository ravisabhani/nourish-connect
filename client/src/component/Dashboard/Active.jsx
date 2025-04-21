import React,{useState,useEffect} from 'react'
const colors = ["rgba(185, 226, 255, 0.2)", "rgba(203, 185, 255, 0.2)", "rgba(70, 202, 202, 0.16)"];
import { DashNavbar } from './Navbar'
import location from '../../image/location.png'
import target from '../../image/target2.png'
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../store/auth';
import { NavLink,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Active = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const [donation, setDonation] = useState([]);
    const [loading, setLoading] = useState(false);

    const [count, setCount] = useState(1);

        const increment = () => {
            setCount(prevCount => prevCount + 1);
        };

        const decrement = () => {
            if (count > 1) {
                setCount(prevCount => prevCount - 1);
            }
        };

    const [search,setsearch] = useState({
        location:"",
        typeoffood:"",
        pincode:"",
        various:"",
        foodcondition:"",
        quantity:count
    });

    useEffect(() => {
        setsearch(prevSearch => ({
            ...prevSearch,
            quantity: count
        }));
    }, [count]);

    useEffect(() => {
        activeDonation();
    }, [search]); 
    
    useEffect(() => {
        activeDonation();
    }, [user]);

    // for get data through the backend 
    const activeDonation = async () => {
        try {
            setLoading(true);
            if (!user) return;

            const response = await fetch(`http://localhost:5000/active_donation?email=${user.email}`, {
                method: "GET",
            });

            if (response.ok) {
                const active_d = await response.json();
                setDonation(active_d);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const colors = ["rgba(185, 226, 255, 0.2)", "rgba(203, 185, 255, 0.2)", "rgba(70, 202, 202, 0.16)"];

    const filteredDonation = donation.filter(item => {
        const locationMatch = search.location.trim() === '' || item.location.toLowerCase().includes(search.location.toLowerCase());
        const typeOfFoodMatch = search.typeoffood.trim() === '' || item.typeoffood.toLowerCase() === search.typeoffood.toLowerCase();
        const pincode = search.pincode.trim() == '' || item.pincode == search.pincode;
        const quantityMatch = search.quantity === '' || item.quantity >= parseInt(search.quantity);
        const variousMatch = search.various.trim() === '' || item.various.toLowerCase() === search.various.toLowerCase();
        const foodconditionMatch = search.foodcondition.trim() === '' || item.foodcondition.toLowerCase() === search.foodcondition.toLowerCase();

        return locationMatch && typeOfFoodMatch && pincode && quantityMatch && variousMatch && foodconditionMatch;
    });

    const resetFilter = () => {
        setsearch({
            location: "",
            typeoffood: "",
            pincode: "",
            various: "",
            foodcondition: "",
            quantity: 1
        });
        setCount(1);
        setShowResetButton(false);
        activeDonation();
    };

    const handleAccept = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/update_status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'accepted' ,accepted_user:user.email })
            });

            const responsedata = await response.json(); 

            if (response.ok) {
                toast.success(responsedata.msg);
                navigate('/dashboard/accept');
            } else {
                console.error('Failed to update status');
                toast.error(responsedata.msg);
            }
        } catch (error) {
            console.error('Error:', error);
        } 
    };

    return (
        <>
            <DashNavbar/>
            <div className='dash_main_box'>
                <div className='dash-content-box'>
                    <div className="new_donation_title d-flex">
                        <div onClick={goBack}>
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        <h6>active donations</h6>
                    </div>
                    <div className="container-fluid mt-2">
                        <div className="row">
                            <div className="col-12 col-md-8">
                            <div className='bg-white shadow-sm active-count mb-4'>{filteredDonation.length} Active</div>
                                {loading ? (
                                    <>
                                        <div class="loader">
                                            <span class="loader-text">loading</span>
                                            <span class="load"></span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {filteredDonation.length === 0 ?(
                                            <div className="row justify-content-center">
                                                <img src={`../../image/empty.png`} alt="no data found " className='empty_img mb-0'/>
                                            </div>
                                        ) : (
                                            filteredDonation.map((val, index) => {
                                                const { _id, name, location, typeoffood, various, quantity, foodcondition, phone} = val;
                                                const color = colors[index % colors.length];

                                                return (
                                                    <div key={index} className="active-donation rounded-4 d-flex justify-content-center align-content-center p-2 mb-4" style={{ backgroundColor: color }}>
                                                        <div className="col-12 col-lg-5">
                                                            <div className='active-donation-img'>
                                                                <img src={`./../image/${typeoffood}.jpg`} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-7 pt-2 ps-2">
                                                            <div className="card-body d-flex justify-content-start flex-column">
                                                                <div className='d-flex ps-2 '><span>Donor Name :-</span><span>{name}</span></div>
                                                                <div className='d-flex ps-2 '><span>Location :-</span><span>{location}</span></div>
                                                                <div className='d-flex ps-2'><span>Type Of Food :-</span><span>{typeoffood}</span></div>
                                                                <div className='d-flex ps-2'><span>Food Condition :-</span><span>{foodcondition}</span></div>
                                                                <div className='d-flex ps-2'><span>Quantity :-</span><span>{quantity} {various}</span></div>
                                                                <div className='d-flex ps-2'><span>Contact :-</span><span>{phone}</span></div>
                                                            </div>
                                                            <div>
                                                                <div className='active-donation-btn'>
                                                                    <NavLink to={`/dashboard/detail/${_id}`}><button>View Details</button></NavLink>
                                                                    <button onClick={()=>handleAccept(_id)}>Accept</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </>
                                )}
                            </div>
                            <div className='col-12 col-md-4 slides'>
                                <div className="bg-white rounded-4 p-4 mb-3">
                                    <div className="rounded-3 bg-white active-location">
                                        <img src={location} alt="" /><span>Location</span>
                                    </div>
                                    <div className='d-flex gap-1'>
                                        <div className='input-search-box-active'>
                                            <input type="text" name="" className='search-input-active' placeholder='Enter Your Location' value={search.location} onChange={(e)=> setsearch({ ...search, location: e.target.value })}/>
                                        </div>
                                        <div className='input-search-box-active pincode-search'>
                                            <input type="text" name="" className='search-input-active ps-1' placeholder='Pincode' value={search.pincode} onChange={(e) => setsearch({ ...search, pincode: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-4 p-4">
                                    <div className="rounded-3 active-filter bg-white d-flex justify-content-between">
                                        <div>
                                            <i class="fa-solid fa-filter"></i> <span className='ms-2'>Filter</span>
                                        </div>
                                        <button onClick={resetFilter} className='filterclear'>Clear</button>
                                    </div>
                                    <div className='col-12 col-md-12 mt-4 pe-3'>
                                        <div className='active-filter pe-3'>
                                            <Form.Select aria-label="Default select example" size="lg" value={search.typeoffood} onChange={(e) => setsearch({ ...search, typeoffood: e.target.value })}>
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
                                    <div className='col-12 col-md-12 mt-4 pe-3'>
                                        <div className='active-input-boxs pe-3 '>
                                            <h6>Quantity</h6>
                                            <div className="d-flex col-lg-12 justify-content-center mx-auto mt-4">
                                                <div className='active-counter-box d-flex align-items-center justify-content-start p-0'>
                                                    <div className='active-counter-plus' onClick={increment}><i class="fa-solid fa-plus"></i></div>
                                                    <div className='active-counter-digit'>{count}</div>
                                                    <div className='active-counter-mines' onClick={decrement}><i class="fa-solid fa-minus"></i></div>
                                                </div>
                                                <div className='various-box'>
                                                    <Form.Select aria-label="Default select example" size="lg" value={search.various} onChange={(e) => setsearch({ ...search, various: e.target.value })}>
                                                        <option className='special'>Various</option>
                                                        <option className='special' value="Bottle">Bottle</option>
                                                        <option className='special' value="dishes">dishes</option>
                                                        <option className='special' value="kilogram">kg</option>
                                                        <option className='special' value="bag">bag</option>
                                                        <option className='special' value="packet">packet</option>
                                                        <option className='special' value="liter">liter</option>
                                                        <option className='special' value="bowl">bowl</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-12 mt-4'>
                                        <div className='active-filter pe-3'>
                                            <Form.Select aria-label="Default select example" size="lg" value={search.foodcondition} onChange={(e) => setsearch({ ...search, foodcondition: e.target.value })}>
                                                <option className='special'>Food Condition</option>
                                                <option className='special' value="fresh">fresh</option>
                                                <option className='special' value="canned">canned</option>
                                                <option className='special' value="packaged">packaged</option>
                                                <option className='special' value="perishable">perishable</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

