import React,{useEffect,useState} from 'react'

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

import {Bar , Line , Doughnut , Pie} from 'react-chartjs-2'

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

export const Admin_chart_2 = (props) => {

    const [alldata, sethomedata] = useState();

    useEffect(() => {
        sethomedata(props.data);
    }, [props.data]); 


    const typefood = alldata?.typefood ?? [];

    const typefoodlabel = typefood.map(item => item._id);
    const totalQuantity = typefood.map(item => item.totalQuantity);


    const two_data = {
        labels: typefoodlabel,
        datasets: [{
            label: 'Total Donations',
            data: totalQuantity,
            backgroundColor: [
                'rgba(186, 106, 211, 0.6)',
                'rgba(234, 52, 102, 0.64)',
                'rgba(24, 182, 236, 0.68)',
                'rgba(254, 196, 1, 0.57)',
                'rgba(52, 211, 131, 0.73)'],
            borderColor:[
                '#55027D',
                '#880327',
                '#025CA0',
                '#B28A04',
                '#007513'
            ],
            borderWidth: 1,
            barThickness: 39,
            borderRadius:9,
        }]
    };

    const two_option = {
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
                },
                ticks: {
                    stepSize: 3, 
                    min: 0 
                }
            },
            x:{
                grid: {
                    display: false
                }
            },
        },
    }

    const quantity = alldata?.quantity ?? [];

    const quantitylabel = quantity.map(item => item._id);
    const totalquantity = quantity.map(item => item.totalQuantity);

    const two_datas = {
        labels: quantitylabel,
        datasets: [{
            label: 'Quantity',
            data: totalquantity,
            backgroundColor: [
                '#EA3466',
                '#FEC401',
                '#18B6EC',
                '#9666D1'
            ],
            barThickness: 133,
            borderWidth:0,
        }]
    }

    const two_options = {
        innerRadius: 2,
        plugins: {
            legend: {
                display: false 
            }
        }
    }


    return (
        <>
            <div className='mt-5 d-flex gap-2 main-chart-box mx-auto'>
                <div className="main-chart-1 p-2 bg-white rounded-2">
                    <div className="flex-column px-2 py-2 bg-light rounded-2 d-flex">
                        <h6>Total Food Type Over Time</h6>
                        <div className="mt-3 chart d-flex align-items-center justify-content-center" style={{width:'100%',height:'313px'}}>
                            <Bar data={two_data} options={two_option} style={{ width: '100%', height: '100%' }}></Bar>
                        </div>
                    </div>
                </div>
                <div className="main-chart-2 col-md-4 p-2 bg-white d-flex align-items-center justify-content-center flex-column rounded-2">
                    <div className='bg-light h-100 d-flex justify-content-center flex-column w-100 p-2'>
                        <div className='d-flex justify-content-start w-100'>
                            <h6 className='text-start'>Quantity of Food Donated</h6>
                        </div>
                        <div className="my-auto chart-pie d-flex align-items-center justify-content-center" style={{width:'100%'}}>
                            <Pie data={two_datas} options={two_options} style={{ width: '100%', height: '100%' }}></Pie>
                        </div>
                    </div>    
                </div>
            </div>
        </>
    )
}

