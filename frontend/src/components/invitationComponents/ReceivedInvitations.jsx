import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import moment from 'moment'
import InvitationResponse from './InvitationResponse'
import RoleBadge from './RoleBadge'
import Loading from '../Loading'
import SortBy from '../SortBy'

const ReceivedInvitations = () => {

  const {data:receivedInvs, loading, err} = useFetch('/api/invitation/received')
  const [sortBy, setSortBy] = useState('all')
  const [data, setData] = useState(null)
  const [notresponded, setNotresponded] = useState(null)
  
  const handleSortBy = (value)=>{
    setSortBy(value )
  }

  useEffect(()=>{
    if(receivedInvs){
      // console.log(receivedInvs)
      setData(receivedInvs)
      let count = 0;
      receivedInvs.map(i=>{
        if(i.response === 'not responded')
          count+=1
        setNotresponded(count)
      })
    }
      

  },[receivedInvs])
// console.log(notresponded)
  if(loading){
    return <Loading type={'loading-dots'} size={'loading-lg'} />
  }
  return (
    <div className='md:w-1/2 mx-auto'>
      <h1 className=' tracking-widest  '>Received invitations</h1>

      {/* sort-by  */}
      {/* <div className='flex flex-wrap items-center gap-4 my-5'>
        <h1 className='tracking-widest text-sm text-yellow-300 '>sort by: </h1>

        <h1 onClick={()=>handleSortBy('accepted')} className={`${sortBy === 'accepted' && 'bg-white text-black'} border-white cursor-pointer hover:bg-white hover:text-black  p-0.5   font-light tracking-widest `}>
          accepted
        </h1>
        
        <h1 onClick={()=>handleSortBy('rejected')} className={`${sortBy === 'rejected' && 'bg-white text-black'} border-white cursor-pointer hover:bg-white hover:text-black  p-0.5   font-light tracking-widest`}>
          rejected
        </h1>
        <h1 onClick={()=>handleSortBy('maybe')} className={`${sortBy === 'maybe' && 'bg-white text-black'} border-white cursor-pointer hover:bg-white hover:text-black  p-0.5   font-light tracking-widest`}>
          maybe
        </h1>
        <h1 onClick={()=>handleSortBy('all')} className={`${sortBy === 'all' && 'bg-white text-black'} border-white cursor-pointer hover:bg-white hover:text-black  p-0.5  font-light tracking-widest`}>
          show all
        </h1>
        
        


      </div> */}

        <SortBy title={'sort by:'} setValu={setSortBy} options={['all', 'not responded', 'may be', 'rejected', 'accepted']} />




    {
      notresponded &&
      <h1 className='flex flex-row items-center text-sm  border-2 border-zinc-600 rounded-md'>
        <span className='text-yellow-300 border-yellow-300 border-0 rounded-md px-2'>{notresponded}</span>
        {notresponded>1? 'invitations are': 'invitation'}  yet to response.
      </h1>
    }
      {data && data.length===0 && 
        <div className='flex justify-center text-xs opacity-50 tracking-widest'>
          <span>no received invitations yet</span>
          </div>
      }

      {
        data &&
        data.map((i, indx) => {
          return (
            (i.response === sortBy || sortBy === 'all') ?
            <div key={i?._id || indx} className='  bg-neutral-700 p-3 my-4 rounded-md'>
              <div className=' flex mb-3 flex-row justify-start items-center'>
                {/* <h1 className='bg-yellow-600 px-2 text-white text-xs uppercase rounded-full tracking-widest'>not responded yet</h1> */}
                <h1 className='bg-white px-2 py-1 text-black text-xs uppercase rounded-sm tracking-widest'>
                  {i?.response || 'waiting for response'}
                </h1>
                

              </div>
              <div className='flex flex-row items-center   gap-2'>
                <span className='text-xs uppercase text-yellow-500 tracking-widest'>Sent by</span>
                <span>{i?.sendTo.firstName } {i?.sendTo.lastName } ({i.sendTo.email})</span>
              </div>
              <div className='flex flex-row items-center   gap-2'>
                <span className='text-xs uppercase text-yellow-500 tracking-widest'>Invitation for</span>
                <span>
                  " {i?.event.name}"
                </span>
              </div>
              <div className='flex flex-row items-center   gap-2'>
                <span className='text-xs uppercase text-yellow-500 tracking-widest'>Inviting you as </span>
                {/* <span className='uppercase tracking-widest text-sm'>
                   {i.role}
                </span> */}
                <RoleBadge role={i.role} />
              </div>
              <div className='flex flex-row  items-center mt-5 justify-between'>
                <h1 className='text-xs tracking-widest '>
                  <span className='text-zinc-400'>sent date: </span>
                  { moment(i.createdAt).format('LLLL') }
                 </h1>
                {/* <button className='btn btn-neutral tracking-widest btn-xs  uppercase text-xs'>
                  details
                </button> */}

                <InvitationResponse invitation={i} invs={data} setInvs={setData} />
              </div>
            </div>: <div key={i._id} className='flex justify-center text-xs tracking-widest opacity-50'>
              <span> </span>
              </div>
          )
        })
      }




    </div>
  )
}

export default ReceivedInvitations
