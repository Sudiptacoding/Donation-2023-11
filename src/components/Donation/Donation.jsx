import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { getData, removeCard } from '../../../public/Utiliti/Localstorage';

const Donation = () => {
    const [donation, setDonation] = useState([])
    const [seeall, setSeeAll] = useState(3);
    const [show, setShow] = useState(true);
    useEffect(() => {
        fetch('../../../public/fakedata.js')
            .then(response => response.json())
            .then(data => {
                const localStoreData = getData()
                let donationArray = []
                for (const id of localStoreData) {
                    const match = data.find(p => p.id === id)
                    donationArray.push(match)
                }
                setDonation(donationArray)
            });
    }, []);
    const navigate = useNavigate();
    const handelStoreDetails = (id) => {
        navigate(`/carddetails/${id}/#store`)
    }
    const handelSeeAll = (id) => {
        setSeeAll(id)
        setShow(false)
    };
    const handelDelet = (id) => {
        const deletItem = donation.filter(item => item.id !== id)
        setDonation(deletItem)
        removeCard(id)
    }

    useEffect(() => {
        const totalDonation = (donation.length / 12) * 100
        localStorage.setItem('complet', totalDonation.toFixed(1))
    }, [donation])







    return (
        <div className='lg:px-[140px] pt-[50px] px-6'>
            <Header></Header>
            <Outlet></Outlet>
            {
                donation.length ? <div>
                    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 pt-[83px] pb-5'>
                        {
                            donation.slice(0, seeall).map((card, i) => {
                                return <div key={i}>
                                    <div className='relative flex flex-col rounded lg:flex-row' style={{ backgroundColor: `${card.cardbg}` }}>
                                        <div className='absolute right-0'>
                                            <div className="justify-end card-actions">
                                                <button onClick={() => handelDelet(card.id)} className=" btn-square btn-sm" style={{ color: `${card.textcolor}` }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div><img className='w-full' src={card.image} alt="" /></div>
                                        <div className='pb-6 pl-6'>
                                            <div className='pt-[25px] pb-2'><span className='py-1 px-[10px] rounded font-normal text-sm' style={{ backgroundColor: `${card.categorybg}`, color: `${card.textcolor}` }}>{card.category}</span></div>
                                            <div><span className='text-[#0B0B0B] font-semibold text-2xl py-2'>{card.type}</span></div>
                                            <div><span className='font-semibold text-md' style={{ color: `${card.textcolor}` }}>${card.price}.00</span></div>
                                            <div><button onClick={() => handelStoreDetails(card.id)} className='mt-5 text-lg font-semibold text-white px-4 py-[9px] rounded' style={{ backgroundColor: `${card.textcolor}` }}>View Details</button></div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div>
                        {
                            seeall < donation.length ? <div className='flex items-center justify-center'>{show && <button className='bg-[#009444] rounded-lg text-white py-[14px] px-[28px]' onClick={() => handelSeeAll(donation.length)}>See All</button>}</div> : <div></div>
                        }
                    </div>
                </div> : <div className='flex items-center justify-center w-full h-screen'><h1 className='text-2xl font-bold'>No Data Here</h1></div>
            }
        </div>
    );
};

export default Donation;