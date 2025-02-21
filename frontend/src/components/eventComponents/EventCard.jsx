import React, { useEffect, useState } from 'react'
import Icons from '../Icons'
import Button from '../Button'
import moment from 'moment/moment'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import EventDetailsModal from './EventDetailsModal'
import DeletePermitModal from '../DeletePermitModal'
import BuyTicketModal from './BuyTicketModal'
import SaveEvent from './SaveEvent'

const EventCard = ({ deleteEventLoading, event, handleDeleteEvent }) => {
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [delPermit, setDelPermit] = useState(false)

    useEffect(() => {
        if (delPermit) {
            handleDeleteEvent(event)
        }
    }, [delPermit, setDelPermit])

    return (
        <div className='max-w-96 min-w-96 bg-zinc-700 p-3 m-2 rounded-lg text-zinc-100'>

            <div className='flex justify-between mb-2 px-3'>
                {
                    currentUser._id === event?.createdBy._id &&
                    <button onClick={() => {
                        navigate('/editevent', { state: event })
                    }} data-dip='edit' className='hover:text-blue-400 duration-200'>
                        <Icons iconName='edit' size='xl' />
                    </button>
                }


                <SaveEvent   id={event?._id} />
            </div>
            <div className='relative w-full bg-stone-700 h-40 rounded-md overflow-hidden'>
                {/* <img
                    src={event?.imgs[0] || 'https://images.pexels.com/photos/450055/pexels-photo-450055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
                    className='object-cover border-none w-full h-full'
                     
                /> */}

                {/* ------ */}
                {
                    event?.imgs.length > 0 ?
                        <img
                            src={event?.imgs[0] || 'https://images.pexels.com/photos/450055/pexels-photo-450055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            className='object-cover border-none w-full h-full'

                        /> :
                        <div className='w-full h-full opacity-60 rounded-xl object-cover bg-zinc-800   flex flex-row items-center justify-center py-5'>
                            <span className='opacity-50 text-xs tracking-widest'>(no image for this event yet)</span>

                        </div>
                }

                {/* ----  */}

                <h1 className='absolute top-2 left-2 bg-zinc-100 text-zinc-900 py-1 px-2 rounded-xl text-xs tracking-widest  font-bold flex items-center gap-1 '>
                    <Icons iconName={'plus'} size='lg' />
                    {event?.capacity}
                    <Icons iconName={'users2'} size='lg' />  

                </h1>
                {/* <button className='absolute top-2 right-2 hover:bg-white hover:border-white hover:text-black btn btn-xs btn-outline rounded-md border-none tracking-widest'>
                    <Icons iconName='bookmark' size='xl' color='text-red-500' />
                    
                </button> */}

                {/* {
                    currentUser._id === event?.createdBy._id &&
                    <button onClick={() => {
                        navigate('/editevent', { state: event })
                    }} data-dip='edit' className='tooltip absolute bottom-2 right-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white btn btn-xs btn-outline rounded-md border-none tracking-widest'>
                        <Icons iconName='edit' size='xl' />
                     
                    </button>
                } */}



            </div>



            <div className='flex flex-row justify-between my-1 text-black'>

                <h2 className='tracking-widest inline-block bg-blue-300 px-2 rounded-xl py-1 mt-1 font-semibold text-xs'>{event?.city}</h2>
                <h2 className='tracking-widest inline-block bg-emerald-400 px-2 rounded-xl py-1 mt-1 font-semibold text-xs'>{event?.status}</h2>


            </div>
            {/* {
                currentUser._id === event?.createdBy._id &&
                <button disabled={deleteEventLoading} className={`${deleteEventLoading && 'opacity-15'}`} >
                    <DeletePermitModal
                        key={event._id}
                        id={event._id}
                        title={event.name}
                        setDelPermit={setDelPermit} />
                </button>
            } */}


            <h1 className='text-xl font-semibold mb-5 ml-1'>{event?.name}</h1>

            <div className='flex flex-col gap-0.5'>
                <div className='tracking-widest flex flex-row items-center my-1 gap-2 text-sm'>
                    <Icons iconName='party' size='xl' />
                    <h1 > <span className='text-yellow-300 text-xs'>held on </span> {moment(event?.registrationEndDate).format('dddd Do MMM YYYY')}</h1>
                </div>
                <div className='tracking-widest flex flex-row items-center my-1 gap-2 text-sm'>
                    <Icons iconName='location' size='xl' />
                    <h1>{event?.venue}</h1>
                </div>

                <div className='tracking-widest flex flex-row items-center my-1 gap-2 text-sm'>
                    <Icons iconName='calender' size='xl' />

                    <h1 > <span className='text-yellow-300 text-xs'>updated on </span> {moment(event?.updatedAt).format('Do MMM YYYY')}</h1>
                </div>

                <div className=' tracking-widest flex flex-row items-center my-1 gap-2 text-sm'>
                    <Icons iconName='money' size='xl' />
                    <h1 className='flex flex-row items-center  gap-1'> <Icons iconName='rupee' size='xs' /> {event?.price}/-</h1>
                </div>

                <div className=' tracking-widest flex flex-row items-center my-1 gap-2 text-sm'>
                    <Icons iconName='time' size='xl' />
                    <h1> {event?.timeStart} <span className='tracking-widest text-xs mx-1'> to </span> {event?.timeEnd}</h1>
                </div>

                <div className=' tracking-widest flex flex-row items-center my-1 gap-2 text-sm'>
                    <Icons iconName='cancelCalender2' size='xl' />
                    <h1 > <span className='text-yellow-300 text-xs'>last date to register</span> {event?.registrationEndDate && moment(event?.registrationEndDate).format('Do MMM YYYY')}</h1>
                </div>

            </div>
            <div className='flex flex-row justify-between    gap-2 mt-5'>



                <Link to={`/eventdetails/${event._id}`} className='underline underline-offset-4 hover:bg-zinc-800 rounded-lg duration-200  px-1 flex items-center justify-center text-xs tracking-widest' >Details</Link>

                <BuyTicketModal key={event._id} event={event} />

            </div>

        </div>
    )
}

export default EventCard
