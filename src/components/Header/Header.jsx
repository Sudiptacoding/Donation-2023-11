import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                <div className="">
                    <NavLink to='/' className="text-xl normal-case "><img className=' h-[72px]' src="https://i.postimg.cc/63DBqHLB/Logo.png" alt="" /></NavLink>
                </div>
                <div className="">
                    <ul className="flex gap-[49px] ">
                        <li className='text-lg font-bold text-[#0B0B0B]'><NavLink to='/' className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "text-[#FF444A] underline" : ""
                        }>Home</NavLink></li>
                        <li className='text-lg font-bold text-[#0B0B0B]'><NavLink to='/donation' className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "text-[#FF444A] underline" : ""
                        }>Donation</NavLink></li>
                        <li className='text-lg font-bold text-[#0B0B0B]'><NavLink to='/statistics' className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "text-[#FF444A] underline" : ""
                        } >Statistics</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;