import React, { useEffect, useState } from 'react'
import EventCard from '../components/eventComponents/EventCard'
import useFetch from '../hooks/useFetch'
import Loading from '../components/Loading'
import useDelete from '../hooks/useDelete'
import { Link } from 'react-router-dom'

const TPublic = () => {

    const [allEvents, setAllEvents] = useState(null)
    const { data: events, loading, err } = useFetch('/api/event/getpublicevents')
    const { data: eventsbyme, loading: eventsbymeloading, err: eventsbymeerr } = useFetch('/api/event/eventsbyme')

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
    <div>
        {/* <h1 className='text-center'>test public</h1> */}
        {
                (allEvents) &&

                <div>
                    <h1 className='px-10'> <span className='text-xs tracking-widest opacity-40'>Events for </span> public ( {allEvents.length} ) </h1>
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
      
    </div>
  )
}

export default TPublic
