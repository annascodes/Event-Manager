import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import SearchEvent from '../components/eventComponents/SearchEvent'


const TEvents = () => {
    const location = useLocation()
 

    return (
        <div>
            {/* <h1 className='text-center'>test events</h1> */}

            <div style={{ backgroundColor: '#202020' }} className='sticky top-12 py-3 z-10 flex flex-row flex-wrap justify-center gap-3'>
                <Link to={'/testevent/testpublic'}
                    className={`${(location.pathname === '/testevent' || location.pathname === '/testevent/testpublic') && 'btn-active'} btn btn-outline btn-xs rounded-md`}>
                    public
                </Link>
                <Link to={'/testevent/testbyme'}
                    className={`${(location.pathname === '/testevent/testbyme') && 'btn-active'} btn btn-outline btn-xs rounded-md`}>
                    by me
                </Link>
                <Link to={'/testevent/testsaved'}
                    className={`${(location.pathname === '/testevent/testsaved') && 'btn-active'} btn btn-outline btn-xs rounded-md`}>
                    saved
                </Link>
            </div>

           <SearchEvent/>
           



            <Outlet />

        </div>
    )
}

export default TEvents
