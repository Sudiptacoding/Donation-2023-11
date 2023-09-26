import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ card }) => {
    const { id, image, rectangleimage, type, category, description, price, cardbg, categorybg, textcolor } = card;
    const navigate = useNavigate();
    const handelReadMode = (id) => {
        navigate(`/carddetails/${id}`)
    }
    return (
        <div onClick={() => handelReadMode(id)} className='duration-75 delay-75 rounded-md cursor-pointer hover:shadow-xl card card-compact' style={{ backgroundColor: `${cardbg}` }}>
            <figure className=''><img className='w-full' src={rectangleimage} alt="Shoes" /></figure>
            <div className="px-[26px]">
                <h2 className='pt-5 text-sm font-medium'><span className='py-1 px-[10px] rounded' style={{ backgroundColor: `${categorybg}`, color: `${textcolor}` }}>{category}</span></h2>
                <p className='pt-2 pb-4 text-xl font-semibold' style={{ color: `${textcolor}` }}>{type}</p>
            </div>
        </div>
    );
};

export default Card;