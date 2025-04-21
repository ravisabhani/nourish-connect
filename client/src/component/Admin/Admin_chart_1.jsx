import React,{useState,useEffect} from 'react'

import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import {Line , Doughnut} from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

export const Admin_chart_1 = (props) => {

    const [alldata, sethomedata] = useState();

    useEffect(() => {
        sethomedata(props.data);
    }, [props.data]); 


    const getMonthName = (monthNumber) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames[monthNumber - 1]; 
    };

    const monthData = alldata && alldata.totaldonation ? alldata.totaldonation : [];
    const monthInfo = [];

    for(let i = 1; i <= 12; i++) {
        const monthItem = monthData.find(item => item.month === i);
        const quantity = monthItem ? monthItem.totalData : 0;
        monthInfo.push({ month: getMonthName(i), quantity: quantity });
    }

    const monthLabels = monthInfo.map(item => item.month);
    const monthQuantities = monthInfo.map(item => item.quantity);

    // row 1 chart box --------

    const data = {
        labels: monthLabels,
        datasets: [{
            label: 'Total Donations',
            data: monthQuantities,
            borderColor:'#FFBC10',
            backgroundColor: 'white', // Solid red background
            borderWidth: 2,
            pointBorderColor:'#FFBC10',
            fill:true,
            tension:0.5,
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display:false
                }
            },
            y: {
                grid: {
                    color: 'rgba(241, 241, 241, 1)',
                },
                beginAtZero: true
            }
        }
    }
    
// console.log(alldata);
    const status = alldata && alldata.status ? alldata.status.map(item => item._id) : [];
    const statuscount = alldata && alldata.status ? alldata.status.map(item => item.count) : [];

    const statusColorMap = {
        'pending': '#FEC401',
        'accepted': '#20B96C',
        'expired': '#EA3466',
        'successful': '#03964c'
    };

    const datas = {
        labels: status,
        datasets: [{
            label: 'Total Donations',
            data: statuscount,
            backgroundColor: status.map(status => statusColorMap[status] || '#20B96C'),
            barThickness: 228,
            borderWidth: 0,
        }]
    };
    

    const option = {
        innerRadius: 2,
        plugins: {
            legend: {
                display: false 
            }
        }
    }

    const totalyear = alldata?.totalyear ?? [];

    const years = totalyear.map(item => item.year);
    const totalDates = totalyear.map(item => item.totalDates);
    
    const yeardata = {
        labels: years,
        datasets: [{
            label: 'Total Donations',
            data: totalDates,
            borderColor:'#FFBC10',
            backgroundColor: 'white', // Solid red background
            borderWidth: 2,
            pointBorderColor:'#FFBC10',
            fill:true,
            tension:0.5,
        }]
    };

    const yearoption = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display:false
                }
            },
            y: {
                grid: {
                    color: 'rgba(241, 241, 241, 1)',
                },
                beginAtZero: true
            }
        }
    }
    
    
    
    const [showFirstChart, setShowFirstChart] = useState(true);
    
    const handleToggleChart = (chartNumber) => {
        if (chartNumber === 1) {
            setShowFirstChart(true);
        } else {
            setShowFirstChart(false);
        }
    };
    
    const [showmonth, setShowmonth] = useState(true);

    const currentmonth = alldata && alldata.currentmonth ? alldata.currentmonth.map(item => item.totalData) : [];
    const lastmonth = alldata && alldata.lastmonth ? alldata.lastmonth.map(item => item.totalData) : [];

    const classMap = {
        'pending': 'status-circle-3',
        'accepted': 'status-circle-1',
        'successful': 'status-circle-1',
        'expired': 'status-circle-2',
    };
    
    const renderStatusItems = () => {
        const statusItems = status.map((status, index) => (
            <div key={index} className='d-flex flex-column align-items-center col-lg-6 mb-2'>
                <div className='d-flex align-items-center gap-2'>
                    <span className={classMap[status]}></span>
                    <span>{status}</span>
                </div>
            </div>
        ));
    
        const groupedStatusItems = [];
        for (let i = 0; i < statusItems.length; i += 2) {
            groupedStatusItems.push(
                <div key={i / 2} className='d-flex'>
                    {statusItems[i]}
                    {statusItems[i + 1]}
                </div>
            );
        }
        return groupedStatusItems;
    };
    
    return (
        <>
            <div className='mt-3 d-flex gap-2 main-chart-box mx-auto'>
                <div className="main-chart-1 px-2 py-2 bg-white rounded-2 d-flex">
                    <div className="col-lg-4 bg-light p-2 d-flex flex-column gap-5">
                        {   
                            showmonth ? (
                            <>
                                <div className='title-chart d-flex flex-column'>
                                    <span>Total Donation Overviews</span>
                                    <h7>Overview Of Latest Month</h7>
                                </div>
                                <div className='title-chart-2 d-flex flex-column'>
                                    <span>{currentmonth} Donate</span>
                                    <h7>Current Month Donation</h7>
                                </div>
                                <div className='title-btn'>
                                    <button onClick={()=>setShowmonth(false)}>Last Month Summary</button>
                                </div>
                            </>
                            ) : (
                            <>
                                <div className='title-chart d-flex flex-column'>
                                    <span>Total Donation Overviews</span>
                                    <h7>Overview Of Last Month</h7>
                                </div>
                                <div className='title-chart-2 d-flex flex-column'>
                                    <span>{lastmonth} Donate</span>
                                    <h7>Last Month Donation</h7>
                                </div>
                                <div className='title-btn'>
                                    <button onClick={()=>setShowmonth(true)}>Current Month Summary</button>
                                </div>
                            </>
                            )
                        }
                    </div>
                    <div className="col-lg-8 bg-light p-2">
                        <div className='d-flex chart-btn gap-3 mt-2 ps-4'>
                            <button onClick={() => handleToggleChart(1)}>Monthly</button>
                            <button onClick={() => handleToggleChart(2)}>Yearly</button>
                        </div>
                        <div className='mt-3 chart-total-overview'>
                        {showFirstChart ? (
                            <Line data={data} options={options}></Line>
                        ) : (
                            <Line data={yeardata} options={yearoption}></Line>
                        )}
                        </div>
                    </div>
                </div>
                <div className="main-chart-2 col-md-4 p-2 bg-white d-flex align-items-center justify-content-center flex-column rounded-2">
                    <div className="my-auto home-chart-dough d-flex align-items-center justify-content-center mb-4" style={{width:'100%'}}>
                        <Doughnut data={datas} options={option} style={{ width: '100%', height: '100%' }}></Doughnut>
                    </div>
                    <div className='d-flex justify-content-around w-100'>
                        <div className='d-flex justify-content-around w-100 row'>
                            {renderStatusItems()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

