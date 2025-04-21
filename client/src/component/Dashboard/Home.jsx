import React, { useState , useEffect } from 'react'
import { DashNavbar } from './Navbar'
import food from '../../image/pizza.png'
import food2 from '../../image/taco.png'
import food3 from '../../image/salad.png'
import food4 from '../../image/fast-food.png'
import chart1 from '../../image/chart3.png'
import chart2 from '../../image/chart2.png'
import chart3 from '../../image/chart1.png'
import chart4 from '../../image/chart4.png'
import { NavLink ,useNavigate} from 'react-router-dom'
import { useAuth } from '../../store/auth'

import {
    Chart as ChartJS,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import {Bar , Doughnut} from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

export const DashHome = () => {

    const [homedata, sethomedata] = useState();

    const getMonthName = (monthNumber) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames[monthNumber - 1]; 
    };

    const monthData = homedata && homedata.totaldonation ? homedata.totaldonation : [];
    const monthInfo = [];

    for(let i = 1; i <= 12; i++) {
        const monthItem = monthData.find(item => item.month === i);
        const quantity = monthItem ? monthItem.totalData : 0;
        monthInfo.push({ month: getMonthName(i), quantity: quantity });
    }

    const monthLabels = monthInfo.map(item => item.month);
    const monthQuantities = monthInfo.map(item => item.quantity);

    const data = {
        labels: monthLabels,
        datasets: [{
            label: 'Total Donations',
            data: monthQuantities,
            backgroundColor: [
                '#43766ca3',
                '#f8fae5b8',
                ],
            borderColor:[
                '#43766C',
                '#F8FAE5',
            ],
            borderWidth:2,
            barThickness: 34,
            borderRadius:11,
            
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero:true,
                grid: {
                    display: false
                }
            },
            x:{
                grid: {
                    display: false
                }
            },
        },
        
    }

    
    const typeFoodLabels = homedata && homedata.typefood ? homedata.typefood.map(item => item._id) : [];
    const typeFoodQuantities = homedata && homedata.typefood ? homedata.typefood.map(item => item.totalQuantity) : [];
    
    const datas = {
        labels: typeFoodLabels,
        datasets: [{
            label: 'Total Donations',
            data: typeFoodQuantities,
            backgroundColor: [
                '#43766C',
                '#F8FAE5',
                '#005F60',
                '#003737'
            ],
            barThickness: 228,
            borderWidth: 0
        }]
    };

    const option = {
        plugins: {
            legend: {
                display: false
            }
        },
    }

    const {user} = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        homedataget();
    }, [user]);

    const homedataget = async () => {
        try {
            setLoading(true);
            if (!user) return;

            const response = await fetch(`http://localhost:5000/dashboard/home?email=${user.email}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                    sethomedata(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const renderStatusCount = (statusType) => {
        return homedata && homedata.status ? homedata.status.find(item => item._id === statusType)?.count ?? 0 : 0;
    };
    
    const totalStatusCount = homedata && homedata.status ? homedata.status.reduce((acc, curr) => acc + (curr.count || 0), 0) : 0;
    
    function padWithZero(num) {
        return num < 10 ? '0' + num : num;
    }
    
    const renderStatusPercentage = (statusType) => {
        const count = renderStatusCount(statusType);
        return totalStatusCount === 0 ? '0' : Math.round((count / totalStatusCount) * 100);
    };
    

    const acceptedp = renderStatusPercentage('pending');
    const successfulp = renderStatusPercentage('successful');
    const expiredp = renderStatusPercentage('expired');


    const quantityLabels = homedata && homedata.quantity ? homedata.quantity.map(item => item._id) : [];
    const quantitycount = homedata && homedata.quantity ? homedata.quantity.map(item => item.totalQuantity) : [];

    const goBack = () => {
        navigate(-1);
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
                        <h6>Dashboard</h6>
                    </div>
                    {/* row 1 */}
                    <div className='home-main d-flex flex-column gap-2 p-3 ps-5 mt-4 mx-auto'>
                        <img src={food} alt=""  className='food-random'/>
                        <img src={food2} alt="" className='food-random'/>
                        <img src={food3} alt="" className='food-random'/>
                        <img src={food4} alt="" className='food-random'/>
                        <h3 className='home-family fw-600 z-1'>Hi {user.name}</h3>
                        <h7 className='home-family fw-600 z-1 mb-4'>Welcome aboard, jash savani Your journey to making a difference starts here</h7>
                        <NavLink to="/dashboard/newdonation" className="z-2"><button className='home-main-btn'>New Donation</button></NavLink>
                    </div>
                    {/* row 2 */}
                    {
                        totalStatusCount === 0 ? " " : 
                        <>
                            <div className="type-chart-box d-flex justify-content-between gap-4  mt-5 mx-auto">
                            <div className='bg-white col-lg-3 rounded-3 d-flex align-items-center p-2 type-box'>
                                    <div className="w-50">
                                        <div className='chart-box'>
                                            <img src={chart1} alt="" />
                                        </div>
                                    </div>
                                    <div className="w-50">
                                        <div className='chart-des'>
                                            <div className="chart2 d-flex align-items-center gap-3">
                                                <span className='fw-bold'>{padWithZero(totalStatusCount)}</span> 
                                            </div>
                                            <h7>Total Overview</h7>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-white col-lg-3 rounded-3 d-flex align-items-center p-2 type-box'>
                                    <div className="w-50">
                                        <div className='chart-box'>
                                            <img src={chart2} alt="" />
                                        </div>
                                    </div>
                                    <div className="w-50">
                                        <div className='chart-des'>
                                            <div className="chart2 d-flex align-items-center gap-3">
                                                <span className='fw-bold'>{padWithZero(renderStatusCount('successful'))}</span> 
                                                <span>+{successfulp}%</span>
                                            </div>
                                            <h7>Successful</h7>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-white col-lg-3 rounded-3 d-flex align-items-center p-2 type-box'>
                                    <div className="w-50">
                                        <div className='chart-box'>
                                            <img src={chart3} alt="" />
                                        </div>
                                    </div>
                                    <div className="w-50">
                                        <div className='chart-des'>
                                            <div className="chart1 d-flex align-items-center gap-3">
                                                <span className='fw-bold'>{padWithZero(renderStatusCount('expired'))}</span> 
                                                <span>-{expiredp}%</span>
                                            </div>
                                            <h7>Expired</h7>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-white col-lg-3 rounded-3 d-flex align-items-center p-2 type-box'>
                                    <div className="w-50">
                                        <div className='chart-box'>
                                            <img src={chart4} alt="" />
                                        </div>
                                    </div>
                                    <div className="w-50">
                                        <div className='chart-des'>
                                            <div className="chart2 d-flex align-items-center gap-3">
                                                <span className='fw-bold'>{padWithZero(renderStatusCount('pending'))}</span> 
                                                <span>+{acceptedp}%</span>
                                            </div>
                                            <h7>Pending</h7>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* row 3 */}
                            <div className='mt-5 d-flex gap-2 main-chart-box mx-auto'>
                                <div className="main-chart-1 p-2 bg-white rounded-2">
                                    <h6>Total Donations Over Time</h6>
                                    <div className="mt-3 chart d-flex align-items-center justify-content-center" style={{width:'100%'}}>
                                        <Bar data={data} options={options} style={{ width: '100%', height: '100%' }}></Bar>
                                    </div>
                                </div>
                                <div className="main-chart-2 col-md-4 p-2 bg-white d-flex align-items-center justify-content-center flex-column rounded-2">
                                    <div className='d-flex justify-content-start w-100'>
                                        <h6 className='text-start'>Quantity of Food Donated</h6>
                                    </div>
                                    <div className="my-auto chart-dough d-flex align-items-center justify-content-center" style={{width:'100%'}}>
                                        <Doughnut data={datas} options={option} style={{ width: '100%', height: '100%' }}></Doughnut>
                                    </div>
                                </div>
                            </div>
                            {/* row 4 */}
                            <div className='type-chart-box d-flex gap-4  mt-5 mx-auto'>
                                {quantityLabels.map((label, index) => (
                                    <div key={index} className="type-box p-3 d-flex gap-5 rounded-4 align-items-center bg-white">
                                        <div className='type-logo'>
                                            {label === 'liter' && <i className="fa-solid fa-prescription-bottle"></i>}
                                            {label === 'kilogram' && <i className="fa-solid fa-weight-hanging"></i>}
                                            {label === 'bag' && <i className="fa-solid fa-bag-shopping"></i>}
                                            {label === 'Bottle' && <i className="fa-solid fa-bottle-water"></i>}
                                            {label === 'dishes' && <i class="fa-solid fa-plate-wheat"></i>}
                                            {label === 'packet' && <i class="fa-solid fa-box-open"></i>}
                                            {label === 'bowl' && <i class="fa-solid fa-bowl-rice"></i>}
                                        </div>
                                        <div className='d-flex flex-column chart-des'>
                                            <h3 className='fw-bold'>{padWithZero(quantitycount[index])}</h3>
                                            <h7>{label}</h7>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

