import React from 'react'
import useFetch from '../hooks/useFetch'
import moment from 'moment'

const BoughtTickets = () => {

    const  {data, loading, err} = useFetch('/api/ticket/getmytickets')
    console.log(data)
    
  return (
    <div className='md:w-1/2 mx-auto'>
        <h1>Your tickets</h1>
        {
            data && data.map((t,ti)=>{
                return(
                    <div className='bg-zinc-700 rounded-lg p-2 my-4'>

                        <h1 className='flex uppercase items-center justify-center text-xl gap-2'>
                            <span className=' text-yellow-300 tracking-widest'>ticket #</span>
                            {t._id.slice(-5)}
                        </h1>
                        <h1 className='flex items-center gap-2'>
                            <span className='text-xs text-yellow-300 tracking-widest'>event name</span>
                            {t.event.name}
                        </h1>
                        <h1 className='flex items-center gap-2'>
                            <span className='text-xs text-yellow-300 tracking-widest'>event status</span>
                            {t.event.status}
                        </h1>
                        <h1 className='flex items-center gap-2'>
                            <span className='text-xs text-yellow-300 tracking-widest'>bought on</span>
                            {moment(t.createdAt).format('ll dddd')}
                            <span className='text-xs text-yellow-100'>{moment(t.createdAt).fromNow()} </span>
                        </h1>
                         

                    </div>
                )
            })
        }

      
    </div>
  )
}

export default BoughtTickets
