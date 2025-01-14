import React from 'react'
import Icons from './Icons'

const InvitationCard = () => {
    return (
        <div className='bg-zinc-600 text-white md:w-2/3  rounded-lg p-3'>
            <h1 className='text-xl tracking-widest mb-2'>Islamabad International Conference on Education</h1>
            <div className='flex flex-row flex-wrap  items-center gap-5'>
                <div className='bg-zinc-700 p-1 rounded-lg'>
                    <h1 className='text-xs tracking-widest text-blue-300'>Address</h1>
                    <h1 className='text-center'>B-123, Tech society, Madina road, faisalabad</h1>
                </div>
                <div className='bg-zinc-700 p-1 rounded-lg'>
                    <h1 className='text-xs tracking-widest text-blue-300'>Start time</h1>
                    <h1 className='text-center'>13:00</h1>
                </div>
                <div className='bg-zinc-700 p-1 rounded-lg'>
                    <h1 className='text-xs tracking-widest text-blue-300'>End time</h1>
                    <h1 className='text-center'>17:00</h1>
                </div>

                <div className='bg-zinc-700 p-1 rounded-lg'>
                    <h1 className='text-xs tracking-widest text-blue-300'>Date</h1>
                    <h1 className='text-center'>Friday, 5th January 2025</h1>
                </div>



            </div>
            <div className='flex flex-row  justify-end my-3  gap-3'>
                <button className='btn btn-outline btn-sm '>Respone box</button>
                <button className='btn btn-accent btn-sm '>Ignore</button>
            </div>

        </div>
    )
}

export default InvitationCard
