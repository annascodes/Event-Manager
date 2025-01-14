import React, { useEffect, useState } from 'react'
import EventCard from '../components/eventComponents/EventCard'
import useFetch from '../hooks/useFetch'
import Loading from '../components/Loading'
import useDelete from '../hooks/useDelete'
import { Link } from 'react-router-dom'

const TByme = () => {

    const [allEvents, setAllEvents] = useState(null)
    const { data: eventsbyme, loading:eventsbymeloading, err: eventsbymeerr } = useFetch('/api/event/eventsbyme')

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
        if (eventsbyme) {
            setAllEvents(eventsbyme)
        }

    }, [eventsbyme])
    const handleDeleteEvent = async (event) => {
        console.log('handleDeleteEvent:')
        console.log(event)
        deleteMethod(`/api/event/deleteevent/${event._id}`)

    }
  

    if (eventsbymeloading) {
        return <Loading type='loading-spinner' size='loading-md' />
    }

  return (
    <div>

        {
            (allEvents && allEvents.length === 0 ) && 
            <div className='flex flex-row justify-center py-10'>
                <span className='opacity-40 text-xs tracking-widest'>( no event created by you )</span>
                </div>
        }
        {
                (allEvents ) &&
                <div>
                    <h1 className='px-10'> <span className='text-xs opacity-40 tracking-widest'>Events created</span> by me ( {eventsbyme.length} ) </h1>
                    <div className='flex flex-row flex-wrap justify-center gap-y-5'>

                        {
                            allEvents.map((e, ei) => {
                                return (
                                    <EventCard 
                                    key={e._id} 
                                    deleteEventLoading={deleteEventLoading} 
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

export default TByme
