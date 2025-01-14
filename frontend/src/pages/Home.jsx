import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
// import { getMonthsWithDays } from '../constants/calender'
import Calender from '../components/Calender'
import moment from 'moment'
import SortBy from '../components/SortBy'
import Icons, { iconNames } from '../components/Icons'
import ImgsShowCase from '../components/ImgsShowCase'
import SearchEvent from '../components/eventComponents/SearchEvent'
import Test from './Test'

const Home = () => {
    const { currentUser } = useSelector(state => state.user);

    return (
        <div>
            <SearchEvent />


          


            <div className='h-96 flex flex-col justify-center items-center'>
                <h1 className='text-center tracking-widest text-xs'>Welcome to</h1>

                <h1 class="text-7xl md:w-3/5 mt-4  rounded-xl border-stone-800 p-3 border-0 mx-auto font-bold bg-gradient-to-r from-green-500 via-pink-600 to-yellow-500 text-transparent bg-clip-text text-center -tracking-widest break-words flex justify-around">
                    ADAMS-EVE
                </h1>
            </div>




            {/* <ImgsShowCase /> */}



{/* 
            <div className=' flex flex-wrap gap-4'>
                {
                    iconNames.map((i, indx) => {
                        return (
                            <div key={indx} className='bg-white text-black p-3 rounded-lg flex flex-col items-center '>
                                <Icons iconName={i} size='4xl' />
                                <span>{i} </span>
                            </div>
                        )
                    })
                }
            </div> */}

        </div>
    )
}

export default Home
