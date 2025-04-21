import React,{useState,useEffect} from 'react'
import food from '../../image/cooking.png'
import line from '../../image/line.png'
import target from '../../image/target2.png'
import filter from '../../image/filter.png'
import { Title } from './Title'
import { NavLink,useNavigate} from 'react-router-dom';
import { useAuth } from '../../store/auth'
import Form from 'react-bootstrap/Form';

export const Donate = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
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
        const pincode = search.pincode.trim() === '' || item.pincode == search.pincode;
        const quantityMatch = search.quantity === '' || item.quantity >= parseInt(search.quantity);
        const variousMatch = search.various.trim() === '' || item.various.toLowerCase() === search.various.toLowerCase();
        const foodconditionMatch = search.foodcondition.trim() === '' || item.foodcondition.toLowerCase() === search.foodcondition.toLowerCase();
    
        return locationMatch && typeOfFoodMatch && pincode && quantityMatch && variousMatch && foodconditionMatch;
    }).slice(0, 4);

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

            if (response.ok) {
                navigate('/dashboard/accept');
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error:', error);
        } 
    };
    return (
        <>
            <section> 
                <div className="mt-5 p-0 mb-5 overlay-food ">
                    <div className="col-md-9 col-12 mx-auto">
                        <Title title="Active Foods" logo={food}  line={line} />
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-9 col-12 mx-auto">
                                <div className="w-100 mt-5 d-flex justify-content-center gap-2">
                                    <div className="search-box-main">
                                        <div className='search-box'>
                                            <input type="text" name="" className='search-input' placeholder='Search by city, area , or neighborhood' value={search.location} onChange={(e)=> setsearch({ ...search, location: e.target.value })}/>
                                            <div className='nearby-box'>
                                                <img src={target} alt=""/>
                                                <span className='text-align-center d-none d-md-block'>Near Me</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="dropdown filter-main-box">
                                        <div className="filter-main-box">
                                            <div className='filter-box'>
                                                <img src={filter} alt="" />
                                                <span>Filter</span>
                                            </div>
                                        </div>
                                        <div className="dropdown-content" style={{minWidth:'330px'}}>
                                            <div className="bg-white rounded-4 p-4 filter-model">
                                                <div className="rounded-3 active-filter bg-white d-flex justify-content-between">
                                                    <div>
                                                        <i className="fa-solid fa-filter"></i> <span className='ms-2'>Filter</span>
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
                                                                <div className='active-counter-plus' onClick={increment}><i className="fa-solid fa-plus"></i></div>
                                                                <div className='active-counter-digit'>{count}</div>
                                                                <div className='active-counter-mines' onClick={decrement}><i className="fa-solid fa-minus"></i></div>
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
                                <div className="row g-4 mt-5 d-flex justify-content-center">
                                {loading ? (
                                    <>
                                        <div className="loader">
                                            <span className="loader-text">loading</span>
                                            <span className="load"></span>
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
                                                    <div className="col-md-3 col-10" key={index}>
                                                        <div className="card rounded-5 shadow border-0" style={{ backgroundColor: color }}>
                                                                <div className='image-box mx-auto mt-3'>
                                                                    <img src={`./../image/${typeoffood}.jpg`} alt="" className="card-img-top mx-auto"/>
                                                                </div>
                                                                <div className="card-body  text-center">
                                                                    <div className='d-flex ps-2'><h5 className="card-title">{name}</h5></div>
                                                                    <div className='d-flex ps-2'><span>Type of Food:</span><span>{typeoffood}</span></div>
                                                                    <div className='d-flex ps-2'><span>Quantity:</span><span>{quantity} {various}</span></div>
                                                                    <div className='d-flex ps-2'><span>Contact:</span><span>{phone}</span></div>
                                                                    <div className='d-flex justify-content-center gap-2 mt-3 mb-2'>
                                                                        <NavLink to={`/dashboard/detail/${_id}`} className='text-decoration-none'><button className='btn-donate'>View Details</button></NavLink>
                                                                        <button onClick={()=>handleAccept(_id)} className='btn-accept'>Accept</button>
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
                                <div className="row  mt-5">
                                    <NavLink to="/dashboard/active" className='text-decoration-none d-flex justify-content-center'><button id='btn' className='btn-sec'>More Details</button></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
