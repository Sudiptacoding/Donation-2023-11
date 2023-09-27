import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import '../../App.css'
import Card from '../Card/Card';
import swal from 'sweetalert';


const Home = () => {
    const [cards, setCards] = useState([]);
    const [input, setInput] = useState();
    const [duplicate, setDuplicate] = useState([])

    useEffect(() => {
        fetch('/FakeData.json')
            .then(response => response.json())
            .then(data => {
                setDuplicate(data)
                setCards(data);

            })
    }, []);

    const handelClick = () => {
        if (input) {
            const filterData = duplicate.filter(item => item.category.toLowerCase() === input.toLowerCase())
            console.log(filterData)
            if (filterData.length !== 0) {
                setCards(filterData)
            } else {
                setCards(duplicate)
                swal("Opps!", "Search result not match!", "error");
            }
        } else {
            setCards(duplicate)
        }
        document.getElementById('catainput').value = '';
    }

    return (
        <div>
            <div className='background-container lg:px-[140px] pt-[50px] px-6 text-center'>
                <Header></Header>
                <Outlet></Outlet>
                <div className='flex flex-col items-center justify-center w-full lg:pb-[210px] lg:pt-[123px] py-10'>
                    <div className='pb-10'><h1 className='text-[#0B0B0B] text-[48px] font-bold'>I Grow By Helping People In Need</h1></div>
                    <div >
                        <div className="relative lg:w-[470px]">
                            <input id='catainput' onChange={(e) => setInput(e.target.value)} type="text" placeholder="Search here...." className="w-full pr-16 input input-bordered border-[#DEDEDE]" />
                            <button onClick={handelClick} className="absolute top-0 right-0 rounded-l-none btn bg-[#FF444A] text-white">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {
                    cards ?
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:px-[30px] xl:px-[140px] px-6 lg:my-[100px] my-5'>
                            {
                                cards.map((card, i) => <Card key={i} card={card} ></Card>)
                            }
                        </div>
                        :
                        <div className='flex items-center justify-center w-full h-screen'><span className="loading loading-spinner loading-lg"></span></div>
                }
            </div>
        </div>




    );
};

export default Home;