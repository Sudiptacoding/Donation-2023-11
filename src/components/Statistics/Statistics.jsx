import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Chart from 'react-google-charts';

const Statistics = () => {
    const [complet, setComplet] = useState(0)
    const [incomplet, setIncomplet] = useState(0)

    useEffect(() => {
        const complet = localStorage.getItem('complet')
        const incomplet = 100.0 - complet;
        setComplet(complet)
        setIncomplet(incomplet)
    }, [])
    const data = [
        ["Task", "how many people are donation complete"],
        ["Your Donation", parseInt(complet)],
        ["Total Donation", parseInt(incomplet)],
    ];
    const options = {
        title: "Total Donation List",
        is3D: true,
    };
    return (
        <div className='lg:px-[140px] pt-[50px]'>
            <Header></Header>
            <Outlet></Outlet>
            <div className='flex items-start justify-center w-full mx-auto lg:w-1/2'>
                <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"600px"}
                />
            </div>
        </div>
    );
};

export default Statistics;