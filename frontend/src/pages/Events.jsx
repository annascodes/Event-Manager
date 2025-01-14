import React, { useEffect, useState } from 'react'
import EventCard from '../components/eventComponents/EventCard'
import useFetch from '../hooks/useFetch'
import Loading from '../components/Loading'
import useDelete from '../hooks/useDelete'
import { Link } from 'react-router-dom'



const Events = () => {

    const [allEvents, setAllEvents] = useState(null)
    const { data: events, loading, err } = useFetch('/api/event/getpublicevents')
    const { data: eventsbyme, loading: eventsbymeloading, err: eventsbymeerr } = useFetch('/api/event/eventsbyme')
    const [currentTab, setCurrentTab] = useState('public')

    const {
        deleteMethod,
        data: deleteEventData,
        loading: deleteEventLoading,
        err: deleteEventErr } = useDelete()

    useEffect(() => {
        if (deleteEventData) {
            // console.log(deleteEventData)
            setAllEvents(allEvents.filter((e, ei) => e._id !== deleteEventData.event._id))
        }

    }, [deleteEventData])

    useEffect(() => {
        if (events) {
            setAllEvents(events)
        }

    }, [events])
    const handleDeleteEvent = async (event) => {
        console.log('handleDeleteEvent:')
        console.log(event)
        deleteMethod(`/api/event/deleteevent/${event._id}`)

    }
  

    if (loading) {
        return <Loading type='loading-spinner' size='loading-md' />
    }

    return (
        <div className=''>
            {/* ---------  */}
            <div className='z-10 bg-gray-900   px-1 sticky top-12 rounded-xl md:px-5  py-2 flex flex-row my-2 w-full justify-center gap-4'>
                {/* <CheckDropdown title='Tab' options={['Public', 'By me', 'Saved']} /> */}

                <Link onClick={() => {
                    setCurrentTab('public')
                }} className={`bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center ${currentTab === 'public' && 'text-white border-2'}    text-xs tracking-widest hover:text-white`}>

                    <span className=''>public</span>

                </Link>
                <Link
                    onClick={() => {
                        setCurrentTab('by me')
                    }}
                    className={`bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center ${currentTab === 'by me' && 'text-white border-2'}    text-xs tracking-widest hover:text-white`}>

                    <span className=''>by me</span>

                </Link>
                <Link
                    onClick={() => {
                        setCurrentTab('saved')
                    }}
                    className={`bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center ${currentTab === 'saved' && 'text-white border-2'}    text-xs tracking-widest hover:text-white`}>

                    <span className=' '>saved</span>

                </Link>
            </div>
            {/* ----------  */}



            {/* {
                events && <h1 className=' text-center'> <span>public</span> events ( {events.length} ) </h1>
            } */}


            {
                (allEvents && currentTab === 'public') &&

                <div>
                    <h1 className=' text-center'> <span>public</span> events ( {allEvents.length} ) </h1>
                    <div className='flex flex-row flex-wrap justify-center gap-y-5'>

                        {
                            allEvents.map((e, ei) => {
                                return (
                                    <EventCard key={e._id} deleteEventLoading={deleteEventLoading} event={e} handleDeleteEvent={handleDeleteEvent} />
                                )
                            })
                        }

                    </div>
                </div>
            }

            {
                (eventsbyme && currentTab === 'by me') &&
                <div>
                    <h1 className=' text-center'> <span>by me</span> ( {eventsbyme.length} ) </h1>
                    <div className='flex flex-row flex-wrap justify-center gap-y-5'>

                        {
                            eventsbyme.map((e, ei) => {
                                return (
                                    <EventCard 
                                    key={e._id} 
                                    deleteEventLoading={eventsbymeloading} 
                                    event={e} 
                                    handleDeleteEvent={handleDeleteEvent} />
                                )
                            })
                        }

                    </div>
                </div>
            }




        </div>
    )
}

export default Events
