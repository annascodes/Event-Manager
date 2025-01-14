import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import moment from 'moment'
import Loading from '../Loading'
import SortBy from '../SortBy'
import RoleBadge from './RoleBadge'
import { Link } from 'react-router-dom'
import DeletePermitModal from '../DeletePermitModal'
import usePost from '../../hooks/usePost'

const SentByMeInvitations = () => {

  const { data: Invs, loading, err } = useFetch('/api/invitation/sentbyme')
  const [data, setData] = useState(null)
  const [sortByResponse, setSortByResponse] = useState('all')
  const [sortByRole, setSortByRole] = useState('all')
  const { post: deleteInv, data: deleteData, loading: deleteLoading, err: deleteErr } = usePost('/api/invitation/deleteinv')

  console.log(sortByResponse, sortByRole)
  const handleDeleteInv = (id) => {
    console.log(id)
    deleteInv({ id })
  }
  useEffect(() => {
    if (deleteData)
     {
      console.log(deleteData)
      setData(data.filter(i=>i._id !== deleteData._id))
     }
  }, [deleteData])

  useEffect(() => {
    if (Invs) {
      setData(Invs)
    }
  }, [Invs])


  if (loading) {
    return <Loading type='loading-dots' size='loading-lg' />
  }
  // console.log(data && data[0].responseDate)
  return (
    <div className='md:w-1/2 mx-auto'>
      <h1 className=' tracking-widest text-center '>Sent invitations</h1>
      {data && data.length === 0 &&
        <div className='flex justify-center text-xs opacity-50 tracking-widest'>
          <span>no send invitations yet</span>
        </div>
      }

      {/* <SortBy title='sort by role' options={['all', 'admin', 'host', 'guest',]} setValu={setSortByRole} /> */}

      <SortBy title='sort by response' options={['all', 'not responded', 'rejected', 'maybe', 'accepted']} setValu={setSortByResponse} />

      {
        data && data.map((i, indx) => {
          return (
            (sortByResponse === i.response || sortByResponse === 'all') &&
            <div key={i._id} className=' bg-neutral-700 p-3 my-4 rounded-md'>
              <div className=' flex mb-3 flex-row justify-between items-center'>

                <h1 className='bg-white px-2 py-1 text-black text-xs uppercase rounded-sm tracking-widest'>
                  {i?.response}

                </h1>

                {i.responseDate &&
                  <span className='text-xs ml-5 tracking-widest'>
                    <span className='opacity-50'>responded on: </span>
                    {i.responseDate && moment(i.responseDate).format('llll')}
                    {/* | 
                  {i?.responseDate && moment(i.createdAt).from(i.responseDate ) } */}
                  </span>
                }

                
                <button
                disabled={deleteLoading}
                  onClick={() => handleDeleteInv(i._id)}
                  className='btn btn-outline btn-xs rounded-md text-red-400 tracking-widest'>
                  delete
                </button>


              </div>
              <div className='flex flex-row items-center   gap-2'>
                <span className='text-xs uppercase text-yellow-500 tracking-widest'>Sent to</span>
                <span>{i.sendTo.firstName} {i.sendTo.lastName}</span>
              </div>
              <div className='flex flex-row items-center   gap-2'>
                <span className='text-xs uppercase text-yellow-500 tracking-widest'>Invitation for</span>
                <span>
                  " {i.event.name}"
                </span>
              </div>
              <div className='flex flex-row items-center   gap-2'>
                <span className='text-xs uppercase text-yellow-500 tracking-widest'>come as </span>
                <span>
                  <RoleBadge role={i.role} />
                </span>
              </div>



              <div className='flex flex-row  items-center mt-5 justify-between'>
                <h1 className='text-xs tracking-widest '>
                  <span className='text-zinc-400'>sent date: </span>
                  {moment(i.createdAt).format('llll')}
                  <span className='text-xs opacity-30'> ({moment(i.createdAt).fromNow()})</span>
                </h1>


                <Link to={`/eventdetails/${i.event._id}`} className='btn btn-neutral tracking-widest btn-xs  uppercase text-xs'>
                  details
                </Link>
              </div>


            </div>
          )
        })
      }




    </div>
  )
}

export default SentByMeInvitations
