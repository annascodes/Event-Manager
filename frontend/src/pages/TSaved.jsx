import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Icons from '../components/Icons'
import useFetch from '../hooks/useFetch'
import EventCard from '../components/eventComponents/EventCard'
import Loading from '../components/Loading'

const TSaved = () => {
    const {data, loading, err} = useFetch('/api/event/getsavedevents')




    
    if(loading) return <Loading type='loading-spinnerf' />
    return (
        <div className=''>

            {
                (data && data.length === 0) &&
                <div className='flex flex-row justify-center py-10'>
                    <span className='opacity-40 text-xs tracking-widest'>( no saved event yet )</span>
                </div>
            }
            {/* -- experimental start--  */}

            <div className='relative group inline-block  '>
                <Link>USER</Link>
                <div className='opacity-0 absolute bottom-5 left-2 z-10 group-hover:opacity-100 mt-2 p-4 bg-zinc-800   transition-opacity duration-300 ease-in-out  pointer-events-none group-hover:pointer-events-auto min-w-52 rounded-xl   '>
                    <h1 className='flex flex-row items-center gap-1 text-sm tracking-wider'> <Icons iconName={'userOutline'} /> Anas Shoaib </h1>
                    <h1 className='flex flex-row items-center gap-1 text-sm tracking-wider'> <Icons iconName={'mail'} /> annasshoaib@gmail.com </h1>
                    <div className='flex justify-end mt-3'>
                        <button className='btn btn-xs btn-outline rounded-md'>follow</button>
                    </div>

                </div>

            </div>
            {/* -- experimental end--  */}


           <div className='flex flex-wrap items-center gap-1'>
           {
                data && data.map((e,ei)=>{
                    return <EventCard  event={e}/>
                })
            }
           </div>











            {/* ------------------- */}



        </div>
    )
}

export default TSaved
