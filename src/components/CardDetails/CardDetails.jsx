import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addData, getData } from '../../../public/Utiliti/Localstorage';
import swal from 'sweetalert';

const CardDetails = () => {
    const [showCard, setShowCard] = useState({})
    const { id } = useParams();
    const local = useLocation();

    useEffect(() => {
        fetch('../../fakedata.js')
            .then(response => response.json())
            .then(data => {
                const findData = data.find(card => card.id === parseInt(id))
                setShowCard(findData)
            })
    }, []);

    const navigate = useNavigate()
    const handelSaveData = (id) => {
        const localStoreId = getData()
        const filterValue = localStoreId.find(item => item === id)
        if (filterValue) {
            swal("Oppss!", "Your donation alrady complete!", "error");
            navigate('/')
        } else {
            addData(id);
            swal("Good job!", "Donation complete successfully!", "success");
            navigate('/donation')
        }
    }
    return (
        <div className='lg:px-[30px] xl:px-[140px] pt-[50px] px-6'>
            <Header></Header>
            <Outlet></Outlet>
            <div className='mt-[83px]'>
                <div className='relative'>
                    <img className='w-full' src={showCard.rectangleimage} alt="" />
                    <span className='absolute bottom-0 w-full bg-[#00000080] lg:p-[37px] p-5'> {local.hash !== "#store" && <button onClick={() => handelSaveData(showCard.id)} className={`text-white py-4 px-[26px] font-semibold text-xl rounded`} style={{ backgroundColor: `${showCard.textcolor}` }}>Donate ${showCard.price}</button>} </span>
                </div>
                <div className='mt-[56px]'><h2 className='text-[#0B0B0B] text-[40px] font-bold'>{showCard.category}</h2></div>
                <div className='mt-6 lg:mb-[122px] mb-5'><p className='text-[#525254] font-normal textarea-md p-0'>{showCard.description}</p></div>
            </div>
        </div>
    );
};

export default CardDetails;